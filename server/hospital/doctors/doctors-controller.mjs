import Doctors from "../schema/doctors-schema.mjs";

// get by Id

export async function getDoctorById(req, res, next) {
  const { id } = req.params;
  try {
    const findUser = await Doctors.findOne({ _id: id });
    if (!findUser) return res.status(400).send("user not found");
    req.findUser = findUser;
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
}

// register doctor

export async function reisterDoctor(req, res) {
  const { firstname, lastname, email, position, image } = req.body;
  try {
    const newDoctor = new Doctors({
      firstname,
      lastname,
      email,
      position,
      image,
    });
    const savedDoctor = await newDoctor.save();
    if (newDoctor) return res.status(201).json(savedDoctor);
  } catch (error) {
    return res.status(500).json(error);
  }
}

// get all doctor

export async function getAllDoctors(req, res) {
  try {
    const allDoctors = await Doctors.find();
    if (allDoctors) return res.status(200).json(allDoctors);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function getDoctor(req, res) {
  const { name } = req.query;
  try {
    // find doctor
    const findDoctor = await Doctors.findOne({ firstname: name });
    if (!findDoctor) return res.status(404).send("User not found");
    return res.status(200).send(findDoctor);
  } catch (error) {
    return res.status(500).json(error);
  }
}

// update doctor

export async function updateDoctor(req, res) {
  const { findUser } = req;
  const { firstname, lastname, email, position, image } = req.body;
  try {
    const updateDoctor = await Doctors.findOneAndUpdate(
      { _id: findUser },
      { firstname, lastname, email, position }
    );
    if (updateDoctor) return res.status(201).json("updated");
    return res.status(500).send("Could not update user");
  } catch (error) {
    return res.status(500).json(error);
  }
}

// delete doctor

export async function deleteDoctor(req, res) {
  const { findUser } = req;
  try {
    const deletedDoctor = await Doctors.findByIdAndDelete(findUser);
    if (deletedDoctor) return res.status(201).send("deleted successfull");
    return res.status(500).send("could not delete");
  } catch (error) {
    return res.status(500).json(error);
  }
}
