import React from 'react'
import { useDispatch } from 'react-redux'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { signOut } from '../../reducers/auth/reducer'
//image start
import userIcon from '../../assets/images/users.png'
import etsIcon from '../../assets/images/ets.png'
import signOutIcon from '../../assets/images/sign-out.png'
import arrowIcon from '../../assets/images/arrow.png'
//image end


const SettingPopup = () => {

    const dispatch = useDispatch()
    const onSingOut = () => {
        dispatch(signOut())
    }

    return (
        <div className="dropdown-menu">
            <div className="selectzone-popup settings-popups">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">SETTINGS</h5>
                        </div>
                        <div className="modal-body">
                            <main>
                                <ul>
                                    <li>
                                        <a href="#"><img src={userIcon} /> EDIT PROFILE <img src={arrowIcon}/></a>
                                    </li>
                                    <li>
                                        <a href="#"><img src={etsIcon} /> APP SETTINGS <img src={arrowIcon} /></a>
                                    </li>
                                    <li>
                                        <a href="#" onClick={onSingOut}><img src={signOutIcon} /> SIGN OUT</a>
                                    </li>
                                </ul>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingPopup