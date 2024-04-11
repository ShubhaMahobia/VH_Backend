const express = require("express");
const {
  test,
  signUpPatient,
  isNewUser,
  signUpDoctor,
  loginUser,
  fetchUserDetails,
  fetchDoctorDetails,
} = require("../controller/authenticationController");

const {
  fetchAllDoctors,
  fetchDoctorById,
  updateDoctorProfile,
} = require("../controller/doctorController");

const { updatePatientProfile } = require("../controller/patientController");

const {
  bookAppointment,
  getAppointmentDetails,
} = require("../controller/appointmentController");

const {
  generatePrecription,
  getPrescriptionDetails,
} = require("../controller/prescriptionController");

const {
  getDocumentDetails,
  uploadDocument,
} = require("../controller/documentController");

const {
  addHospital,
  getHospitalDetails,
  getAllHospitalDetails,
  fetchHospitalsByLocation,
} = require("../controller/hospitalController");

const router = express.Router();

router.get("/", test);
router.post("/registerPatient", signUpPatient);
router.post("/checkNewUser", isNewUser);
router.post("/registerDoctor", signUpDoctor);
router.post("/getUser", fetchUserDetails);
router.post("/getDoctor", fetchDoctorDetails);
router.get("/getAllDoctors", fetchAllDoctors);
router.get("/getDoctorById/:id", fetchDoctorById);
router.put("/updatePatient/:id", updatePatientProfile);
router.put("/updateDoctor/:id", updateDoctorProfile);

//Appointment route
router.post("/bookAppointment", bookAppointment);
router.get("/getAppointments/:id", getAppointmentDetails);

//Prescription route
router.post("/generatePrescription", generatePrecription);
router.get("/getPrescription/:id", getPrescriptionDetails);

//Document route
router.post("/uploadDocument", uploadDocument);
router.get("/getDocument/:id", getDocumentDetails);

//Hospital route
router.post("/addHospital", addHospital);
router.get("/getHospital/:id", getHospitalDetails);
router.get("/getAllHospital", getAllHospitalDetails);
router.post("/fetchHospitals", fetchHospitalsByLocation);

module.exports = router;
