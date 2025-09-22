// src/dto/create-csv.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCsvDto {
  @IsNotEmpty()
  @IsString()
  InvoiceNumber!: string;

  // Date strings (required) — parsed/validated in service via parseFlexibleDate
  @IsNotEmpty()
  @IsString()
  InvoiceDate!: string;

  @IsNotEmpty()
  @IsString()
  TransactionType!: string;

  @IsNotEmpty()
  @IsString()
  OrderId!: string;

  @IsNotEmpty()
  @IsString()
  ShipmentId!: string;

  @IsNotEmpty()
  @IsString()
  ShipmentDate!: string;

  @IsNotEmpty()
  @IsString()
  OrderDate!: string;

  @IsNotEmpty()
  @IsString()
  ShipmentItemId!: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  Quantity!: number;

  @IsNotEmpty()
  @IsString()
  ItemDescription!: string;

  @IsNotEmpty()
  @IsString()
  Asin!: string;

  @IsNotEmpty()
  @IsString()
  Sku!: string;

  @IsNotEmpty()
  @IsString()
  ProductTaxCode!: string;

  @IsNotEmpty()
  @IsString()
  ShipFromCity!: string;

  @IsNotEmpty()
  @IsString()
  ShipFromState!: string;

  @IsNotEmpty()
  @IsString()
  ShipFromPostalCode!: string;

  @IsNotEmpty()
  @IsString()
  ShipToCity!: string;

  @IsNotEmpty()
  @IsString()
  ShipToState!: string;

  @IsNotEmpty()
  @IsString()
  ShipToPostalCode!: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  InvoiceAmount!: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  TaxExclusiveGross!: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  TotalTaxAmount!: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  CgstRate!: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  SgstRate!: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  UtgstRate!: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  IgstRate!: number;

  @IsNotEmpty()
  @IsString()
  WarehouseId!: string;

  @IsNotEmpty()
  @IsString()
  FulfillmentChannel!: string;

  // optional last two fields
  @IsOptional()
  @IsString()
  CreditNoteNo?: string | null;

  @IsOptional()
  @IsString()
  CreditNoteDate?: string | null;
}
