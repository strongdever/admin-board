import React from 'react'
import PropTypes from 'prop-types';

const Table1 = ({columns, dataSource}) =>  {

    return (
        <table>
            <thead>
                <tr>
                    {
                        columns.map((col)=>(
                            <th key={col.key}>{col.title}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    dataSource.map((data)=>(
                        <tr key={data.key} className="active">
                            {
                                columns.map((col, i)=>(
                                    <td key={i}>{data[col.dataIndex]}</td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

Table1.propTypes = {
    columns: PropTypes.array,
    dataSource: PropTypes.array
};

export default Table1
