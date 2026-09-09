import db from "../database/db.js";
import { createJournalEntry } from "../accounting/journalEngine.js";

export function createPurchaseOrder(data) {

  const result =
    db.prepare(`
      INSERT INTO purchase_orders
      (
        company_id,
        vendor_id,
        po_number,
        po_date,
        status,
        total_cents
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    .run(
      data.companyId,
      data.vendorId,
      data.poNumber,
      data.poDate,
      "OPEN",
      data.totalCents
    );

  return result.lastInsertRowid;
}

export function receivePurchaseOrder(data) {

  const result =
    db.prepare(`
      INSERT INTO purchase_receipts
      (
        company_id,
        purchase_order_id,
        receipt_date
      )
      VALUES (?, ?, ?)
    `)
    .run(
      data.companyId,
      data.purchaseOrderId,
      data.receiptDate
    );

  createJournalEntry({
    companyId: data.companyId,
    entryDate: data.receiptDate,
    reference: "PO-RECEIPT",
    description: "Purchase Receipt",
    lines: [
      {
        accountId: 3,
        debitCents: data.totalCents
      },
      {
        accountId: 4,
        creditCents: data.totalCents
      }
    ]
  });

  return result.lastInsertRowid;
}