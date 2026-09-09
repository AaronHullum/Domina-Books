import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/:companyId/payroll-imports",
  (req,res)=>{

    const imports =
      db.prepare(`
        SELECT *
        FROM payroll_imports
        WHERE company_id = ?
        ORDER BY id DESC
      `)
      .all(req.params.companyId);

    res.json({ imports });

  }
);

export default router;