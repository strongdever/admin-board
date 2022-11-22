import React from 'react'
import { AppContent, AppSidebar, AppBreadcrumb } from '../components/index'
import PropTypes from 'prop-types';

const Layout = ({ child }) => {
  return (
    <div id="wrapper">
      <AppSidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
            <AppBreadcrumb subChild={child}/>
            <AppContent subChild={child} />
        </div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  child: PropTypes.any,
};

export default Layout