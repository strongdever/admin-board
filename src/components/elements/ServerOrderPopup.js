import React, { useEffect, useState } from 'react'
import { isEmpty } from "lodash"
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'
import { upDateSvOrderCode } from '../../reducers/machine/reducer'

const ServerOrderPopup = () => {

    const dispatch = useDispatch()
    const [code, setCode] = useState('')
    const [activeAt, setActiveAt] = useState('')
    const {isMachineLoading, objMachineDetail} = useSelector(state => state.Machine)

    useEffect(() => {
        if (!isEmpty(objMachineDetail)) {
            objMachineDetail.serverOrderCode === null ? setCode('') : setCode(objMachineDetail.serverOrderCode) 
            objMachineDetail.serverOrderActiveDate === null ? setActiveAt('') : setActiveAt(objMachineDetail.serverOrderActiveDate.slice(0, 16))
        }
    }, [objMachineDetail])

    const updateServerCode = () => {
        dispatch(upDateSvOrderCode(objMachineDetail.id, objMachineDetail.groupId, code, activeAt))
    }

    return (
        <div className="modal fade selectzone-popup serverspopup" id="serverOrderPopup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title uppercase" id="exampleModalLabel">v2/machine/id</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Spin spinning = {isMachineLoading}>
                            <div className="main">
                                <p>
                                    <label>SERVER CODE</label>
                                    <input type="text" value={code} placeholder="E001" onChange={(e) => setCode(e.target.value)}/>
                                </p>
                                <p>
                                    <label>SERVER ORDER ACTIVE DATE</label>
                                    <input type="datetime-local" value={activeAt} placeholder="2012-12-30" onChange={(e) => setActiveAt(e.target.value)}/>
                                </p>
                            </div>
                        </Spin>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">CANCEL</button>
                        <button type="button" className="btn btn-primary" onClick={updateServerCode}>POST</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServerOrderPopup
