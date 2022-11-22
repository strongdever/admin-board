import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Map from '../components/elements/const/Map'
import Table from '../components/elements/const/Table'
import { getZonetList } from '../reducers/zone/reducer'
import { getGroupList } from '../reducers/group/reducer'
import { Spin } from 'antd'

const GroupView = () => {

    const dispatch = useDispatch()
    const {isZoneLoading, arrZoneList} = useSelector(state => state.Zone)
    const {arrGroupList} = useSelector(state => state.Group)
    
    useEffect(() => {
        dispatch(getZonetList())
        dispatch(getGroupList())
    }, [])

    const getGroupName = (ids) => {
        let arrName = []
        ids.map((id) => {
            arrGroupList.map((info)=>{
               if (info.id === id) {
                arrName.push(info.name)
               } 
            })
        })
        return arrName
    }

    const filterGroupByID = (e, zoneId) => {
        console.log(zoneId)
    }

    const dataSource1 = arrZoneList.map((info, i) => (
        {
            key: i,
            region: info.region,
            site: info.site,
            area: info.area,
            zone: info.name,
            group_id: info.groupIds.toString(),
            group_name: getGroupName(info.groupIds).toString()
        }
    ))

    const columns1 = [
        {
          title: 'REGION',
          dataIndex: 'region',
          key: 'region',
        },
        {
          title: 'SITE',
          dataIndex: 'site',
          key: 'site',
        },
        {
          title: 'AREA',
          dataIndex: 'area',
          key: 'area',
        },
        {
            title: 'ZONE',
            dataIndex: 'zone',
            key: 'zone',
        },
        {
            title: 'ASSIGNED GROUP ID(s)',
            dataIndex: 'group_id',
            key: 'group_id',
        },
        {
            title: 'ASSIGNED GROUP NAME(s)',
            dataIndex: 'group_name',
            key: 'group_name',
        },
    ]

    const dataSource2 = [
        {
            key: '1',
            region: 'JPN',
            site: 'KIX',
        },
    ]

    const columns2 = [
        {
            title: 'REGION',
            dataIndex: 'region',
            key: 'region',
        },
        {
            title: 'SITE NAME',
            dataIndex: 'site',
            key: 'site',
        },
    ]

    const locations = [
        {
          name: "Osaka",
          location: { 
            lat: 34.6937,
            lng: 135.5023 
          },
        },
        {
          name: "Tokyo",
          location: { 
            lat: 35.6762,
            lng: 139.6503
          },
        },
    ]

    
    return (
        <div className="container-fluid profile-page zones gr-view">
            <div className="row">
                <div className="col-sm-5 right-separate">
                    <h3>FILTER BY SITE</h3>
                    {/* <div className="main shadows">
                        <h4>NO SITE SELECTED</h4>
                    </div> */}
                    <div className="selected-files">
                        <h3>SELECTED SITE</h3>
                        <Table
                            columns={columns2}
                            dataSource={dataSource2}/>
                        <button>CLEAR SELECTION</button>
                    </div>
                </div>
                <div className="col-sm-7 border-left">
                    <div className="main shadows">
                        <h3>GROUP VIEW</h3>

                        <div className="modelthreed">
                            <div className="maps">
                                <Map
                                    locations={locations}
                                    onClickMark={filterGroupByID} />
                            </div>

                            <div className="scroll-text">
                                <span>SELECT A SITE TO SHOW DETAILS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12">
                    <div className="main shadows">
                        <Spin spinning={isZoneLoading}>
                            <Table
                                columns={columns1}
                                dataSource={dataSource1}/>
                        </Spin>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupView
