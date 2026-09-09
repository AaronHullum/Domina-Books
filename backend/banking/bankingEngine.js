import db from "../database/db.js";
import { createJournalEntry } from "../accounting/journalEngine.js";

export function recordBankTransaction(data) {

  const result =
    db.prepare(`
      INSERT INTO bank_transactions
      (
        company_id,
        bank_account_id,
        transaction_date,
        transaction_type,
        amount_cents,
        description
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    .run(
      data.companyId,
      data.bankAccountId,
      data.transactionDate,
      data.transactionType,
      data.amountCents,
      data.description || null
    );

  return result.lastInsertRowid;
}

export function postDeposit(data) {

  createJournalEntry({
    companyId: data.companyId,
    entryDate: data.transactionDate,
    reference: "BANK-DEPOSIT",
    description: "Bank Deposit",
    lines: [
      {
        accountId: 1,
        debitCents: data.amountCents
      },
      {
        accountId: 5,
        creditCents: data.amountCents
      }
    ]
  });

}

export function postWithdrawal(data) {

  createJournalEntry({
    companyId: data.companyId,
    entryDate: data.transactionDate,
    reference: "BANK-WITHDRAWAL",
    description: "Bank Withdrawal",
    lines: [
      {
        accountId: 8,
        debitCents: data.amountCents
      },
      {
        accountId: 1,
        creditCents: data.amountCents
      }
    ]
  });

}