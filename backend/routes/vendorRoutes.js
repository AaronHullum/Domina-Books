import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

// router.use(authenticate);

router.get(
  "/:companyId/vendors",
  (req, res) => {

    const vendors =
      db.prepare(`
        SELECT *
        FROM vendors
        WHERE company_id = ?
        ORDER BY vendor_name
      `)
      .all(req.params.companyId);

    res.json({ vendors });
  }
);

router.post(
  "/:companyId/vendors",
  (req, res) => {

    const result =
      db.prepare(`
        INSERT INTO vendors
        (
          company_id,
          vendor_name,
          email,
          phone,
          address
        )
        VALUES (?, ?, ?, ?, ?)
      `)
      .run(
        req.params.companyId,
        req.body.vendorName,
        req.body.email || null,
        req.body.phone || null,
        req.body.address || null
      );

    res.status(201).json({
      vendorId: result.lastInsertRowid
    });
  }
);

export default router;