const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');
const userotp=require('../models/userOtp')

const nodemailer = require("nodemailer");


// email config
const tarnsporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

//register callback
const registerController = async(req,res)=>{
    try{
        const existingUser = await userModel.findOne({email:req.body.email})
        if(existingUser){
            return res.status(200).send({message:'User Already Exist',success:false})
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        req.body.password = hashedPassword
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({message:'Register Successfully',success:true});
    }
    catch(error){
        console.log(error)
        res.status(500).send({success:false,message:`Register Controller ${error.message}`})
    }
};

//login callback
const loginController = async(req,res)=>{
    try{
        const user = await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(200).send({message:'user Not found',success:false})
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password)
        if(!isMatch){
            return res.status(200).send({message:'Invalid Email or Password',success:false})
        }
        
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        //console.log(token)
        res.status(200).send({message:'Login Success',success:true,token})
    }
    catch(error){
        console.log(error)
        res.status(500).send({message:`Error in Login CTRL ${error.message}`})


    }
};

//auth call back
const authController = async(req,res)=>{
    try{
        const user = await userModel.findOne({_id:req.body.userId});
        user.password=undefined;
        if(!user){
            return res.status(200).send({message:'User Not Found!',success:false,});
        }
        else{
            res.status(200).send({
                success:true,
                data:user
            ,});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send({message:'Auth Error',success:false,error})
    }
};

//Apply Doc CTRL
const applyDoctorController=async(req,res)=>{
    try{
       // console.log(req.body)
       const { date, selectedTime } = req.body;
       const existingAppointment = await doctorModel.findOne({ date, selectedTime });
       if (existingAppointment) {
        return res.status(200).send({
            success:false,
            message:'Time slot is not Available'
        });
      }

    //   console.log(existingAppointment)
        const newDoctor = await doctorModel({...req.body,status:'pending'})
        await newDoctor.save();
        const adminUser = await userModel.findOne({isAdmin:true})
        const notification = adminUser.notification
        notification.push({
            type:'apply-doctor-request',
            message:`${newDoctor.firstName} ${newDoctor.timings} Has Applied for a doctor account`,
            data:{
                doctorId:newDoctor._id,
                name:newDoctor.firstName,
                onClickPath:'/admin/doctors',
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id , { notification })
        res.status(201).send({
            success:true,
            message:'doctor account applied successfully'
        });
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while Applying for doctor!'
        })
    }
};

const timeSlots=async(req,res)=>{
    try{
       // console.log(req.body)
       const { date } = req.body;
       console.log(date)
       const existingAppointment = await doctorModel.find({ date });
      
        return res.status(200).json({
            success:true,
            data:existingAppointment
        });
      } 
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while Applying for doctor!'
        })
    }
};


// notification CTRL

const getAllNotificationController = async(req,res)=>{
    try{
        const user = await userModel.findOne({_id:req.body.userId});
        const seennotification = user.seennotification;
        const notification = user.notification;
        seennotification.push(...notification);
        user.notification = [];
        user.seennotification = notification;
        const updatedUser = await user.save();
        res.status(200).send({
            message:'all notifications marked as read',
            success:true,
            data:updatedUser,
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            message:'Error in notification',
            success:false,
            error,
        })
    }
};

const userOtpSend = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ error: "Please Enter Your Email" })
    }


    try {
        const presuer = await userModel.find({ email: email });

        if (presuer) {
            const OTP = Math.floor(100000 + Math.random() * 900000);

            const existEmail = await userotp.findOne({ email: email });


            if (existEmail) {
                const updateData = await userotp.findByIdAndUpdate({ _id: existEmail._id }, {
                    otp: OTP
                }, { new: true }
                );
                await updateData.save();

                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Slot Booking System",
                    text: 'Dear user,\n'.concat(`${OTP} this is your one time password for loging into your application.`)
                }


                tarnsporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ message: "Email sent Successfully" })
                    }
                })

            } else {

                const saveOtpData = new userotp({
                    email, otp: OTP
                });

                await saveOtpData.save();
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Sending Email For Otp Validation",
                    text: `OTP:- ${OTP}`
                }

                tarnsporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ message: "Email sent Successfully" })
                    }
                })
            }
        } else {
            res.status(400).json({ error: "This User Not Exist In our Db" })
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }
};

const userLogin = async(req,res)=>{
    const {email,otp} = req.body;
    //console.log(otp)
    if(!otp || !email){
      //  console.log("hello")
        res.status(400).json({ error: "Please Enter Your OTP and email" })
    }

    try {
        
        const otpverification = await userotp.findOne({email:email});
        
        if(otpverification?.otp === otp){
            const preuser = await userModel.findOne({email:email});
           
            

            const token =  jwt.sign({id:preuser._id},process.env.JWT_SECRET,{expiresIn:'1d'})
           res.status(200).json({message:"User Login Succesfully Done",userToken:token});

         }else{
            return res.send({error:"Invalid Otp"})
         }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }
}


module.exports={
    loginController,
    registerController,
    authController,
    applyDoctorController,
    getAllNotificationController,
    timeSlots,
    userOtpSend,
    userLogin,
};

