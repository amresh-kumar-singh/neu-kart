import users from "#main/models/users";
import userIdGenerator from "../../utils/userIdGenerator";

export default function (req, res, next) {
  const { user } = req.body;
  try {
    if (user) {
      // if password matched then setting user into request
      let user = users.find((user) => user.name === name);
      if (user) {
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
