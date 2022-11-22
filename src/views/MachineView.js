import React from 'react'
import Table from '../components/elements/const/Table'
import Map from '../components/elements/const/Map'

const MachineView = (props) => {

    const MachineHeadName = (props) => (
        <div>
            {props.name}<br/>
            <span style={{marginTop:'0px'}}>
                (ASSINGED)
            </span>
        </div>
    )

    const dataSource1 = [
        {
            key: '1',
            region: 'Mike',
            site: 'HND',
            area: 'T1',
            zone: '2F-A1-N3Z',
            machine_id: '13',
            machine_name: 'MACHINE C',
            type: '3D',
            group_id: '1',
            group_name: 'TEAM B'
        },
    ]
      
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
            title: <MachineHeadName
                    name = 'MACHINE ID'/>,
            dataIndex: 'machine_id',
            key: 'machine_id',
        },
        {
            title: <MachineHeadName
                    name = 'MACHINE NAME'/>,
            dataIndex: 'machine_name',
            key: 'machine_name',
        },
        {
            title: <MachineHeadName
                    name = 'TYPE'/>,
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: <MachineHeadName
                    name = 'GROUP ID'/>,
            dataIndex: 'group_id',
            key: 'group_id',
        },
        {
            title: <MachineHeadName
                    name = 'GROUP NAME'/>,
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

    const filterMachineByID = (e, zoneId) => {
        console.log(zoneId)
    }

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
                        <h3>MACHINE VIEW</h3>

                        <div className="modelthreed">
                            <div className="maps">
                                <Map
                                    locations={locations}
                                    onClickMark={filterMachineByID} />
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
                        <Table
                            columns={columns1}
                            dataSource={dataSource1}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MachineView