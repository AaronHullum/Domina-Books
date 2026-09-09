import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

// router.use(authenticate);

router.get(
  "/:companyId/dashboard",
  (req,res)=>{

    const companyId =
      req.params.companyId;

    const customers =
      db.prepare(`
        SELECT COUNT(*) AS total
        FROM customers
        WHERE company_id = ?
      `)
      .get(companyId);

    const vendors =
      db.prepare(`
        SELECT COUNT(*) AS total
        FROM vendors
        WHERE company_id = ?
      `)
      .get(companyId);

    const invoices =
      db.prepare(`
        SELECT COUNT(*) AS total
        FROM invoices
        WHERE company_id = ?
      `)
      .get(companyId);

    const bills =
      db.prepare(`
        SELECT COUNT(*) AS total
        FROM bills
        WHERE company_id = ?
      `)
      .get(companyId);

    res.json({
      customers: customers.total,
      vendors: vendors.total,
      invoices: invoices.total,
      bills: bills.total
    });

  }
);

export default router;