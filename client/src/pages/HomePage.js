// import React from 'react'; 
import React,{useEffect} from 'react';
import axios from 'axios';
import Layout from '../components/Layout.js';
const HomePage = () => {
    //login user data
    const getUserData=async()=>{
        try{
            const res = await axios.post('/api/v1/user/getUserData',{},
            {
                headers:{
                    Authorization:"Bearer " + localStorage.getItem('token')
                },
            }
            );
        }
        catch(error){
            console.log(error); 
        }
    }; 
    useEffect(()=>{
        getUserData();
    },[])
  return (
    <Layout>
        <h1 className='text-center'>Home Page</h1>
        <br />
        <br />
        <br />
        <br />
        <h1 className='text-center bg-primary p-4 text-white m-4'>Please goto 'Book the slot' menu on the left side!</h1>
    </Layout>
  );
};

export default HomePage
