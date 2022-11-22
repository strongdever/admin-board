import React from 'react'
import { Link, useLocation } from 'react-router-dom';
//images start
import logoIcon from '../assets/images/logo.png'
import machineIcon from '../assets/images/machine.png'
import updateIcon from '../assets/images/update.png'
import zonesIcon from '../assets/images/zones.png'
import addressIcon from '../assets/images/addresss.png'
import settingsIcon from '../assets/images/settings.png'
import grviewIcon from '../assets/images/grview.png'
import mvIcon from '../assets/images/mv.png'
//images end

const NavItem = (props) => (
    <li className={`nav-item ${props.info.active ? "active" : ""}`}>
        <Link className="nav-link" to={props.info.href}>
            <img src={props.info.iconUrl} />
            <span>{props.info.itemName}</span>
        </Link>
    </li>
)

const AppSidebar = () =>  {

    const arrNavItemsInfo = [
        { iconUrl: machineIcon, itemName: "CREATE MACHINE", href:"/createmachine", active:false},
        { iconUrl: updateIcon, itemName: "UPDATE MACHINE", href:"/updatemachine", active:false},
        { iconUrl: zonesIcon, itemName: "CREATE ZONE", href:"/createzone", active:false },
        { iconUrl: addressIcon, itemName: "UPDATE ZONE", href:"/updatezone", active:false },
        { iconUrl: settingsIcon, itemName: "API SETTINGS", href:"/apisettings", active:false },
        { iconUrl: grviewIcon, itemName: "GROUP VIEW", href:"/groupview", active:false },
        { iconUrl: mvIcon, itemName: "MACHINE VIEW", href: "/machineview", active:false },
    ]

    const currentLocation = useLocation().pathname

    const isActive = (pathname, arrNavItemsInfo) => {
        const currentInfo = arrNavItemsInfo.find((info) => info.href === pathname)
        return currentInfo ? currentInfo.active = true : false
    }

    const isActiveProcess = (location) => {
        location.split('/').reduce((prev, curr) => {
            const currentPathname = `${prev}/${curr}`
            isActive(currentPathname, arrNavItemsInfo)
            return currentPathname
        })
    }

    isActiveProcess(currentLocation)

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <a className="sidebar-brand d-flex align-items-center justify-content-center pb-5" href="index.html">
            <div className="sidebar-brand-icon">
                <div className="sidebar-brand-text pl-2 pr-2">
                    <img src={logoIcon} className="full-width" alt="logo" />
                </div>
            </div>
        </a>
        
        {arrNavItemsInfo.map((iteminfo, i) => (
            <NavItem
                key={i}
                info={iteminfo}/>
        ))}

    </ul>
  )
}

export default AppSidebar
