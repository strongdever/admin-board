import React from 'react'
import { useSelector } from 'react-redux'
import svgIcon from '../../assets/images/svg-view.png'
import { Spin } from 'antd'

const SvgViewer = () => {

    const {isMachineLoading, objMCLocation} = useSelector(state => state.Machine)

    return (
        <div className="modal fade selectzone-popup  svgViewerPopup" id="svgViewerPopup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">SVG VIEWER</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Spin spinning={isMachineLoading}>
                            <div className="main">
                                <img src={svgIcon} />
                            </div>
                        </Spin>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">CLOSE</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SvgViewer
