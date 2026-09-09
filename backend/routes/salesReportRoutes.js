import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get("/:companyId/open-sales-orders",(req,res)=>{

  const orders =
    db.prepare(`
      SELECT *
      FROM sales_orders
      WHERE company_id = ?
        AND status = 'OPEN'
      ORDER BY order_date
    `)
    .all(req.params.companyId);

  res.json({ orders });

});

export default router;