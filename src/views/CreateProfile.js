import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Spin } from 'antd'
import { 
    getMachineTypeList,
    createMcProfileById } from '../reducers/machine/reducer'
//images start
import uploadIcon from '../assets/images/upload.png'
import deleteIcon from '../assets/images/delete.png'
//images end

const InCreaOrReduInput = (props) => (
    <div className="container">
        <div className="button-container">
            <button
                className="cart-qty-plus"
                type="button"
                value={'+'} 
                onClick={()=>props.setScoreState(props.score + 1)}>+</button>
            <input
                className="qty"
                type="text"
                name="qty input-text qty"
                value={props.score} 
                maxLength="12"
                onChange={(e) => props.setScoreState(e.target.value)}/>
            <button 
                className="cart-qty-minus"
                type="button" 
                value={'-'}
                onClick={()=>{ if(props.score > 0) props.setScoreState(props.score - 1)}}>-</button>
        </div>
    </div>
)

const CheckboxInput = (props) => (
    <div>
        <span className="view">
            <input 
                type="text" 
                className="first" 
                placeholder="0" 
                value={props.score} 
                onChange={(e) => props.setValueState(e.target.value)} 
                disabled={props.checkState ? false : true}/>
        </span>
        <label 
            className={`switch ${props.checkState ? "active" : ""}`} 
            onClick={() => props.checkState ? props.setCheckState(false) : props.setCheckState(true)}>
            <i>ON</i>
            <i>OFF</i>
            <span className="slider round"></span>
            <i className="texts">{props.scoreName}</i>
        </label>
    </div>    
)

