const express = require("express");
const { 
    loginController,
    registerController,
    authController,
    applyDoctorController,
    getAllNotificationController,
    timeSlots,
    userOtpSend,
    userLogin
}= require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//routes

//login || post
router.post('/login',loginController);

//register || post
router.post('/register',registerController);

//Auth || post
router.post('/getUserData',authMiddleware,authController);

//ApplyDoctor || post
router.post('/apply-doctor',authMiddleware,applyDoctorController);

//Notification || post
router.post('/get-all-notification',authMiddleware,getAllNotificationController);

router.post('/get-time-slots',authMiddleware,timeSlots);

router.post("/sendotp",userOtpSend);

router.post("/login-otp",userLogin);



module.exports = router;