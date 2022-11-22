import React, { Suspense, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { PrivateRoute } from './router/privateRoute'
import { ToastContainer } from 'react-toastify'
import { getAuth, onAuthStateChanged, getIdToken } from 'firebase/auth'
import logIcon from './assets/images/logo.png'
import './assets/css/sb-admin.css'
import './assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import 'antd/dist/antd.min.css'

const loading = (
  <div className="simple-logo full-width">
    <img src={logIcon} />
  </div>
)
//containers
const SingIn = React.lazy(() => import('./views/SignIn'))
const Layout = React.lazy(() => import('./layout/Layout'))
const NotFound = React.lazy(() => import('./views/NotFound'))

function App() {

  let navigate = useNavigate()
  
  useEffect(() => {
    const authentication = getAuth()

    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        const token = await getIdToken(user)
        
        localStorage.setItem('Auth Token', token)
        localStorage.setItem('User Email', user.email)

      } else {
        localStorage.removeItem('Auth Token')
        localStorage.removeItem('User Email')
        navigate('/')
      }
    })
  }, [navigate])

  return (
    <Suspense fallback = {loading}>
      <ToastContainer/>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" name="SignIn" element={<SingIn />} />
        <Route path="/createmachine" name="CreateMachine" element={<PrivateRoute><Layout child={'CreateMachine'} /></PrivateRoute>} />
        <Route path="/createmachine/profilecreation" name="CreateProfile" element={<PrivateRoute><Layout child={'CreateProfile'} /></PrivateRoute>} />
        <Route path="/createmachine/locationsetting" name="LocationSetting" element={<PrivateRoute><Layout child={'LocationSetting'} /></PrivateRoute>} />
        <Route path="/updatemachine" name="UpdateMachine" element={<PrivateRoute><Layout child={'UpdateMachine'} /></PrivateRoute>} />
        <Route path="/createzone" name="CreateZone" element={<PrivateRoute><Layout child={'CreateZone'} /></PrivateRoute>} />
        <Route path="/updatezone" name="UpdateZone" element={<PrivateRoute><Layout child={'UpdateZone'} /></PrivateRoute>} />
        <Route path="/apisettings" name="ApiSettings" element={<PrivateRoute><Layout child={'ApiSettings'} /></PrivateRoute>} />
        <Route path="/groupview" name="GroupView" element={<PrivateRoute><Layout child={'GroupView'} /></PrivateRoute>} />
        <Route path="/machineview" name="MachineView" element={<PrivateRoute><Layout child={'MachineView'} /></PrivateRoute>} />
      </Routes>
    </Suspense>
  )
}

export default App