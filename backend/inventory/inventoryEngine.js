import db from "../database/db.js";
import { createJournalEntry } from "../accounting/journalEngine.js";

export function createInventoryTransaction(data) {

  const result =
    db.prepare(`
      INSERT INTO inventory_transactions
      (
        company_id,
        item_id,
        transaction_date,
        transaction_type,
        quantity,
        unit_cost_cents
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    .run(
      data.companyId,
      data.itemId,
      data.transactionDate,
      data.transactionType,
      data.quantity,
      data.unitCostCents
    );

  return result.lastInsertRowid;
}

export function postInventoryReceipt(data) {

  const total =
    data.quantity * data.unitCostCents;

  createJournalEntry({
    companyId: data.companyId,
    entryDate: data.transactionDate,
    reference: "INV-RECEIPT",
    description: "Inventory Receipt",
    lines: [
      {
        accountId: 3,
        debitCents: total
      },
      {
        accountId: 4,
        creditCents: total
      }
    ]
  });

}

export function postInventoryIssue(data) {

  const total =
    data.quantity * data.unitCostCents;

  createJournalEntry({
    companyId: data.companyId,
    entryDate: data.transactionDate,
    reference: "INV-ISSUE",
    description: "Inventory Issue",
    lines: [
      {
        accountId: 7,
        debitCents: total
      },
      {
        accountId: 3,
        creditCents: total
      }
    ]
  });

}