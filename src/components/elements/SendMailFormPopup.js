import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'
import { sendEmailforResetPw, initialIsSendEmail } from '../../reducers/auth/reducer'
import loginIcon from '../../assets/images/login.png'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

const SendEmailForm = () => {

    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const { isSendEmail, isSendEmailLoading } = useSelector(state => state.Auth)

    useEffect(() => {
        if (isSendEmail) {
            let myModalEl = document.getElementById('sendmailform')
            bootstrap.Modal.getInstance(myModalEl).hide()
            dispatch(initialIsSendEmail())
            setEmail('')
        }
      }, [isSendEmail, dispatch])

    const resetPwForSendEmail = () => {

        dispatch(sendEmailforResetPw(email))
    }

    return (
        <div className="modal fade selectzone-popup" id="sendmailform" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <Spin spinning = {isSendEmailLoading}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Reset Password</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body form" style={{display: 'contents'}}>
                            <div className="icons">
                                <label className="full-width">EMAIL ADDRESS</label>
                                <i><img src={loginIcon} alt="login"/></i>
                                <input
                                    type="email"
                                    placeholder="ENTER EMAIL..."
                                    value={email}
                                    required
                                    onChange={(e)=> setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">CANCEL</button>
                            <button type="submit" className="btn btn-primary" onClick={resetPwForSendEmail}>OKAY</button>
                        </div>
                    </Spin>
                    
                </div>
            </div>
        </div>
    )
}

export default SendEmailForm
