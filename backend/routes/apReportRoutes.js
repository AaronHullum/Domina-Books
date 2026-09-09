import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/:companyId/open-bills",
  (req, res) => {

    const bills =
      db.prepare(`
        SELECT *
        FROM bills
        WHERE company_id = ?
          AND status != 'PAID'
        ORDER BY due_date
      `)
      .all(req.params.companyId);

    res.json({ bills });
  }
);

router.get(
  "/:companyId/vendor-balances",
  (req, res) => {

    const balances =
      db.prepare(`
        SELECT
          v.id,
          v.vendor_name,
          COALESCE(
            SUM(b.balance_cents),
            0
          ) AS balance_cents
        FROM vendors v
        LEFT JOIN bills b
          ON b.vendor_id = v.id
        WHERE v.company_id = ?
        GROUP BY v.id, v.vendor_name
        ORDER BY v.vendor_name
      `)
      .all(req.params.companyId);

    res.json({ balances });
  }
);

router.get(
  "/:companyId/ap-aging",
  (req, res) => {

    const bills =
      db.prepare(`
        SELECT
          vendor_name,
          bill_number,
          due_date,
          balance_cents
        FROM bills b
        JOIN vendors v
          ON b.vendor_id = v.id
        WHERE b.company_id = ?
          AND b.balance_cents > 0
        ORDER BY due_date
      `)
      .all(req.params.companyId);

    res.json({ bills });
  }
);

export default router;