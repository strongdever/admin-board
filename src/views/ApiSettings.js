import React from 'react'
import Table from '../components/elements/const/Table'
//images start
import deleteIcon from '../assets/images/delete.png'
import bundleIcon from '../assets/images/bundle.png'
//images end

const ApiSettings = () =>  {

    const dataSource = [
        {
            key: '1',
            server_id: '#APL-Pro',
            server_ip: '34.84.85.115',
            server_name: 'KOJISAN',
            region: 'JPN',
            api_key: 'KtNDmv27e3RSu',
            last_api: '2012-12-30',
        }
      ];
      
    const columns = [
        {
          title: 'SERVER ID',
          dataIndex: 'server_id',
          key: 'server_id',
        },
        {
          title: 'SERVER IP OR DOMAIN',
          dataIndex: 'server_ip',
          key: 'server_ip',
        },
        {
          title: 'SERVER NAME',
          dataIndex: 'server_name',
          key: 'server_name',
        },
        {
            title: 'REGION',
            dataIndex: 'region',
            key: 'rgion',
        },
        {
            title: 'API KEY',
            dataIndex: 'api_key',
            key: 'api_key',
        },
        {
            title: 'LAST API DATE',
            dataIndex: 'last_api',
            key: 'last_api',
        },
    ];

    return (
        <div className="container-fluid profile-page zones machine-list settings-api">
                    
            <div className="row">
                <div className="col-sm-8 headings">
                    <h4>SERVER SYSTEMS</h4>
                </div>
                <div className="col-sm-4 btnss">
                    <button><img src={deleteIcon} /> DELETE</button>
                    <button><img src={bundleIcon} />ADD</button>
                </div>
            </div>

            <div className="data-list">
                <Table
                    columns={columns}
                    dataSource={dataSource}/>
            </div>

        </div>
    )
}

export default ApiSettings