import db from "../database/db.js";
import { createJournalEntry } from "../accounting/journalEngine.js";

export function createSalesOrder(data) {

  const result =
    db.prepare(`
      INSERT INTO sales_orders
      (
        company_id,
        customer_id,
        order_number,
        order_date,
        status,
        total_cents
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    .run(
      data.companyId,
      data.customerId,
      data.orderNumber,
      data.orderDate,
      "OPEN",
      data.totalCents
    );

  return result.lastInsertRowid;
}

export function createShipment(data) {

  const result =
    db.prepare(`
      INSERT INTO shipments
      (
        company_id,
        sales_order_id,
        shipment_date
      )
      VALUES (?, ?, ?)
    `)
    .run(
      data.companyId,
      data.salesOrderId,
      data.shipmentDate
    );

  createJournalEntry({
    companyId: data.companyId,
    entryDate: data.shipmentDate,
    reference: "SHIPMENT",
    description: "Shipment Revenue",
    lines: [
      {
        accountId: 2,
        debitCents: data.totalCents
      },
      {
        accountId: 6,
        creditCents: data.totalCents
      }
    ]
  });

  createJournalEntry({
    companyId: data.companyId,
    entryDate: data.shipmentDate,
    reference: "SHIPMENT-COGS",
    description: "Cost Of Goods Sold",
    lines: [
      {
        accountId: 7,
        debitCents: data.costCents
      },
      {
        accountId: 3,
        creditCents: data.costCents
      }
    ]
  });

  return result.lastInsertRowid;
}
``