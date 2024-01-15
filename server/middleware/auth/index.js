import users from "#main/models/users";

export default function (req, res, next) {
  const { user } = req.body;
  const userId = (req.headers.authorization || "").replace("Bearer ", "");

  try {
    if (userId) {
      // if password matched then setting user into request
      let user = users.find((user) => user.id === userId);
      if (user) {
        req.userId = userId;
        next();
      } else {
        throw new Error(
          `User with name ${user} does not exists. Please signup to continue.`
        );
      }
    } else {
      throw new Error("Please login to continue.");
    }
  } catch (e) {
    return next(e);
  }
}
