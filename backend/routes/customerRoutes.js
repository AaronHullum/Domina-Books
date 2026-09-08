import express from "express";

import db from "../database/db.js";

import {
  authenticate
} from "../middleware/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/:companyId/customers",
  (req,res)=>{

    const customers =
      db.prepare(`
        SELECT *
        FROM customers
        WHERE company_id = ?
        ORDER BY display_name
      `)
      .all(req.params.companyId);

    res.json({
      customers
    });

  }
);

router.post(
  "/:companyId/customers",
  (req,res)=>{

    const result =
      db.prepare(`
        INSERT INTO customers
        (
          company_id,
          display_name,
          email,
          phone,
          billing_address
        )
        VALUES (?, ?, ?, ?, ?)
      `)
      .run(
        req.params.companyId,
        req.body.displayName,
        req.body.email || null,
        req.body.phone || null,
        req.body.billingAddress || null
      );

    res.status(201).json({
      customerId:
        result.lastInsertRowid
    });

  }
);

export default router;


