import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGroupList, storeGroupIds, initialGroupIds } from '../../reducers/group/reducer'
import Table from './const/Table'
import { Spin } from 'antd'
import searchIcon from '../../assets/images/search.png'

const SelectGroupListPopup = () => {

    const dispatch = useDispatch()
    const { isGroupLoading, arrGroupList } = useSelector(state => state.Group)

    useEffect(() => {
        dispatch(initialGroupIds())
        dispatch(getGroupList())
    }, [dispatch])

    const getGrouId = (e) => {
        let id = e.target.value        
        dispatch(storeGroupIds(id))
    }

    const colums1 = [
        {
            title: 'GROUP ID',
            dataIndex: 'group_id',
            key: 'group_id',
        },
        {
            title: 'GROUP NAME',
            dataIndex: 'group_name',
            key: 'group_name',
        },
    ]

    const dataSource1 = arrGroupList.map((info, i) => (
        {
            key: i,
            group_id: <div><input type="checkbox" name="zoneID" value={info.id} onChange={getGrouId} /><span>{info.id}</span></div>,
            group_name: info.name
        }
    ))
    
    return (
        <div className="modal fade selectzone-popup" id="selectGroupPopup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">SELECT GROUP</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Spin spinning={isGroupLoading}>
                            <div className="col-sm-12 search">
                                <input type="text" placeholder="Search zone names..." />
                                <button><img src={searchIcon} /></button>
                            </div>
                            <Table
                                columns={colums1}
                                dataSource={dataSource1}/>
                        </Spin>                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">CANCEL</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">OKAY</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectGroupListPopup