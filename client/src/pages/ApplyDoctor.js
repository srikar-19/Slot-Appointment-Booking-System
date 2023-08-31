import Layout  from "./../components/Layout";
import React, { useState , useEffect } from 'react'
import dayjs from 'dayjs';
import { Col,Row,Input,Form,TimePicker, message ,DatePicker} from "antd";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading,hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import {toast} from 'react-toastify'


const ApplyDoctor = () => {
    //handle form
    const {user} = useSelector(state=>state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const onChange = (date, dateString) => {
    //     console.log(date, dateString);
    //   };
        const [formData, setFormData] = useState({
          firstName: '',
          date: '',
          selectedTime: '',
        });

        const [date, setDate] = useState('');
        const [data, setData] = useState([]);
        const buttonStyle = {
            backgroundColor: 'blue', // Replace 'blue' with your desired color
            color: 'white', // You can also set the text color

          };
          const buttonStyle1= {
            backgroundColor: 'red', // Replace 'blue' with your desired color
            color: 'white', // You can also set the text color

          };
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value,
          });
        };
        
        const handleTimeClick = (time) => {
          // Set the selected time when a button is clicked
          setFormData({
            ...formData,
            selectedTime: time,
          });
        };

        const handleDate = async (e)=>{
            e.preventDefault();
            const date=e.target.value;
        //    // console.log(e.target.value)
        //    try{
        //     dispatch(showLoading)
        //     const res= await axios.post('/api/v1/user/get-time-slots',{date},{
        //         headers:{
        //             Authorization:`Bearer ${localStorage.getItem("token")}`
        //         }   

        //     })
        //     console.log(res.data)
        //     setTimeSlots(res.data.data)
            
        //    }catch(error){

        //    }
            setDate(date);
         //   console.log(date)
        
        }

        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log(formData)
            try {
              // Send the form data to your backend API
              dispatch(showLoading)
              const res = await axios.post('/api/v1/user/apply-doctor', {...formData,userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
              });
         //     console.log(res)
              dispatch(hideLoading());
            if(res.data.success){
                toast.success("Booked")
                navigate('/');
            }
            else{
               // console.log(res.data.message)
               toast.error(res.data.message)
             //alert(res.data.message)
            }
        }
        catch(error){
            dispatch(hideLoading());
           
            toast.error("SomeThing went Wrong")
           
        }
          };
          const combinedChangeHandlers = (e) => {
            const {name,value}=e.target
            if(name=='date'){
            handleChange(e);
            handleDate(e);
            }
            else if(name=='firstName'){
                handleChange(e)
            }
          };

     

          useEffect( ()=>{
            if(date){
            //    console.log(date)
                   axios.post('/api/v1/user/get-time-slots',{date},{
                            headers:{
                                Authorization:`Bearer ${localStorage.getItem("token")}`
                            }   
            
                        }).then((response)=>setData(response.data.data)).catch(err=>console.log(err))
                       
                       
                 // Store the received data in the 'data' state variable
            }
            
           
        },[date]);

        
        
        const hasKey =(key,value)=> 
        {
            data?.some((item) => {return item.hasOwnProperty(key) && item[key] === value;})
        };
          
      
    // const handleFininsh = async(values) =>{
    //      console.log(values)
    //     try{
    //         dispatch(showLoading());
    //         const res  = await axios.post('/api/v1/user/apply-doctor',{...values,userId:user._id},{
    //             headers:{
    //                 Authorization: `Bearer ${localStorage.getItem('token')}`
    //             },
    //         });
    //         dispatch(hideLoading());
    //         if(res.data.success){
    //             message.success(res.data.success);
    //             navigate('/');
    //         }
    //         else{
    //          message.error(res.data.success); 
    //         }
    //     }
    //     catch(error){
    //         dispatch(hideLoading());
    //         console.log(error);

    //         message.error('Something Went Wrong');
    //     }
    // }
    //const format='HH:mm'
  return (
    <Layout>
      <h1 className="text-center">Book Slot</h1>


        <form layout='vertical' onSubmit={handleSubmit} className='register-form p-4'>
                <div className="details text-center p-2">
                <label>
                    First Name :
                    <input
                    className="inp m-2 mb-3 mx-3 w-100" type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange} required placeholder="Enter your name"
                    />
                </label>
                <br />
                <label className="date">
                    Select Date :
                    <input className='inp mt-2 cal mx-3 w-100' type="date" name="date" value={formData.date} onChange={combinedChangeHandlers} required />
                </label>
            </div>
            <br />
            {/* <label>
                Time:
                <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                />
            </label> */}
            {/* {console.log(hasKey("selectedTime",'9:00 AM'))} */}
            {/* {data[0]?.selectedTime=="09:00 AM" &&<button type="button"   name="time"  onClick={() => handleTimeClick('09:00 AM')}>9:00 AM</button>} */}
            <h1 className="head lead mt-3 mb-5 p-3 pt-2 text-center">Please select the time slots given below to check its availability and book the Slot.</h1>
            <div className="d-flex flex-row m-3">
                <button type="button" className="btn btn-success w-25 m-2" name="time"  onClick={() => handleTimeClick('12:00 PM')}>10:00 AM</button>
                <button type="button" className="btn btn-success w-25 m-2" name="time"  onClick={() => handleTimeClick('03:00 PM')}>11:00 AM</button>
                <button type="button" className="btn btn-success w-25 m-2" name="time"  onClick={() => handleTimeClick('06:00 PM')}>12:00 PM</button>
                <button type="button" className="btn btn-success w-25 m-2" name="time"  onClick={() => handleTimeClick('06:00 PM')}>01:00 PM</button>
            </div>
            <div className="d-flex flex-row m-3">
                <button type="button" className="btn btn-success w-25 m-2" name="time"  onClick={() => handleTimeClick('06:00 PM')}>02:00 PM</button>
                <button type="button" className="btn btn-success w-25 m-2" name="time"  onClick={() => handleTimeClick('06:00 PM')}>03:00 PM</button>
                <button type="button" className="btn btn-success w-25 m-2" name="time"  onClick={() => handleTimeClick('06:00 PM')}>04:00 PM</button>
                <button type="button" className="btn btn-success w-25 m-2" name="time"  onClick={() => handleTimeClick('06:00 PM')}>05:00 PM</button>
            </div>
            <br />
            <button className="submitbtn" >Check availability and Book</button>
        </form>
    </Layout>
  )
}

export default ApplyDoctor
