import React, { useState } from "react";
import { IoLogOut, IoMenu } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { CiBookmarkCheck } from "react-icons/ci";
import { MdComputer } from "react-icons/md";
import { MdDesignServices } from "react-icons/md";
import { IoMdContacts } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotifications } from "react-icons/io";
import { GiArchiveRegister } from "react-icons/gi";
import { FaPeopleRoof } from "react-icons/fa6";
import { GiEgyptianProfile } from "react-icons/gi";
import { useSelector } from "react-redux";
import "./Layout.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";


function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(true);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const userMenu = [
    {
      name: 'Home',
      path: '/dashboard',
      icon: <FaHome />
    },
    {
      name: 'Bookings',
      path: '/bookings',
      icon: <CiBookmarkCheck />
    },
    {
      name: 'Portfolio Web',
      path: '/portfolioWeb',
      icon: <MdComputer />
    },
    {
      name: 'Portfolio Graphic',
      path: '/portfolioGraphic',
      icon: <MdDesignServices />
    },
    {
      name: 'Profile',
      path: `/employee/profile/${user?._id}`,
      icon: <GiEgyptianProfile />
    },
    {
      name: 'Contact Us',
      path: '/contactPage',
      icon: <IoMdContacts />
    }
  ];

  const adminMenu = [
    {
      name: 'Home',
      path: '/dashboard',
      icon: <FaHome />
    },
    {
      name: 'Bookings',
      path: '/bookings',
      icon: <CiBookmarkCheck />
    },
    {
      name: 'Portfolio Web',
      path: '/portfolioWeb',
      icon: <MdComputer />
    },
    {
      name: 'Portfolio Graphic',
      path: '/portfolioGraphic',
      icon: <MdDesignServices />
    },
    {
      name: 'Employees',
      path: '/admin/employees',
      icon: <FaPeopleRoof />
    },
    {
      name: 'Registration',
      path: '/admin/theRegisterSection',
      icon: <GiArchiveRegister />
    },
    {
      name: 'Contact Us',
      path: '/contactPage',
      icon: <IoMdContacts />
    }
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;
  
  return (
    <div className="main p-2">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logoAdmin">ET</h1>
          </div>
          <div className="menuu">
            {menuToBeRendered.map((menu, index) => {
              const isActive = location.pathname === menu.path; 
              return (
                <div className={`menu-item d-flex ${isActive && 'active-menu-item'}`} key={index}>
                  <div className="menu-icon">{menu.icon}</div>
                  {!collapsed && <Link to={menu.path} className="menu-link">{menu.name}</Link>}
                </div>
              )
            })}
            <div className={`d-flex menu-item`} onClick={() => {
              localStorage.clear();
              navigate('/theLoginPart');
            }}>
              <IoLogOut className="menu-icon" />
              {!collapsed && <Link to='/theLoginpart' className="menu-link">Logout</Link>}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? 
              <GiHamburgerMenu  className="header-action-icon" onClick={() => setCollapsed(false)} /> 
              :  
              <IoClose className="header-action-icon" onClick={() => setCollapsed(true)} />
            }
            <div className="d-flex align-items-center px-4">
              <IoIosNotifications className="the-notifications-icon" onClick={() => navigate('/notifications')} />
              <Link className="anchor" to="/profile">{user?.name}</Link>
            </div>
          </div>
          <div className="body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
