import Admin from "../schema/schema.mjs";

// register admin
export async function registerAdmin(req, res) {
  const { username, password, image } = req.body;
  try {
    const newAdmin = new Admin({ username, password, image });
    const savedAdmin = await newAdmin.save();
    if (savedAdmin) {
      return res.send(savedAdmin);
    }
  } catch (error) {
    return res.json(error);
  }
}

// login
export async function adminLogin(req, res) {
  const { username, password } = req.body;
  // find admin
  try {
    const findAdmin = await Admin.findOne({ username, password });
    if (!findAdmin) {
      return res.status(404).json("Invalid Credentials");
    }
    return res.status(200).send("Verified");
  } catch (error) {
    return res.status(500).json({ error });
  }
}

// update admin

export async function updateAdmin(req, res) {
  const { username, password } = req.body;
  const { id } = req.params;
  try {
    const findById = await Admin.findById(id);
    if (!findById) return res.status(404).send("not found");
    const updateAdmin = await Admin.findByIdAndUpdate(id, {
      username,
      password,
    });
    if (updateAdmin) return res.status(200).send("update successfull");
  } catch (error) {
    return res.status(500).json(error);
  }
}

// get admin

export async function getAdmin(req, res) {
  try {
    const findAdmin = await Admin.find();
    if (findAdmin) return res.status(200).json(findAdmin);
  } catch (error) {
    return res.status(500).json(error);
  }
}
