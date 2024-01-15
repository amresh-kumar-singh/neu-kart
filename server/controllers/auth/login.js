import users from "#main/models/users";

export default function (req, res, next) {
  const { name, password } = req.body;
  try {
    if (name && password) {
      const user = users.find((user) => user.name === name);
      if (user && user.password === password) {
        // if password matched then setting user into request
        const data = structuredClone(user);
        delete data.password;
        res.status(200);
        return res.json({
          message: "User Logged in!",
          data,
        });
      }
    }
    throw new Error('"Either password or username is incorrect."');
  } catch (e) {
    next(e);
  }
}
