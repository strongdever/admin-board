import { createSlice } from '@reduxjs/toolkit'
import { apiClient } from '../../api/apiClient'
import { toast } from 'react-toastify'

// Slice
const Auth = createSlice({
  name: 'Auth',
  initialState: {
    isSignInLoading : false,
    isSendEmail: false,
    isSendEmailLoading: false
  },
  reducers: {
    SignInRequest: (state) => {
      state.isSignInLoading = true
    },
    SignInSuccess: (state) => {
      state.isSignInLoading = false
    },
    SignInFailure: (state) => {
      state.isSignInLoading = false
    },
    SendEmailRequest: (state) => {
      state.isSendEmailLoading = true
    },
    SendEmailSuccess: (state) => {
      state.isSendEmailLoading = false
      state.isSendEmail = true
    },
    SendEmailFailure: (state) => {
      state.isSendEmailLoading = false
    },
    InitialIsSendEmail: (state) => {
      state.isSendEmail = false
    }
  },
})

// Actions
const {
  SignInRequest,
  SignInSuccess,
  SignInFailure,
  SendEmailRequest,
  SendEmailSuccess, 
  SendEmailFailure,
  InitialIsSendEmail } = Auth.actions

// once user siginin..
export const signInUser = ({ email, password }) => async dispatch => {

  //validation email and password
  if (!validEmail(email)) return toast.error('Please enter the email correctly!')
  if (!validPassword(password)) return toast.error('Please enter the password correctly!')

  try {
    dispatch(SignInRequest())
    apiClient.login(email, password)
      .then((response)=>{
          if (response.auth) {
          toast.success('login successfully!')
          dispatch(SignInSuccess())
        } else {
          switch(response.message) {
            case 'auth/wrong-password':
              toast.error('Please check the Password')
              break
            case 'auth/user-not-found':
              toast.error('Please check the Email')
              break
            case 'auth/too-many-requests':
              toast.error('too many requests')
              break
            default:
              break
          }
          dispatch(SignInFailure())
        }
      })
  } catch (e) {
    dispatch(SignInFailure())
    console.error(e.message)
  }
}

// once use sign out
export const signOut = () => async dispatch => {
  try {
    apiClient.signOut()
  } catch (e) {
    console.error(e.message);
  }
}

// once user send email for password reset..
export const sendEmailforResetPw = (email) => async dispatch => {
  
  // validation email
  if (!validEmail(email)) return toast.error('Please enter the email correctly!')

  try {
    dispatch(SendEmailRequest())
    apiClient.resetPw(email)
      .then((response)=>{
        if (response.sent) {
          toast.success('Email sent successfully!')
          dispatch(SendEmailSuccess())
        } else {
          toast.error('Unregistered Email!')
          dispatch(SendEmailFailure())
        }
      })
  } catch (e) {
    dispatch(SendEmailFailure())
    console.error(e.message);
  }
}

// once isSendEamil initiall.. 
export const initialIsSendEmail = () => async dispatch => {

  try {
    dispatch(InitialIsSendEmail())
  } catch (e) {
    return console.error(e.message)
  }
}

const validEmail = (email) => {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if (!email.match(mailformat)) return false
  if (email.length === 0) return false
  return true
}

const validPassword = (pw) => {
  if (pw.length === 0) return false
  return true
}

export default Auth.reducer