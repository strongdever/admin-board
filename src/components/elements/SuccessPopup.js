import React from 'react'
import { isEmpty } from "lodash"
import { useSelector } from 'react-redux'
import { Spin } from 'antd'

const SuccessPopup = () => {

    // const {isMachineLoading, objMcHealth} = useSelector(state => state.Machine)

    let obj

    if (isEmpty(objMcHealth)) {
        obj = {
            'status': '',
            'main': '',
            'sub':'',
            'createdAt': ''
        }
    } else {
        obj = {
            'status': 'Success:200',
            'main': objMcHealth.triggerMain,
            'sub': objMcHealth.triggerSub,
            'createdAt': objMcHealth.createdAt
        }
    } 

    return (
        <div className="modal fade selectzone-popup healthCdePopup" id="successPopup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title uppercase" id="exampleModalLabel">SUCCESS</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Spin spinning={isMachineLoading}>
                            <div className="main">
                                <p>STATUS</p>
                                <span>{obj.status }</span>
                                <p>TRIGGER MAIN</p>
                                <span>{obj.main}</span>

                                <p>TRIGGER SUB</p>
                                <span>{obj.sub}</span>

                                <p>UPDATED AT</p>
                                <span>{obj.createdAt}</span>
                            </div>
                        </Spin>                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">OKAY</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessPopup
