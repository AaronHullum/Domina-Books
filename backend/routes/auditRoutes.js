import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/:companyId/audit-log",
  (req,res)=>{

    const events =
      db.prepare(`
        SELECT *
        FROM audit_log
        WHERE company_id = ?
        ORDER BY id DESC
      `)
      .all(req.params.companyId);

    res.json({ events });

  }
);

export default router;