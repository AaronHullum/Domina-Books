import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

// router.use(authenticate);

router.get("/:companyId/on-hand",(req,res)=>{

  const inventory =
    db.prepare(`
      SELECT
        i.id,
        i.sku,
        i.item_name,
        COALESCE(
          SUM(
            CASE
              WHEN t.transaction_type = 'RECEIPT'
              THEN t.quantity
              ELSE -t.quantity
            END
          ),
          0
        ) AS qty_on_hand
      FROM items i
      LEFT JOIN inventory_transactions t
        ON t.item_id = i.id
      WHERE i.company_id = ?
      GROUP BY i.id
      ORDER BY i.item_name
    `)
    .all(req.params.companyId);

  res.json({ inventory });

});

export default router;