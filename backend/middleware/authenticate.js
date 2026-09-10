export function authenticate(
  req,
  res,
  next
) {
  console.log("AUTH BYPASSED");
  next();
}