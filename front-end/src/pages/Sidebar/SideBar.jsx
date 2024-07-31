import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaCommentsDollar, FaHome } from 'react-icons/fa';
import { MdMessage, MdOutlineCoPresent, MdOutlinePowerSettingsNew, MdOutlineShoppingBag } from 'react-icons/md';
import { SlPeople } from "react-icons/sl";
import { IoChatbubbleEllipsesOutline, IoPricetagsOutline, IoSettingsOutline } from "react-icons/io5";
import { AnimatePresence, motion } from 'framer-motion';
import SidebarMenu from './SidebarMenu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BsBagCheck, BsBank } from "react-icons/bs";
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Select from '@mui/material/Select';
import styled from 'styled-components';
import './SideBar.css';
import { useSelector } from "react-redux";
import { LuBoxes, LuWarehouse } from "react-icons/lu";
import { FiTag } from "react-icons/fi";

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background-color: #2d2d2d;
    border-radius: 5px;
`;

const StatusIndicator = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${(props) => (props.isOnline ? 'green' : 'red')};
`;

const routes = [
    { path: '/', name: 'Dashboard', icon: <IconContainer><FaHome color="white" /></IconContainer> },
    { path: '/party', name: 'Parties', icon: <IconContainer><SlPeople color="white" /></IconContainer> },
    { path: '/posbilling', name: 'POS-Billing', icon: <IconContainer><MdMessage color="white" /></IconContainer> },

    {
        path: '/item',
        name: 'Items',
        icon: <IconContainer><LuBoxes color="white" /></IconContainer>,
        subRoutes: [
            { path: '/item/inventory', name: 'Inventory', icon: <IconContainer><LuBoxes color="white" /></IconContainer> },
            {
                path: '/item/godowon',
                name: 'Godowon ',
                icon: <IconContainer><LuWarehouse color="white" /></IconContainer>
            },
        ]
    },
    {
        path: '/sales',
        name: 'Sales',
        icon: <IconContainer><FiTag color="white" /></IconContainer>,
        subRoutes: [
            {
                path: '/sales/invoice',
                name: 'Sales Invoice',
                icon: <IconContainer><IoPricetagsOutline color="white" /></IconContainer>
            }, {
                path: '/sales/estimate',
                name: 'Quotation',
                icon: <IconContainer><IoPricetagsOutline color="white" /></IconContainer>
            }, {
                path: '/sales/payment-in',
                name: 'Payment In',
                icon: <IconContainer><IoPricetagsOutline color="white" /></IconContainer>
            },
            {
                path: '/sales/return',
                name: 'Sales Return',
                icon: <IconContainer><IoPricetagsOutline color="white" /></IconContainer>
            },

            {
                path: '/Sales/credit-note',
                name: 'Credit Note',
                icon: <IconContainer><IoPricetagsOutline color="white" /></IconContainer>
            },
            {
                path: '/sales/delivery',
                name: 'Delivery Challan ',
                icon: <IconContainer><IoPricetagsOutline color="white" /></IconContainer>
            },
            {
                path: '/sales/proforma',
                name: 'Proforma Invoice',
                icon: <IconContainer><IoPricetagsOutline color="white" /></IconContainer>
            },
        ]
    },
    {
        path: '/purchases',
        name: 'Purchase',
        icon: <IconContainer><MdOutlineShoppingBag color="white" /></IconContainer>,
        subRoutes: [
            {
                path: '/purchases/invoice',
                name: 'Purchase Invoice',
                icon: <IconContainer><BsBagCheck color="white" /></IconContainer>
            },
            {
                path: '/purchases/order',
                name: 'Purchase Order',
                icon: <IconContainer><BsBagCheck color="white" /></IconContainer>
            },
            {
                path: '/purchases/return',
                name: 'Purchase Return',
                icon: <IconContainer><BsBagCheck color="white" /></IconContainer>
            },
            {
                path: '/purchases/payment-out',
                name: 'Payment Out',
                icon: <IconContainer><BsBagCheck color="white" /></IconContainer>
            },
            {
                path: '/purchases/debit-note',
                name: 'Debit Note',
                icon: <IconContainer><BsBagCheck color="white" /></IconContainer>
            },
        ]
    },
    { path: '/attendance', name: 'Attendance', icon: <IconContainer><MdOutlineCoPresent color="white" /></IconContainer> },
    { path: '/bank', name: 'Cash & Bank', icon: <IconContainer><BsBank color="white" /></IconContainer> },
    { path: '/report', name: 'Reports', icon: <IconContainer><HiOutlineDocumentReport color="white" /></IconContainer> },
    { path: '/expenses', name: 'Expenses', icon: <IconContainer><FaCommentsDollar color="white" /> </IconContainer> }, ,
    { path: '/chat', name: 'Chat', icon: <IconContainer><IoChatbubbleEllipsesOutline color="white" /></IconContainer> },
    { path: '/settings/account', name: 'Settings', icon: <IconContainer><IoSettingsOutline color="white" /></IconContainer> },
    { path: '/logout', name: 'Logout', icon: <IconContainer><MdOutlinePowerSettingsNew color="white" /></IconContainer> },
];

