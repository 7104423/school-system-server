import { UserDAO } from "../../dao/user.dao.js";
import { GroupDAO } from "../../dao/group.dao.js";
import { validateCreate } from "../../validator/user.validator.js";

export async function CreateAbl(req, res) {
  // email is missing
  if (!req.body.email) {
    return res.status(400).json({ message: "Email is missing." });
  }

  // email is already taken
  if (await UserDAO.findByEmail(req.body.email)) {
    return res
      .status(400)
      .json({ message: "Email is already taken. Use other email." });
  }

  // check email format
  let emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegexp.test(req.body.email)) {
    return res.status(400).json({ message: "Bad email format." });
  }

  // name is missing
  if (!req.body.name) {
    return res.status(400).json({ message: "Name is missing." });
  }

  // surname is missing
  if (!req.body.surname) {
    return res.status(400).json({ message: "Surname is missing." });
  }

  // surname have to be string
  if (typeof req.body.surname !== "string") {
    return res.status(400).json({ message: "Surname have to be string." });
  }

  // password requirements ???
  let passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/;
  if (!passwordRegexp.test(req.body.password) && !req.body.thirdPartyIdentity) {
    return res.status(400).json({
      message:
        "Bad password format (min 5 characters, min 1 capital letter, min 1 small letter, min 1 digit).",
    });
  }

  // groups are missing
  if (req.body.groups.length === 0) {
    return res.status(400).json({ message: "Groups are missing." });
  }

  // check groups
  let groups = await GroupDAO.list();
  let groupsParsed = groups.map((item) => item.name);
  let groupValidationFailed = false;
  req.body.groups.forEach((item) => {
    if (!groupsParsed.includes(item)) {
      groupValidationFailed = true;
      return;
    }
  });
  if (groupValidationFailed) {
    return res.status(400).json({
      message: `Unsupported role. Supported roles: ${groupsParsed.join(" ")}.`,
    });
  }

  let result;
  try {
    // ajv validations
    if (!validateCreate(req.body)) {
      throw new Error("Validation failed");
    }

    result = await UserDAO.create(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
