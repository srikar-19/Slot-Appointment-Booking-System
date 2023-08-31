import Layout from './../components/Layout';
import React from 'react';
import {Tabs, notification} from "antd";
import { useSelector } from 'react-redux';
const NotificationPage = () => {
    const {user} = useSelector((state)=>state.user);
    const handleMarkAllRead = ()=>{

    };
    const handleDeleteAllRead=()=>{

    };
  return (
    <Layout>
        <h3 className='p-3 text-center'>Notification page</h3>
        <Tabs>
            <Tabs.TabPane tab="unRead" key={0}>
                <div className="d-flex justify-content-end">
                    <h5 className='p-2' onClick={handleMarkAllRead}>Mark all as Read</h5>
                </div>
                {user?.notification.map((notificationMsg)=>(
                        <div className="card" onClick={notificationMsg.onClickPath}>
                            <div className="card-text">
                                {notificationMsg.message}
                            </div>
                        </div>
                ))}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Read" key={1}>
                <div className="d-flex justify-content-end">
                    <h5 className='p-2' onClick={handleDeleteAllRead}>Delete all Read</h5>
                </div>
            </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default NotificationPage