const settings = [
    { name: 'Profile', path: '/profile' },
    { name: 'Account', path: '/Account' },
    { name: 'Setting', path: '/settings' },
    { name: 'Dashboard', path: '/' },
    { name: 'Logout', path: '/logout' }
];

const SideBar = ({ children }) => {
    const { businessUser } = useSelector((state) => state.manageBusinessReducerValue);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [selectedBusiness, setSelectedBusiness] = useState(localStorage.getItem("BusinessName") || '');
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const [notificationsCount, setNotificationsCount] = useState(5);
    const [businessNameFromLS, setBusinessNameFromLS] = useState(localStorage.getItem("BusinessName") || '');
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        setSelectedBusiness(businessNameFromLS);
    }, [businessNameFromLS]);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleBusinessChange = (event) => {
        setSelectedBusiness(event.target.value);
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const getRouteName = () => {
        if (!routes || !Array.isArray(routes)) {
            return 'Dashboard';
        }
        const route = routes.find(r => r && r.path === location.pathname);
        if (route && route.name) {
            return route.name;
        } else {
            for (const mainRoute of routes) {
                if (mainRoute && mainRoute.subRoutes && Array.isArray(mainRoute.subRoutes)) {
                    const subRoute = mainRoute.subRoutes.find(sr => sr && sr.path === location.pathname);
                    if (subRoute && subRoute.name) {
                        return subRoute.name;
                    }
                }
            }
        }
        return 'Dashboard';
    };

    const showAnimation = {
        hidden: { width: 0, opacity: 0, transition: { duration: 0.5 } },
        show: { opacity: 1, width: "auto", transition: { duration: 0.5 } },
    };

    const handleSettingsItemClick = (path) => {
        handleCloseUserMenu();
        navigate(path);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleSidebar}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
                        {getRouteName()}
                    </Typography>
                    <Box sx={{ flexGrow: 0, display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <Tooltip title={isOnline ? "You are online" : "You are offline. Please check your internet connection."}>
                            <StatusIndicator isOnline={isOnline} />
                        </Tooltip>
                        <Select
                            value={selectedBusiness}
                            onChange={handleBusinessChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            sx={{ color: 'inherit', '& .MuiSvgIcon-root': { color: 'inherit' } }}
                        >
                            {Array.isArray(businessUser) && businessUser.length > 0 ? (
                                businessUser.map((business) => (
                                    <MenuItem key={business.businessId} value={business.businessName}>
                                        {business.businessName}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem value="">
                                    <em>No businesses available</em>
                                </MenuItem>
                            )}
                        </Select>
                        <Tooltip title="Messages">
                            <IconButton color="inherit">
                                <Badge badgeContent={4} color="error">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Updates">
                            <IconButton color="inherit">
                                <Badge badgeContent={notificationsCount} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.name} onClick={() => handleSettingsItemClick(setting.path)}>
                                    <Typography textAlign="center">{setting.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <div className="main-container">
                <motion.div
                    animate={{
                        width: isOpen ? "230px" : "60px",
                        transition: {
                            duration: 0.5,
                            type: "spring",
                            damping: 10,
                        },
                    }}
                    className="sidebar"
                    style={{ height: '100vh', overflow: 'hidden' }}
                >
                    <section className="routes"
                             style={{ height: 'calc(100vh - 64px)', overflowY: 'auto', overflowX: 'hidden' }}>
                        {routes.map((route, index) => {
                            if (route.subRoutes) {
                                return (
                                    <SidebarMenu
                                        key={route.path}
                                        setIsOpen={setIsOpen}
                                        route={route}
                                        showAnimation={showAnimation}
                                        isOpen={isOpen}
                                    />
                                );
                            }
                            return (
                                <NavLink
                                    to={route.path}
                                    key={index}
                                    className="link"
                                    activeClassName="active"
                                >
                                    <div className="icon">{route.icon}</div>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                variants={showAnimation}
                                                initial="hidden"
                                                animate="show"
                                                exit="hidden"
                                                className="link_text"
                                            >
                                                {route.name}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </NavLink>
                            );
                        })}
                    </section>
                </motion.div>
                <main style={{ height: 'calc(100vh - 64px)', overflowY: 'auto', overflowX: 'hidden' }}>
                    {children}
                </main>
            </div>
        </>
    );
};

export default SideBar;
