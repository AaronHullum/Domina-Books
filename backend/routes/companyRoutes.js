import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.post("/", (req,res)=>{

  const { name } = req.body;

  if(!name){
    return res.status(400).json({
      error:"Company name required"
    });
  }

  const org = db.prepare(`
    INSERT INTO organizations(name)
    VALUES (?)
  `).run(name);

  const company = db.prepare(`
    INSERT INTO companies
    (
      organization_id,
      name
    )
    VALUES (?,?)
  `).run(
    org.lastInsertRowid,
    name
  );

  db.prepare(`
    INSERT INTO company_users
    (
      company_id,
      user_id,
      role
    )
    VALUES (?,?,?)
  `).run(
    company.lastInsertRowid,
    req.user.userId,
    "OWNER"
  );

  res.status(201).json({
    companyId: company.lastInsertRowid
  });

});

export default router;
