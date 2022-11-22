import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from "lodash"
import Table from '../components/elements/const/Table'
import {Spin} from 'antd'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import SelectZonePopup from '../components/elements/SelectZonePopup'
import SelectGroupListPopup from '../components/elements/SelectGroupListPopup'
import { updateZoneDetailById } from '../reducers/zone/reducer'
//images start
import searchIcon from '../assets/images/search.png'
import uploadIcon from '../assets/images/upload.png'
//images end
//fbx load part start
import { Canvas } from "@react-three/fiber"
import { useLoader } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import { Suspense } from "react"
import { Rnd } from 'react-rnd'
//fbx end

const Scene = (props) => {
    const fbx = useLoader(FBXLoader, "fbxUpload/"+props.fbxName)
  
    return <primitive object={fbx} position={[1.5, 1.5, -2]}  scale={0.5} />;
}

const UpdateZone = () =>  {

    const dispatch = useDispatch()
    const [fbxName, setFbxName] = useState('') 
    const {isZoneLoading, objZoneDetail} = useSelector(state => state.Zone)
    const {arrSelectedGroupId} = useSelector(state => state.Group)
    const [pX, setPX] = useState(0)
    const [pY, setPY] = useState(0)
    const [pC, setPC] = useState(0)
    const [pD, setPD] = useState(0)
    const [XX, setXX] = useState(0)
    const [YY, setYY] = useState(0)
    const [CC, setCC] = useState(0)
    const [DD, setDD] = useState(0)

    useEffect(() => {
        if (!isEmpty(objZoneDetail)) {
            setFbxName(objZoneDetail.fbxName)
            setXX(objZoneDetail.corners.gpsA.longitude)
            setYY(objZoneDetail.corners.gpsA.latitude)
            setCC(objZoneDetail.corners.gpsB.longitude)
            setDD(objZoneDetail.corners.gpsC.latitude)
            setPX(calCoordinateX(objZoneDetail.corners.gpsA.longitude))
            setPY(calCoordinateY(objZoneDetail.corners.gpsA.latitude))
            setPC(calCoordinateX(objZoneDetail.corners.gpsB.longitude))
            setPD(calCoordinateY(objZoneDetail.corners.gpsC.latitude))
        }
    }, [objZoneDetail])

    const showSelectZoneModal = () => {
        let myModal = new bootstrap.Modal(document.getElementById("selectZone"))
        myModal.show()
    }

    const uploadFbx = (e) => {
        let modelName = e.target.files[0].name
        setFbxName(modelName)
    }

    const popUpSelectGroup = () => {
        let myModal = new bootstrap.Modal(document.getElementById("selectGroupPopup"))
        myModal.show()
    }

    const onResize = (e, d, ref, dir, position) => {
        setPX(position.x)
        setPY(position.y)
        setPC(pX + ref.offsetWidth)
        setPD(pY + ref.offsetHeight)
        setXX(calLongitude(position.x))
        setYY(calLatitude(position.y))
        setCC(calLongitude(pX + ref.offsetWidth))
        setDD(calLatitude(pY + ref.offsetHeight))
    }

    const latTop = 41.56
    const latBottom = 31
    const lonLeft = 129.43
    const lonRight = 142.07
    const regWidth = 847
    const regHeight = 418

    const calLongitude = (val) => {
        return (lonLeft + val * (lonRight - lonLeft)/regWidth).toFixed(4)
    }

    const calLatitude = (val) => {
        return (latTop - val * (latTop - latBottom)/regHeight).toFixed(4)
    }

    const calCoordinateX = (val) => {
        return (regWidth / (lonRight - lonLeft) * (val - lonLeft)).toFixed(4)
    }

    const calCoordinateY = (val) => {
        return (regHeight / (latTop - latBottom) * (latTop - val)).toFixed(4)
    }

    const updateZoneById = () => {
        let data = {
            "name": objZoneDetail.name,
            "fbxName": fbxName,
            "region": objZoneDetail.region,
            "site": objZoneDetail.site,
            "area": objZoneDetail.area,
            "groupIds": arrSelectedGroupId,
            "locationTags": objZoneDetail.locationTags,
            "corners": {
                "gpsA": {
                  "latitude": Number(calLatitude(pY)),
                  "longitude": Number(calLongitude(pX))
                },
                "gpsB": {
                  "latitude": Number(calLatitude(pY)),
                  "longitude": Number(calLongitude(pC))
                },
                "gpsC": {
                  "latitude": Number(calLatitude(pD)),
                  "longitude": Number(calLongitude(pX))
                },
                "gpsD": {
                  "latitude": Number(calLatitude(pD)),
                  "longitude": Number(calLongitude(pC))
                }
            }
        }

        dispatch((updateZoneDetailById(objZoneDetail.id, data)))
    }

    let dataSource
    if (isEmpty(objZoneDetail)) {
        dataSource = []
    } else {
        dataSource = [
            {
                key: '1',
                zone_id: objZoneDetail.id,
                zone_name: objZoneDetail.name,
                fbx: <i className="replace"><input type="file" id="select-files" onChange = {(e) => uploadFbx(e)}/><img src={uploadIcon} />CLICK TO <br/>REPLACE</i>,
                region: objZoneDetail.region,
                site: objZoneDetail.site,
                area: objZoneDetail.area,
                group: <span className="cursor" onClick={popUpSelectGroup}>= <br/>SELECT</span>,
                a_la: <input className='corner' type="text" value={YY} placeholder="OPTIONAL..." onChange={(e)=>{setYY(e.target.value); setPY(calCoordinateY(e.target.value));}} />,
                a_lo: <input className='corner' type="text" value={XX} placeholder="OPTIONAL..." onChange={(e)=>{setXX(e.target.value); setPX(calCoordinateX(e.target.value));}}  />,
                b_la: <input className='corner' type="text" value={YY} placeholder="OPTIONAL..." onChange={(e) => {setYY(e.target.value); setPY(calCoordinateY(e.target.value));}} />,
                b_lo: <input className='corner' type="text" value={CC} placeholder="OPTIONAL..." onChange={(e)=>{setCC(e.target.value); setPC(calCoordinateX(e.target.value));}}/>,
                c_la: <input className='corner' type="text" value={DD} placeholder="OPTIONAL..." onChange={(e)=>{setDD(e.target.value); setPD(calCoordinateY(e.target.value));}}/>,
                c_lo: <input className='corner' type="text" value={XX} placeholder="OPTIONAL..." onChange={(e)=>{setXX(e.target.value); setPX(calCoordinateX(e.target.value));}}/>,
                d_la: <input className='corner' type="text" value={DD} placeholder="OPTIONAL..." onChange={(e) => {setCC(e.target.value); setPC(calCoordinateX(e.target.value));}} />,
                d_lo: <input className='corner' type="text" value={CC} placeholder="OPTIONAL..." onChange={(e)=>{setDD(e.target.value); setPD(calCoordinateY(e.target.value));}} />,
            }
        ]
    }
      
    const columns = [
        {
          title: <div>ID <span>ZONE ID</span></div>,
          dataIndex: 'zone_id',
          key: 'zone_id',
        },
        {
            title: <div>ZONE <span>NAME</span></div>,
            dataIndex: 'zone_name',
            key: 'zone_name',
        },
        {
            title: 'FBX',
            dataIndex: 'fbx',
            key: 'fbx',
        },
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
            title: 'GROUP',
            dataIndex: 'group',
            key: 'group',
        },
        {
            title: <div>CORNER <span>-A-GPS-LA</span></div>,
            dataIndex: 'a_la',
            key: 'a_la',
        },
        {
            title: <div>CORNER <span>-A-GPS-LO</span></div>,
            dataIndex: 'a_lo',
            key: 'a_lo',
        },
        {
            title: <div>CORNER <span>-B-GPS-LA</span></div>,
            dataIndex: 'b_la',
            key: 'b_la',
        },
        {
            title: <div>CORNER <span>-B-GPS-LO</span></div>,
            dataIndex: 'b_lo',
            key: 'b_lo',
        },
        {
            title: <div>CORNER <span>-C-GPS-LA</span></div>,
            dataIndex: 'c_la',
            key: 'c_la',
        },
        {
            title: <div>CORNER <span>-C-GPS-LO</span></div>,
            dataIndex: 'c_lo',
            key: 'c_lo',
        },
        {
            title: <div>CORNER <span>-D-GPS-LA</span></div>,
            dataIndex: 'd_la',
            key: 'd_la',
        },
        {
            title: <div>CORNER <span>-D-GPS-LO</span></div>,
            dataIndex: 'd_lo',
            key: 'd_lo',
        },
    ];

    return (
        <div className="container-fluid profile-page zones machine-list update-zone">
            <SelectGroupListPopup/>
            <SelectZonePopup/>
            <Spin spinning = {isZoneLoading}>
                <div className="row">
                    <div className="col-sm-4 search">
                        <input type="text" placeholder="Search site names..." />
                        <button><img src={searchIcon} /></button>
                    </div>
                    <div className="col-sm-4 search">
                        <input type="text" placeholder="Search machine names..." />
                        <button><img src={searchIcon} /></button>
                    </div>
                    <div className="col-sm-4 btnss">
                        <button onClick={showSelectZoneModal}>GET ZONE LIST</button>
                    </div>
                </div>

                <div className="data-list">
                    <Table
                        dataSource={dataSource}
                        columns={columns}/>
                </div>

                <div className="mains">
                    <div className="row">
                        <div className="col-sm-5 border-left">
                            <div className="main shadows">
                                <h3>FBX VIEWER</h3>

                                <div className="modelthreed">
                                    <div className="full-width">
                                        <span>3D_MODEL.FBX</span>
                                        <span className="clear">CLEAR VIEWER</span>
                                    </div>
                                    <div className="fbx-model-container">
                                        {
                                            fbxName.length !== 0 &&
                                            <Canvas>
                                                <ambientLight intensity={0.2} />
                                                <Suspense fallback={null}>
                                                    <Scene 
                                                        fbxName = {fbxName}/>
                                                    <OrbitControls />
                                                </Suspense>
                                            </Canvas>
                                        }
                                    </div>
                                    <div className="scroll-text">
                                        <span>SCROLL TO ZOOM. CLICK AND DRAG TO ROTATE.</span>
                                        <span className="btns">CENTER</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-7 border-left">
                            <div className="main shadows">
                                <h3>CORNER VIEWER (a,b,c,d)</h3>

                                <div className="corner">
                                    <div className="text">
                                        <ul>
                                            <li>
                                                <span>CORNER-A-GPS-LA</span>
                                                <h4 id="ca-la">{YY}</h4>
                                            </li>
                                            <li>
                                                <span>CORNER-A-GPS-LO</span>
                                                <h4 id="ca-lo">{XX}</h4>
                                            </li>
                                        </ul>
                                        <ul>
                                            <li>
                                                <span>CORNER-B-GPS-LA</span>
                                                <h4 id="cb-la">{YY}</h4>
                                            </li>
                                            <li>
                                                <span>CORNER-B-GPS-LO</span>
                                                <h4 id="cb-lo">{CC}</h4>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="mydarg-section" id="demoRoot">
                                        <Rnd
                                            className="resize-drag"
                                            disableDragging = {true}
                                            position={{ x: Number(pX), y: Number(pY) }}
                                            size = {{width: (pC - pX), height: (pD - pY)}}
                                            onResize={(e, direction, ref, delta, position) => onResize(e, direction, ref, delta, position)}
                                            bounds = {"parent"}
                                            default={{x: 0, y: 0, width: 0, height: 0,}}>
                                            <span>A</span>
                                            <span>B</span>
                                            <span>C</span>
                                            <span>D</span>
                                        </Rnd>
                                    </div>

                                    <div className="text two">
                                        <ul>
                                            <li>
                                                <span>CORNER-C-GPS-LA</span>
                                                <h4 id="cc-la">{DD}</h4>
                                            </li>
                                            <li>
                                                <span>CORNER-C-GPS-LO</span>
                                                <h4 id="cc-lo">{XX}</h4>
                                            </li>
                                        </ul>
                                        <ul>
                                            <li>
                                                <span>CORNER-D-GPS-LA</span>
                                                <h4 id="cd-la">{DD}</h4>
                                            </li>
                                            <li>
                                                <span>CORNER-D-GPS-LO</span>
                                                <h4 id="cd-lo">{CC}</h4>
                                            </li>
                                        </ul>   
                                    </div>
                                </div>

                                <div className="full-width btns mt-4 text-right">
                                    <button type="button" className="next" onClick={updateZoneById} >POST</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
            
        </div>
    )
}

export default UpdateZone