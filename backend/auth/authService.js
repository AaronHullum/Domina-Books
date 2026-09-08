import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../database/db.js";

export async function registerUser(data) {

  const existing = db.prepare(
    "SELECT id FROM users WHERE email = ?"
  ).get(data.email);

  if (existing) {
    throw new Error("Email already exists");
  }

  const hash = await bcrypt.hash(
    data.password,
    10
  );

  const result = db.prepare(`
    INSERT INTO users
    (
      email,
      password_hash,
      first_name,
      last_name
    )
    VALUES (?, ?, ?, ?)
  `).run(
    data.email,
    hash,
    data.firstName || null,
    data.lastName || null
  );

  return result.lastInsertRowid;
}

export async function loginUser(
  email,
  password
) {

  const user = db.prepare(`
    SELECT *
    FROM users
    WHERE email = ?
  `).get(email);

  if (!user) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const valid =
    await bcrypt.compare(
      password,
      user.password_hash
    );

  if (!valid) {
    throw new Error(
      "Invalid credentials"
    );
  }

  return jwt.sign(
    {
      userId:user.id,
      email:user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn:"8h"
    }
  );
}
