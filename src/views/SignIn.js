import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInUser } from '../reducers/auth/reducer'
import SendEmailForm from '../components/elements/SendMailFormPopup'
//images start
import loginIcon from '../assets/images/login.png'
import passwordIcon from '../assets/images/password.png'
import eyeIcon from '../assets/images/eye.png'
import logoIcon from '../assets/images/logo.png'
//images end
import { Spin } from 'antd'

const SignIn = () =>  {

    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { isSignInLoading } = useSelector(state => state.Auth)

    const onSignInEmailAndPw = () => {
        const credentials = {
            email: email,
            password: password,
        }
        dispatch(signInUser(credentials))
    }

    const handleViewPwd = () => {
        let dataShow = document.getElementById('hide').getAttribute('type')
        dataShow === 'text' 
            ? document.getElementById('hide').setAttribute('type', 'password')
            : document.getElementById('hide').setAttribute('type', 'text')
    }

    //when user login, redirect to create machine
    let token = localStorage.getItem('Auth Token')    
    if (token) return <Navigate to="/createmachine"/>

    return (
        <div className="container-fluid sign-in">
            <SendEmailForm/>
            <div className="row" style={{height:'100vh'}}>
                <div className="col-sm-6 img">
                    <img src={logoIcon} alt='logo'/>
                </div>
                <div className="col-sm-6 form">
                    <div className="main">
                        <h2>SIGN IN</h2>
                        <p>Please enter your details to login to the VA admin board</p>
                        <Spin spinning = {isSignInLoading}>
                            <div className="forms-app">
                                <div className="icons">
                                    <label className="full-width">EMAIL ADDRESS</label>
                                    <i><img src={loginIcon} alt="login"/></i>
                                    <input
                                        type="email"
                                        placeholder="ENTER EMAIL..."
                                        onChange={(e) => setEmail(e.target.value)}
                                        required/>
                                </div>
                                <div className="icons">
                                    <label className="full-width">PASSWORD</label>
                                    <i><img src={passwordIcon} alt="password"/></i>
                                    <input
                                        type="password"
                                        placeholder="ENTER PASSWORD..."
                                        onChange={(e) => setPassword(e.target.value)}
                                        required id="hide" />

                                    <i className="show" onClick={handleViewPwd}><img src={eyeIcon} alt="eye"/></i>
                                </div>
                                <p className="forgot-passowrd">
                                    <Link type='button' data-bs-toggle="modal" data-bs-target="#sendmailform">FORGOT PASSWORD?</Link>
                                </p>
                                <button type="button" onClick={onSignInEmailAndPw}>SIGN IN</button>
                            </div>
                        </Spin>                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn