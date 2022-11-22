import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signOut } from '../reducers/auth/reducer'
import SettingPopup from './elements/SettingPoup'
//images start
import loginIcon from '../assets/images/login.png'
//images end

const AppBreadcrumb = (props) =>  {

    const dispatch = useDispatch()

    const arrTitleInfo = [
        { childName:'CreateMachine', title:'MACHINE SETTINGS' },
        { childName:'CreateProfile', title:'MACHINE SETTINGS / PROFILE CREATION' },
        { childName:'LocationSetting', title:'MACHINE SETTINGS / LOCATION SETTING' },
        { childName:'UpdateMachine', title:'MACHINE LIST' },
        { childName:'CreateZone', title:'CREATE ZONE' },
        { childName: 'UpdateZone', title: 'UPDATE ZONE' },
        { childName:'ApiSettings', title:'API SETTING' },
        { childName:'GroupView', title:'GROUP VIEW' },
        { childName:'MachineView', title:'MACHINE VIEW' },
    ]

    const getTilteByChild = () => {
        let t
        arrTitleInfo.map((info)=>{
            if (info.childName === props.subChild) t = info.title
        })
        return t
    }

    const title = getTilteByChild()

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top">
        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
            <i className="fa fa-bars"></i>
        </button>

        <div className="heading">
            <h2>{title}</h2>
        </div>

        <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown no-arrow">
                <div className="dropdown">
                    <a href='#' id="userDropdown" className="dropdown-toggle pointer" data-bs-toggle="dropdown">
                        <img className="img-profile rounded-circle" src={loginIcon} alt="login_ico"/>
                    </a>
                    <SettingPopup/>
                </div>
            </li>
        </ul>
    </nav>
  )
}

export default AppBreadcrumb
