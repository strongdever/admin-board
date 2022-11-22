import React, { useState, useEffect } from 'react'
import { isEmpty } from "lodash"
import { useDispatch, useSelector } from 'react-redux'
import { updateMachineLocationById } from '../../reducers/machine/reducer'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import Table from './const/Table'
import { Spin } from 'antd'

const LocatioinDetailPopup = (props) => {

    const [region, setRegion] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [zone, setZone] = useState('')
    const dispatch = useDispatch()
    const {isMachineLoading, objMCLocation} = useSelector(state => state.Machine)
    const {objZoneDetail} = useSelector(state => state.Zone)
    let dataSource2

    useEffect(() => {
        if (!isEmpty(objMCLocation)) {
            objMCLocation.region === null ? setRegion('') : setRegion(objMCLocation.region)
            objMCLocation.latitude === null ? setLatitude('') : setLatitude(objMCLocation.latitude)
            objMCLocation.longitude === null ? setLongitude('') : setLongitude(objMCLocation.longitude)
            objMCLocation.zone === null ? setZone('') : setZone(objMCLocation.zone)
        }
        if (!isEmpty(objZoneDetail)) {
            objZoneDetail.name === null ? setZone('') : setZone(objZoneDetail.name)
        }
    }, [objMCLocation, objZoneDetail])

    if (isEmpty(objMCLocation)) {
        dataSource2 = []
    } else {
        dataSource2 = [
            {
                key : '1',
                id : 'REGION',
                id_value : <input type="text" value={region} onChange={e => setRegion(e.target.value)} placeholder="ENTER REGION HERE..." />
            },
            {
                key : '2',
                id : 'SITE',
                id_value : objMCLocation.site
            },
            {
                key : '3',
                id : 'AREAE',
                id_value : objMCLocation.area
            },
            {
                key : '4',
                id : 'ZONE',
                id_value : <div><span>{zone.length === 0 ? "*SELECT FROM ZONE LIST" : zone}</span> <i className='cursor' onClick={props.onPopupSelectZone}>GET ZONE LIST =</i></div>
            },
            {
                key : '5',
                id : 'LATITUDE',
                id_value : <input type="text" value={latitude} onChange={e => setLatitude(e.target.value)} placeholder="*OPTIONAL" />
            },
            {
                key : '6',
                id : 'LONGITUDE',
                id_value : <input type="text" value={longitude} onChange={e => setLongitude(e.target.value)} placeholder="*OPTIONAL" />
            },
            {
                key : '7',
                id : 'TAG',
                id_value : objMCLocation.tags.toString()
            } 
        ]
    }

    const columns2 = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: objMCLocation.id,
            dataIndex: 'id_value',
            key: 'id_value',
        },
    ]

    const putLocation = () => {
        dispatch(updateMachineLocationById(region, latitude, longitude, zone, objMCLocation.id))
    }

    return (
        <div className="modal fade selectzone-popup grDetailPopup locationDetailPopup" id="locationDetailPopup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title uppercase" id="exampleModalLabel">v2/machine/location/id</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Spin spinning={isMachineLoading}>
                            <div className="main">
                                <Table
                                    dataSource={dataSource2}
                                    columns={columns2}/>
                            </div>
                        </Spin>                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">CANCEL</button>
                        <button type="button" className="btn btn-primary" onClick={putLocation}>PUT</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LocatioinDetailPopup
