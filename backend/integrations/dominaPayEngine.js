import db from "../database/db.js";
import { createJournalEntry } from "../accounting/journalEngine.js";

export function importPayrollJournal(data) {

  createJournalEntry({
    companyId: data.companyId,
    entryDate: data.payDate,
    reference: data.reference,
    description: "DominaPay Payroll Import",
    lines: data.lines
  });

  const result =
    db.prepare(`
      INSERT INTO payroll_imports
      (
        company_id,
        pay_date,
        reference,
        gross_pay_cents,
        net_pay_cents
      )
      VALUES (?, ?, ?, ?, ?)
    `)
    .run(
      data.companyId,
      data.payDate,
      data.reference,
      data.grossPayCents,
      data.netPayCents
    );

  return result.lastInsertRowid;
}