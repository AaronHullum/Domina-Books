import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get("/:companyId/items",(req,res)=>{

  const items =
    db.prepare(`
      SELECT *
      FROM items
      WHERE company_id = ?
      ORDER BY item_name
    `)
    .all(req.params.companyId);

  res.json({ items });

});

router.post("/:companyId/items",(req,res)=>{

  const result =
    db.prepare(`
      INSERT INTO items
      (
        company_id,
        sku,
        item_name,
        unit_cost_cents
      )
      VALUES (?, ?, ?, ?)
    `)
    .run(
      req.params.companyId,
      req.body.sku,
      req.body.itemName,
      req.body.unitCostCents
    );

  res.status(201).json({
    itemId: result.lastInsertRowid
  });

});

export default router;