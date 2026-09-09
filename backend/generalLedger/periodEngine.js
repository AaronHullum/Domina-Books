import db from "../database/db.js";

export function lockPeriod(
  companyId,
  periodEnd
) {

  const result =
    db.prepare(`
      INSERT INTO fiscal_periods
      (
        company_id,
        period_end,
        status
      )
      VALUES (?, ?, ?)
    `)
    .run(
      companyId,
      periodEnd,
      "LOCKED"
    );

  return result.lastInsertRowid;
}

export function isPeriodLocked(
  companyId,
  entryDate
) {

  const period =
    db.prepare(`
      SELECT *
      FROM fiscal_periods
      WHERE company_id = ?
        AND period_end >= ?
        AND status = 'LOCKED'
      LIMIT 1
    `)
    .get(
      companyId,
      entryDate
    );

  return !!period;
}