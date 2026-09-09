import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/:companyId/executive-summary",
  (req,res)=>{

    const companyId =
      req.params.companyId;

    const ar =
      db.prepare(`
        SELECT
          COALESCE(
            SUM(balance_cents),
            0
          ) AS total
        FROM invoices
        WHERE company_id = ?
      `)
      .get(companyId);

    const ap =
      db.prepare(`
        SELECT
          COALESCE(
            SUM(balance_cents),
            0
          ) AS total
        FROM bills
        WHERE company_id = ?
      `)
      .get(companyId);

    const inventory =
      db.prepare(`
        SELECT
          COALESCE(
            SUM(
              quantity