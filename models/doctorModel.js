const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    firstName:{
        type:String,
        required:[true,'first name is required'],
    },
    status:{
        type:String,
        default:'pending',
    },
    date:{
        type:Date,
        required:true,
    },
    selectedTime: { 
        type: String, 
        // default: Date.now,
        required:true
     }

},{timestamps:true}
);

const doctorModel = mongoose.model('doctors',doctorSchema);
module.exports = doctorModel