import React from 'react'
import '../styles/LoginStyles.css';
import { Button, Checkbox, Form, Input,message } from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
const Login = () => {
    const navigate = useNavigate()
    const dispatch=useDispatch();
    // form handler
    const onfinishHandler= async(values)=>{
        // console.log(values)
        try{
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/login',values)
            // window.location.reload();
            dispatch(hideLoading());
            //console.log(res)
            if(res.data.success){
                localStorage.setItem("token",res.data.token);
                message.success('Login Success!');
                navigate("/");
            }
            else{
                dispatch(hideLoading());
                message.error(res.data.message)
            }
        }
        catch(error){
            console.log(error);
            message.error('something went wrong')
        }

    };
  return (
    
    <>
    <div className="form-container">
        <Form layout='vertical' onFinish={onfinishHandler} className='register-form p-4'>
        <h3 className='text-center'>Login Form</h3>
            {/* <Form.Item label="Name" name="name">
                <Input type="text" required/>
            </Form.Item> */}
            <Form.Item label="Email" name="email">
                <Input type="email" required/>
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type="password" required/>
            </Form.Item>
            <Link to="/register" className='ms-3 me-2'>Not a user?Register here</Link>
            <button className='btn btn-primary' type='submit'>Login</button>
        </Form>
    </div>
    </>
  )
}

export default Login