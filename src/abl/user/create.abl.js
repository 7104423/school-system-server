import { UserDAO } from "../../dao/user.dao.js";
import { GroupDAO } from "../../dao/group.dao.js";
import { validateCreate } from "../../validator/user.validator.js";

export async function CreateAbl(req, res) {

  // email is missing
  if (!req.body.email) {
    return res.status(400).json({ message: "Email is missing." });
  }
  
  // email is already taken
  if ( await UserDAO.findByEmail(req.body.email) ) {
    return res.status(400).json({ message: "Email is already taken. Use other email." });
  }
  
  // name is missing
  if (!req.body.name) {
    return res.status(400).json({ message: "Name is missing." });
  }
  
  // surname is missing
  if (!req.body.surname) {
    return res.status(400).json({ message: "Surname is missing." });
  }
  
  // pasword is missing ????
  
  // groups are missing
  if (req.body.groups.length === 0) {
    return res.status(400).json({ message: "Groups are missing." });
  }
  
  // check groups
  let groups = await GroupDAO.list();
  let groupsParsed = groups.map( (item) => item.name );
  let groupValidationFailed = false;
  req.body.groups.forEach( (item) => {
    if (!groupsParsed.includes(item)) {
      groupValidationFailed = true;
      return;
    }
  } );
  if (groupValidationFailed) {
    return res.status(400).json({ message: `Unsupported role. Supported roles: ${groupsParsed.join(" ")}.` })
  }
      
  let result;
  try {
    if (!validateCreate(req.body)) {
      throw new Error("Validation failed");
    }
    result = await UserDAO.create(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
