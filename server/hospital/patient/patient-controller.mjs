import Patient from "../schema/patient-schema.mjs";

export async function getPatientById(req, res, next) {
  const { id } = req.params;
  try {
    const findUser = await Patient.findById(id);
    if (!findUser) return res.status(400).send("user not found");
    req.findById = findUser;
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
}

// register patient

export async function registerPatient(req, res) {
  const { firstname, lastname, email, mobile, dob } = req.body;
  try {
    const newPatient = new Patient({
      firstname,
      lastname,
      email,
      mobile,
      dob,
    });
    const savedPatient = await newPatient.save();
    return res.status(201).json(savedPatient);
  } catch (error) {
    return res.status(500).json(error);
  }
}

// get all patient

export async function getAllPatient(req, res) {
  try {
    const allPatient = await Patient.find();
    return res.status(200).json(allPatient);
  } catch (error) {
    return res.status(500).json(error);
  }
}

// get one patient

export async function getOnePatient(req, res) {
  const { name } = req.query;
  try {
    const findPatient = await Patient.findOne({ firstname: name });
    if (!findPatient) return res.status(400).send("patient not found");
    return res.status(200).send(findPatient);
  } catch (error) {
    return res.status(500).json(error);
  }
}

// update patient

export async function updatePatient(req, res) {
  const { findById } = req;
  const { firstname, lastname, email, mobile, dob } = req.body;
  try {
    const updatePatient = await Patient.findByIdAndUpdate(findById, {
      firstname,
      lastname,
      email,
      mobile,
      dob,
    });
    if (updatePatient) return res.status(201).send("update successfull");
  } catch (error) {
    return res.status(500).json(error);
  }
}

// delete patient

export async function deletePatient(req, res) {
  const { findById } = req;
  try {
    const deletedPatient = await Patient.findByIdAndDelete(findById);
    if (deletedPatient) return res.status(200).send("delete successfull");
  } catch (error) {
    return res.status(500).json(error);
  }
}
