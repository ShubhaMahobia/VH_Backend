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
} = require("../controller/doctorController");

const { updatePatientProfile } = require("../controller/patientController");

const { bookAppointment ,getAppointmentDetails} = require("../controller/appointmentController");

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

//Appointment route
router.post("/bookAppointment", bookAppointment);
router.get('/getAppointments/:id', getAppointmentDetails);

module.exports = router;
