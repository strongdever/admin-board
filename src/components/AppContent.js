import React, { Suspense } from 'react'
import PropTypes from 'prop-types';

const CreateMachine = React.lazy(() => import('../views/CreateMachine'))
const CreateProfile = React.lazy(() => import('../views/CreateProfile'))
const LocationSetting = React.lazy(() => import('../views/LocationSetting'))
const UpdateMachine = React.lazy(() => import('../views/UpdateMachine'))
const CreateZone = React.lazy(() => import('../views/CreateZone'))
const UpdateZone = React.lazy(() => import('../views/UpdateZone'))
const ApiSettings = React.lazy(() => import('../views/ApiSettings'))
const GroupView = React.lazy(() => import('../views/GroupView'))
const MachineView = React.lazy(() => import('../views/MachineView'))

const AppContent = ({ subChild }) => {
  
  return (
    <Suspense>
      {
        subChild === "CreateMachine" && <CreateMachine /> ||
        subChild === "CreateProfile" && <CreateProfile /> || 
        subChild === "LocationSetting" && <LocationSetting /> ||
        subChild === "UpdateMachine" && <UpdateMachine /> ||
        subChild === "CreateZone" && <CreateZone /> ||
        subChild === "UpdateZone" && <UpdateZone /> ||
        subChild === "ApiSettings" && <ApiSettings /> ||
        subChild === "GroupView" && <GroupView /> ||
        subChild === "MachineView" && <MachineView />
      }
    </Suspense>
  )
}

AppContent.propTypes = {
  subChild: PropTypes.any,
};

export default React.memo(AppContent)