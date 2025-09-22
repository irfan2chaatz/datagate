import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CsvRecord } from '../model/csv-record.entity';
import { CreateCsvDto } from '../dto/create-csv.dto';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { parseFlexibleDate } from '../utils/date.utils';

import * as fs from 'fs';
import * as path from 'path';
import { join } from 'path';
import csvParser from 'csv-parser';

@Injectable()
export class CsvService {
  constructor(
    @InjectRepository(CsvRecord)
    private readonly csvRepository: Repository<CsvRecord>,
  ) {}

  async processCsv(file: Express.Multer.File) {
    const validRows: Partial<CsvRecord>[] = [];
    const failedRows: { row: any; errors: string[] }[] = [];

    const logDir = join(process.cwd(), 'error-logs');
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

    const logFilePath = join(logDir, `error-log-${Date.now()}.csv`);
    const writeStream = fs.createWriteStream(logFilePath, { flags: 'a' });

    // CSV header for failed rows
    writeStream.write('InvoiceNumber,ValidationErrors,RawRow\n');

    return new Promise((resolve, reject) => {
      fs.createReadStream(file.path)
        .pipe(csvParser())
        .on('data', (row: Record<string, string>) => {
          const dtoObj: Partial<CreateCsvDto> = {
            InvoiceNumber: row['Invoice Number'],
            InvoiceDate: row['Invoice Date'],
            TransactionType: row['Transaction Type'],
            OrderId: row['Order Id'],
            ShipmentId: row['Shipment Id'],
            ShipmentDate: row['Shipment Date'],
            OrderDate: row['Order Date'],
            ShipmentItemId: row['Shipment Item Id'],
            Quantity: Number(row['Quantity']),
            ItemDescription: row['Item Description'],
            Asin: row['Asin'],
            Sku: row['Sku'],
            ProductTaxCode: row['Product Tax Code'],
            ShipFromCity: row['Ship From City'],
            ShipFromState: row['Ship From State'],
            ShipFromPostalCode: row['Ship From Postal Code'],
            ShipToCity: row['Ship To City'],
            ShipToState: row['Ship To State'],
            ShipToPostalCode: row['Ship To Postal Code'],
            InvoiceAmount: Number(row['Invoice Amount']),
            TaxExclusiveGross: Number(row['Tax Exclusive Gross']),
            TotalTaxAmount: Number(row['Total Tax Amount']),
            CgstRate: Number(row['Cgst Rate']),
            SgstRate: Number(row['Sgst Rate']),
            UtgstRate: Number(row['Utgst Rate']),
            IgstRate: Number(row['Igst Rate']),
            WarehouseId: row['Warehouse Id'],
            FulfillmentChannel: row['Fulfillment Channel'],
            CreditNoteNo: row['Credit Note No'],
            CreditNoteDate: row['Credit Note Date'],
          };

          const dto = plainToInstance(CreateCsvDto, dtoObj, {
            enableImplicitConversion: true,
          });

          const errors = validateSync(dto, { skipMissingProperties: false });
          const errorMessages: string[] = [];

          // Required date fields
          const dateFields = [
            { key: 'InvoiceDate', value: dto.InvoiceDate },
            { key: 'ShipmentDate', value: dto.ShipmentDate },
            { key: 'OrderDate', value: dto.OrderDate },
          ];
          for (const f of dateFields) {
            if (!parseFlexibleDate(f.value)) {
              errorMessages.push(`${f.key} invalid`);
            }
          }
          if (dto.CreditNoteDate && !parseFlexibleDate(dto.CreditNoteDate)) {
            errorMessages.push(`CreditNoteDate invalid`);
          }

          if (errors.length > 0) {
            errorMessages.push(
              ...errors.map(
                (e) =>
                  `${e.property}: ${
                    e.constraints
                      ? Object.values(e.constraints).join('|')
                      : 'invalid'
                  }`,
              ),
            );
          }

          if (errorMessages.length > 0) {
            failedRows.push({ row, errors: errorMessages });
            writeStream.write(
              `"${dto.InvoiceNumber || ''}","${errorMessages.join('; ').replace(/"/g, '""')}","${JSON.stringify(row).replace(/"/g, '""')}"\n`,
            );
            return;
          }

          // ✅ Valid row → push
          validRows.push({
            InvoiceNumber: dto.InvoiceNumber,
            InvoiceDate: new Date(parseFlexibleDate(dto.InvoiceDate)!),
            TransactionType: dto.TransactionType,
            OrderId: dto.OrderId,
            ShipmentId: dto.ShipmentId,
            ShipmentDate: new Date(parseFlexibleDate(dto.ShipmentDate)!),
            OrderDate: new Date(parseFlexibleDate(dto.OrderDate)!),
            ShipmentItemId: dto.ShipmentItemId,
            Quantity: dto.Quantity,
            ItemDescription: dto.ItemDescription,
            Asin: dto.Asin,
            Sku: dto.Sku,
            ProductTaxCode: dto.ProductTaxCode,
            ShipFromCity: dto.ShipFromCity,
            ShipFromState: dto.ShipFromState,
            ShipFromPostalCode: dto.ShipFromPostalCode,
            ShipToCity: dto.ShipToCity,
            ShipToState: dto.ShipToState,
            ShipToPostalCode: dto.ShipToPostalCode,
            InvoiceAmount: dto.InvoiceAmount,
            TaxExclusiveGross: dto.TaxExclusiveGross,
            TotalTaxAmount: dto.TotalTaxAmount,
            CgstRate: dto.CgstRate,
            SgstRate: dto.SgstRate,
            UtgstRate: dto.UtgstRate,
            IgstRate: dto.IgstRate,
            WarehouseId: dto.WarehouseId,
            FulfillmentChannel: dto.FulfillmentChannel,
            CreditNoteNo: dto.CreditNoteNo ?? null,
            CreditNoteDate: dto.CreditNoteDate
              ? new Date(parseFlexibleDate(dto.CreditNoteDate)!)
              : null,
          });
        })
        .on('end', async () => {
          if (validRows.length > 0) {
            await this.csvRepository.save(validRows as CsvRecord[]);
          }
          writeStream.end();
          resolve({
            inserted: validRows.length,
            failed: failedRows.length,
            // ✅ Only return the filename (no directory)
            logFile: failedRows.length ? path.basename(logFilePath) : null,
          });
        })
        .on('error', (err: Error) => {
          writeStream.end();
          reject(err);
        });
    });
  }
}
