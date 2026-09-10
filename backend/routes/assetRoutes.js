import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";
import { createAsset } from "../fixedAssets/assetEngine.js";

const router = express.Router();

// router.use(authenticate);

router.get("/:companyId/assets",(req,res)=>{

  const assets =
    db.prepare(`
      SELECT *
      FROM fixed_assets
      WHERE company_id = ?
      ORDER BY id DESC
    `)
    .all(req.params.companyId);

  res.json({ assets });

});

router.post("/:companyId/assets",(req,res)=>{

  const assetId =
    createAsset({
      companyId:Number(req.params.companyId),
      ...req.body
    });

  res.status(201).json({
    assetId
  });

});

export default router;