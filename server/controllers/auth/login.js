import users from "#main/models/users";

export default function (req, res, next) {
  const { name, password } = req.body;

  if (name && password) {
    const user = users.find((user) => user.name === name);
    if (user && user.password === password) {
      // if password matched then setting user into request
      req.user = name;
      return res.redirect("/products");
    }
  }
  return res.status(401).json({
    error: {
      code: 400,
      message: "Invalid credentials",
      details: "Either password or username is incorrect.",
    },
  });
}
