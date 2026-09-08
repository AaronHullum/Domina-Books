import express from "express";

import {
  registerUser,
  loginUser
} from "../auth/authService.js";

const router =
  express.Router();

router.post(
  "/register",
  async (req,res)=>{

    try {

      const id =
        await registerUser(
          req.body
        );

      res.status(201).json({
        userId:id
      });

    } catch(error){

      res.status(400).json({
        error:error.message
      });

    }

  }
);

router.post(
  "/login",
  async (req,res)=>{

    try {

      const token =
        await loginUser(
          req.body.email,
          req.body.password
        );

      res.json({ token });

    } catch(error){

      res.status(401).json({
        error:error.message
      });

    }

  }
);

export default router;

