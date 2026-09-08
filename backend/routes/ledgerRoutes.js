import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/:companyId/general-ledger",
  (req,res)=>{

    const rows =
      db.prepare(`
        SELECT
          je.id,
          je.entry_date,
          je.description,
          a.code,
          a.name,
          jl.debit_cents,
          jl.credit_cents

        FROM journal_entries je

        INNER JOIN journal_lines jl
          ON jl.journal_entry_id = je.id

        INNER JOIN accounts a
          ON a.id = jl.account_id

        WHERE je.company_id = ?

        ORDER BY
          je.entry_date,
          je.id
      `)
      .all(req.params.companyId);

    res.json({
      ledger: rows
    });

  }
);

export default router;
