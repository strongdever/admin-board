import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getGroupList } from '../reducers/group/reducer'
import { createNewMachine } from '../reducers/machine/reducer'
import { Spin } from 'antd'

const CreateMachine = () =>  {

    const dispatch = useDispatch()
    const [groupId, setGroupId] = useState(0)
    const { isGroupLoading, arrGroupList } = useSelector(state => state.Group)
    const { isMachineLoading } = useSelector(state => state.Machine)

    useEffect(() => {
        dispatch(getGroupList())
    }, [dispatch])

    const createGroup = (e) => {
        e.preventDefault()
        dispatch(createNewMachine(parseInt(groupId)))
    }

    let creationInfo = JSON.parse(localStorage.getItem('Machine Creating Status'))

    if (creationInfo !== null) {
        if (creationInfo.creation_statue === 1) return <Navigate to="/createmachine/profilecreation"/>
        if (creationInfo.creation_statue === 2) return <Navigate to="/createmachine/locationsetting"/>
    }    

    return (
        <div className="container-fluid create-machine">
            <div className="row">
                <div className="col-sm-12 main">
                    <form>
                        <h2>CREATE NEW MACHINE</h2>
                        <p>Do you want to create a new machine?</p>

                        <label>SELECT GROUP</label>
                        <Spin spinning = {isGroupLoading || isMachineLoading}>
                            <select defaultValue={0} onChange={(e)=> setGroupId(e.target.value)}>
                                <option value={0}>Select Group</option>
                                {
                                    arrGroupList.map((info, i) => (
                                        <option value={info.id} key = {i}>{info.id} - {info.name}</option>
                                    ))
                                }
                            </select>
                            <button type="submit" onClick={(e) => createGroup(e)}>CREATE</button>
                        </Spin>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateMachine