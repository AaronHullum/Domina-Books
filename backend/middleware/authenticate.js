import jwt from "jsonwebtoken";

export function authenticate(
  req,
  res,
  next
) {
  const auth =
    req.headers.authorization;

  if (
    !auth ||
    !auth.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      error:"Authentication required"
    });
  }

  try {

    const token =
      auth.replace(
        "Bearer ",
        ""
      );

    req.user =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    next();

  } catch {

    return res.status(401).json({
      error:"Invalid token"
    });

  }

}