const CreateProfile = () => {

    const dispatch = useDispatch()
    const {isMachineLoading, arrMachineType} = useSelector(state => state.Machine)
    const [checkFbx, setCheckFbx] = useState(0)
    const [ativeCheckH, setAtiveCheckH] = useState(false)
    const [ativeCheckE, setAtiveCheckE] = useState(false)
    const [ativeCheckC, setAtiveCheckC] = useState(false)
    const [ativeCheckA, setAtiveCheckA] = useState(false)
    const [isVieMoreOption, setIsVieMoreOption] = useState(false)

    const [machineName, setMachineName] = useState('')
    const [machinType, setMachineType] = useState('none')
    const [activeSince, setActiveSince] = useState('')
    const [priorityScore, setPriorityScore] = useState(0)
    const [minPeopleNum, setMinPeopleNum] = useState(0)
    const [maxPeopleNum, setMaxPeopleNum] = useState(0)
    const [requiredScoreH, setRequiredScoreH] = useState(0)
    const [requiredScoreE, setRequiredScoreE] = useState(0)
    const [requiredScoreC, setRequiredScoreC] = useState(0)
    const [requiredScoreA, setRequiredScoreA] = useState(0)
    const [genderEquality, setGenderEquality] = useState('STRICT')
    const [moreOption, setMoreOption] = useState('EITHER')

    const arrFbxOrSvgItemList = [
        {FbxName: '3D MODEL 1.FBX', SvgName: '3D MODEL 1.SVG'},
        {FbxName: '3D MODEL 2.FBX', SvgName: '3D MODEL 1.SVG'},
        {FbxName: '3D MODEL 3.FBX', SvgName: '3D MODEL 1.SVG'},
        {FbxName: '3D MODEL 4.FBX', SvgName: '3D MODEL 1.SVG'},
    ]

    const arrGenderEquality = [
        {name: 'STRICT'},
        {name: 'MODERATE'},
        {name: 'SEPARATE'},
        {name: 'OFF'}
    ]

    const arrMoreOption = [
        {name: 'EITHER'},
        {name: 'MALE ONLY'},
        {name: 'FEMALE ONLY'},
    ]

    useEffect(() => {        
        dispatch(getMachineTypeList())
    }, [dispatch])

    const createMachineProfile = () => {
        let data = {
            "name": machineName,
            "type": machinType,
            "priorityScore": priorityScore,
            "activeSince": activeSince,
            "minPeople": minPeopleNum,
            "maxPeople": maxPeopleNum,
            "requiredScoreH": requiredScoreH,
            "requiredScoreE": requiredScoreE,
            "requiredScoreC": requiredScoreC,
            "requiredScoreA": requiredScoreA,
            "genderEquality": genderEquality,
            "genderOptions": moreOption,
        }
        dispatch(createMcProfileById(data))
    }

    let creationInfo = localStorage.getItem('Machine Creating Status')

    if (creationInfo !== null) {
        if (JSON.parse(creationInfo).creation_statue === 2) return <Navigate to="/createmachine/locationsetting"/>
    } else {
        return <Navigate to="/createmachine"/>
    }

    return (
        <div className="container-fluid profile-page">
            <Spin spinning = {isMachineLoading}>
                <div className="row">
                    <div className="col-sm-5 right-separate">
                        <h3>SELECT FBX OR SVG</h3>
                        <div className="main shadows">
                            <label className="profile-select">
                                <input type="text" className="value" placeholder="UPLOAD FROM STORAGE" /> 
                                <input type="file" id="select-files"/>
                                <button><img src={uploadIcon} /></button>
                            </label>

                            <div className="select-files-li">
                                <h4>OR SELECT FBX FROM LIST</h4>
                                <ul>
                                    { arrFbxOrSvgItemList.map((info, i)=>(
                                        <li className={`${ i === checkFbx ? "active" : ""}`} key={i}>
                                            <label>
                                                <input 
                                                    type="radio"
                                                    name="fbx"
                                                    value={i}
                                                    onChange={(e) => setCheckFbx(parseInt(e.target.value))} 
                                                    checked={ i === checkFbx ? true : false}/>
                                                <span>{info.FbxName}</span>
                                            </label>
                                            <span className="delete"><img src={deleteIcon} /></span>
                                        </li>
                                    ))}
                                </ul>

                                <h4>OR SELECT SVG FROM LIST</h4>
                                <ul>
                                    {arrFbxOrSvgItemList.map((info, i)=>(
                                        <li className={`${ i === checkFbx ? "active" : ""}`} key={i}>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="svg"
                                                    value={i}
                                                    onChange={(e) => setCheckFbx(parseInt(e.target.value))} 
                                                    checked={ i === checkFbx ? true : false}/>
                                                <span>{info.SvgName}</span>
                                            </label>
                                            <span className="delete"><img src={deleteIcon} /></span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button type="submit" className="btn-secondary">Select</button>
                        </div>
                    </div>
                    <div className="col-sm-7 border-left">
                        <div className="main shadows">
                            <h3>MACHINE ID</h3>

                            <form>
                                <div className="fm full-width mb-4">
                                    <label>MACHINE NAME</label>
                                    <input type="text" placeholder="MACHINE A" className="form-control full-width" value={machineName} onChange={(e)=>setMachineName(e.target.value)}/>
                                </div>
                                <div className="fm">
                                    <div className="row mb-4">
                                        <div className="col-sm-9">
                                            <label>MACHINE TYPE</label>
                                            <select className="form-control full-width" value = {machinType} onChange={(e)=>setMachineType(e.target.value)}>
                                                <option value={'none'}>Select a machine type</option>
                                                {
                                                    arrMachineType.map((info, i)=>(
                                                        <option key={i+1} value={info.name}>{info.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="col-sm-3 inc">
                                            <label>PRIORITY SCORE</label>
                                            <InCreaOrReduInput
                                                score={priorityScore}
                                                setScoreState={setPriorityScore}/>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-sm-12 calebdar flex">
                                            <label className="full-width">ACTIVE SINCE</label>
                                            <input type="datetime-local" value={activeSince} onChange={(e) => setActiveSince(e.target.value)}/>
                                        </div>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-sm-3 inc">
                                            <label className="mb-2">MINIMUM PEOPLE</label>
                                            <InCreaOrReduInput
                                                score={minPeopleNum}
                                                setScoreState={setMinPeopleNum}/>
                                        </div>                                      
                                        <div className="col-sm-3 inc">
                                            <label className="mb-2">MAXIMUM PEOPLE</label>
                                            <InCreaOrReduInput
                                                score={maxPeopleNum}
                                                setScoreState={setMaxPeopleNum}/>
                                        </div>
                                    </div>

                                    <div className="full-width gender-qu mb-5">
                                        <h4 className="full-width">REQUIRED RONTGEN SCORE</h4>
                                        <CheckboxInput
                                            checkState={ativeCheckE}
                                            score={requiredScoreE}
                                            scoreName={'EASY MODE'}
                                            setValueState={setRequiredScoreE}
                                            setCheckState={setAtiveCheckE}/>
                                        <CheckboxInput
                                            checkState={ativeCheckH}
                                            score={requiredScoreH}
                                            scoreName={'HARD MODE'}
                                            setValueState={setRequiredScoreH}
                                            setCheckState={setAtiveCheckH}/>
                                        <CheckboxInput
                                            checkState={ativeCheckC}
                                            score={requiredScoreC}
                                            scoreName={'CREATE MODE'}
                                            setValueState={setRequiredScoreC}
                                            setCheckState={setAtiveCheckC}/>
                                        <CheckboxInput
                                            checkState={ativeCheckA}
                                            score={requiredScoreA}
                                            scoreName={'A.I. BATTLE MODE'}
                                            setValueState={setRequiredScoreA}
                                            setCheckState={setAtiveCheckA}/> 
                                    </div>

                                    <div className="full-width gender-qu mb-4">
                                        <h4 className="full-width">GENDER EQUALITY</h4>
                                        {
                                            arrGenderEquality.map((info, i)=>(
                                                <label key={i}>
                                                    <input
                                                        type="radio"
                                                        name="strict"
                                                        value={info.name}
                                                        onChange={(e)=>{ 
                                                            setGenderEquality(e.target.value) 
                                                            e.target.value === "SEPARATE" ? setIsVieMoreOption(true) : setIsVieMoreOption(false)
                                                        }}
                                                        checked={info.name === genderEquality ? true : false}/>
                                                    <span>{info.name}</span>
                                                </label>
                                            ))
                                        }
                                    </div>

                                    <div className="full-width gender-qu">
                                        <h4 className="full-width">MORE OPTIONS</h4>
                                        {
                                            isVieMoreOption &&
                                            arrMoreOption.map((info, i)=>(
                                                <label key={i}>
                                                    <input
                                                        type="radio"
                                                        name="either"
                                                        value={info.name}
                                                        onChange={(e)=>setMoreOption(e.target.value)}
                                                        checked={info.name === moreOption ? true : false}/>
                                                    <span>{info.name}</span>
                                                </label>
                                            ))
                                        }
                                    </div>
                                </div>
                            </form>

                            <div className="full-width btns mt-4 text-center">
                                <button className="cancel">CANCEL</button>
                                <button type="submit" className="next" onClick={createMachineProfile}>NEXT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        </div>
    )
}

export default CreateProfile
