import React from 'react'
import { isEmpty } from "lodash"
import { useSelector } from 'react-redux'
import Table from './const/Table'
import { Spin } from 'antd'

const SelectGroupPopup = () => {
    
    const {isGroupLoading, objGroupDetail} = useSelector(state => state.Group)

    const columns1 = [
        {
            title: 'GROUP ID',
            dataIndex: 'group_id',
            key: 'group_id',
        },
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'STATUS ',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'LANGUAGE',
            dataIndex: 'language',
            key: 'language',
        }
        ,
        {
            title: 'REGION',
            dataIndex: 'region',
            key: 'region',
        },
        {
            title: 'SITES',
            dataIndex: 'sites',
            key: 'sites',
        }
    ]

    let dataSource1

    if (isEmpty(objGroupDetail)) {
        dataSource1 = []
    } else {
        dataSource1 = [        
            {
                key : 0,
                group_id: objGroupDetail.id,
                name: objGroupDetail.name,
                status: objGroupDetail.status,
                language: objGroupDetail.language,
                region: objGroupDetail.regions.toString(),
                SITES: objGroupDetail.sites.toString()
            }
        ]
    }       

    return (
        <div className="modal fade selectzone-popup grDetailPopup" id="grDetailPopup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title uppercase" id="exampleModalLabel">v2/public/group</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Spin spinning = {isGroupLoading}>
                            <div className="main">
                                    <Table
                                        columns = {columns1}
                                        dataSource = {dataSource1}/>
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

export default SelectGroupPopup
