import React from 'react'
import { isEmpty } from "lodash"
import { useSelector } from 'react-redux'
import { Spin } from 'antd'

const HealthCodePopup = () => {

    const {isMachineLoading, objMcHealth} = useSelector(state => state.Machine)

    let obj

    if (isEmpty(objMcHealth)) {
        obj = {
            'healthCode': '',
            'lastGetDate': ''
        }
    } else {
        obj = {
            'healthCode': objMcHealth.healthCode,
            'lastGetDate': objMcHealth.eventDate
        }
    } 

    return (
        <div className="modal fade selectzone-popup healthCdePopup" id="healthCdePopup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title uppercase" id="exampleModalLabel">v2/machine/id/MACHINE HEALTH CODE</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Spin spinning={isMachineLoading}>
                            <div className="main">
                                <p>HEALTH CODE</p>
                                <span>{obj.healthCode}</span>
                                <p>LAST GET DATE</p>
                                <span>{obj.lastGetDate}</span>
                            </div>
                        </Spin>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">GET</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HealthCodePopup
