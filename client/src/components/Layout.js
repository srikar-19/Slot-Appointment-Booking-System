import React from 'react';
import '../styles/LayoutStyles.css';
import { adminMenu, userMenu } from '../Data/data';
import { useDispatch } from 'react-redux';
import {Link,useNavigate,useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge, message } from 'antd';
import { setUser } from '../redux/features/userSlice';



const Layout = ({children}) => {
    const {user} = useSelector(state=>state.user)
     const dispatch = useDispatch()
   // console.log(user)
    const location = useLocation();
    const navigate = useNavigate();
    // logout function
    const handleLogout = ()=>{
        dispatch(setUser(null))
        localStorage.removeItem("token");
        message.success('Logout Success!')
        navigate('/loginOtp');
    };

    //rendering menu list
    const SidebarMenu = user?.isAdmin?adminMenu : userMenu; 
  return (
    <>
        <div className="main">
            <div className="layout">
                <div className="sidebar">
                    <div className="logo">
                        <h6>Slot Booking System</h6>
                        <hr />
                    </div>
                    <div className="menu">
                        {SidebarMenu.map(menu=>{
                            const isActive = location.pathname === menu.path
                            return (
                                <>
                                    <div className={`menu-item ${isActive && 'active'}`}>
                                        <i className={menu.icon}></i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>
                                </>
                            );
                        })}
                        <div className={`menu-item`} onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <Link to="/loginOtp">Logout</Link>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="header">
                    <div className="header-content" style={{cursor:'pointer'}}>
                    <Badge count={user && user.notification.length} onClick={()=>{navigate('/notification');
                    }}
                    >
                        <i class="fa-solid fa-bell"></i>
                    </Badge>
                        <Link to="/profile">{user?.name}</Link>
                    </div>
                    </div>
                    <div className="body">{children}</div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Layout
