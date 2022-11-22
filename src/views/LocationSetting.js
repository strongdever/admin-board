import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { isEmpty } from 'lodash'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import Table from '../components/elements/const/Table'
import SelectZonePopup from '../components/elements/SelectZonePopup'
import { initObjZone } from '../reducers/zone/reducer'
import { createMcLocationById } from '../reducers/machine/reducer'
import { Spin } from 'antd'

const LocationSetting = () =>  {

    const dispatch = useDispatch()
    const { objZoneDetail } = useSelector(state => state.Zone)
    const { isMachineLoading } = useSelector(state => state.Machine)
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    useEffect(() => {
        if (!isEmpty(objZoneDetail)) dispatch(initObjZone())
    }, [dispatch])

    const columns1 = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'EDIT BOX',
            dataIndex: 'edit_box',
            key: 'edit_box',
        },
    ]

    const columns2 = [
        {
            title: 'ZONE ID',
            dataIndex: 'zone_id',
            key: 'zone_id',
        },
        {
            title: 'ZONE NAME',
            dataIndex: 'zone_name',
            key: 'zone_name',
        },
    ]

    let dataSource1
    let dataSource2
    if (isEmpty(objZoneDetail)) {
        dataSource1 = [
            {
                key: "1",
                name: "REGION",
                edit_box: ''
            },
            {
                key: "2",
                name: "SITE",
                edit_box: ''
            },
            {
                key: "3",
                name: "AREA",
                edit_box: ''
            },
            {
                key: "4",
                name: "ZONE",
                edit_box: ''
            },
            {
                key: "5",
                name: "LATITUDE",
                edit_box: ''
            },
            {
                key: "6",
                name: "LONGITUDE",
                edit_box: ''
            },
            {
                key: "7",
                name: "TAG",
                edit_box: ""
            }
        ]
        dataSource2 = []
    } else {
        dataSource1 = [
            {
                key: "1",
                name: "REGION",
                edit_box: objZoneDetail.region
            },
            {
                key: "2",
                name: "SITE",
                edit_box: objZoneDetail.site
            },
            {
                key: "3",
                name: "AREA",
                edit_box: objZoneDetail.area
            },
            {
                key: "4",
                name: "ZONE",
                edit_box: objZoneDetail.name
            },
            {
                key: "5",
                name: "LATITUDE",
                edit_box: <input type="text" value={latitude} placeholder="*OPTIONAL" onChange={(e) => setLatitude(e.target.value)}/>
            },
            {
                key: "6",
                name: "LONGITUDE",
                edit_box: <input type="text" value={longitude} placeholder="*OPTIONAL" onChange={(e) => setLongitude(e.target.value)}/>
            },
            {
                key: "7",
                name: "TAG",
                edit_box: objZoneDetail.locationTags.toString()
            }
        ]
        dataSource2 = [
            {
                key: '1',
                zone_id: objZoneDetail.id,
                zone_name: objZoneDetail.name
            }
        ]
    }

    const getZone = () => {
        let myModal = new bootstrap.Modal(document.getElementById("selectZone"))
        myModal.show()
    }

    const createMcLocationnById = () => {
       let data =  {
            "region": objZoneDetail.region,
            "site": objZoneDetail.site,
            "area": objZoneDetail.area,
            "zone": objZoneDetail.name,
            "latitude": Number(latitude),
            "longitude":  Number(longitude),
            "tags": objZoneDetail.locationTags
        }
        dispatch(createMcLocationById(data))
    }

    let creationInfo = JSON.parse(localStorage.getItem('Machine Creating Status'))
    if (creationInfo === null) {
        return <Navigate to="/createmachine"/>
    }

    return (
        <div className="container-fluid profile-page zones gr-view location-view">
            <SelectZonePopup />
            <Spin spinning={isMachineLoading}>
                <div className="row">
                    <div className="col-sm-5 right-separate">
                        {
                            isEmpty(objZoneDetail) 
                                ?
                                <div>
                                    <h3>SELECT ZONE</h3>
                                    <div className="main shadows mb-3">
                                        <h4 className="cursor" onClick={getZone}>GET ZONE LIST</h4>
                                    </div>
                                </div>
                                : 
                                <div className="selected-files">
                                    <h3>SELECTED SITE</h3>
                                    <Table
                                        columns={columns2}
                                        dataSource={dataSource2}/>
                                    <button onClick={getZone}>SELECT ANOTHER ZONE</button>
                                </div>
                        }                   
                        
                    </div>
                    <div className="col-sm-7 border-left">
                        <div className="main shadows">
                            <h3>MACHINE ID</h3>
                            <div className="modelthreed">
                                <div className="main shadows">
                                    <Table
                                        dataSource={dataSource1}
                                        columns={columns1}/>
                                    <div className="btns">
                                        {/* <button>CANCEL</button> */}
                                        <button onClick={createMcLocationnById}>PUT</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        </div>
    )
}

export default LocationSetting