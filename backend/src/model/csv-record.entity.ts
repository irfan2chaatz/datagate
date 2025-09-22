import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('csv_records')
export class CsvRecord {
  @PrimaryGeneratedColumn()
  id!: number; // Auto-generated PK

  @Column({ type: 'varchar', length: 50 })
  InvoiceNumber!: string;

  @Column({ type: 'datetime' })
  InvoiceDate!: Date;

  @Column({ type: 'varchar', length: 50 })
  TransactionType!: string;

  @Column({ type: 'varchar', length: 50 })
  OrderId!: string;

  @Column({ type: 'varchar', length: 50 })
  ShipmentId!: string;

  @Column({ type: 'datetime' })
  ShipmentDate!: Date;

  @Column({ type: 'datetime' })
  OrderDate!: Date;

  @Column({ type: 'varchar', length: 50 })
  ShipmentItemId!: string;

  @Column({ type: 'int' })
  Quantity!: number;

  @Column({ type: 'varchar', length: 150 })
  ItemDescription!: string;

  @Column({ type: 'varchar', length: 50 })
  Asin!: string;

  @Column({ type: 'varchar', length: 50 })
  Sku!: string;

  @Column({ type: 'varchar', length: 50 })
  ProductTaxCode!: string;

  @Column({ type: 'varchar', length: 50 })
  ShipFromCity!: string;

  @Column({ type: 'varchar', length: 50 })
  ShipFromState!: string;

  @Column({ type: 'varchar', length: 10 })
  ShipFromPostalCode!: string;

  @Column({ type: 'varchar', length: 50 })
  ShipToCity!: string;

  @Column({ type: 'varchar', length: 50 })
  ShipToState!: string;

  @Column({ type: 'varchar', length: 10 })
  ShipToPostalCode!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  InvoiceAmount!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  TaxExclusiveGross!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  TotalTaxAmount!: number;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  CgstRate!: number;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  SgstRate!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  UtgstRate!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  IgstRate!: number;

  @Column({ type: 'varchar', length: 50 })
  WarehouseId!: string;

  @Column({ type: 'varchar', length: 50 })
  FulfillmentChannel!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  CreditNoteNo?: string | null; // ✅ allow null

  @Column({ type: 'datetime', nullable: true })
  CreditNoteDate?: Date | null; // ✅ allow null
}
