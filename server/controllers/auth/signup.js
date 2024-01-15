import users from "#main/models/users";
import userIdGenerator from "#main/utils/idGenerator/user";

export default function (req, res, next) {
  const { name, password } = req.body;
  try {
    if (name && password) {
      const user = users.find((user) => user.name === name);
      if (user) {
        //if user with giver name already exists the throw error
        throw new Error(
          `User with name ${name} already exists. Please login to continue.`
        );
      } else {
        const user = {
          id: userIdGenerator(),
          name,
          password,
        };
        users.push(user);
        const data = structuredClone(user);
        delete data.password;
        return res.status(201).send({
          message: "User created!",
          data,
        });
      }
    }
    throw new Error("Please enter all the details.");
  } catch (e) {
    next(e);
  }
}
