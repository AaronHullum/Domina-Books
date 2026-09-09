import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get("/:companyId/fixed-assets",(req,res)=>{

  const assets =
    db.prepare(`
      SELECT *
      FROM fixed_assets
      WHERE company_id = ?
      ORDER BY asset_name
    `)
    .all(req.params.companyId);

  res.json({ assets });

});

export default router;