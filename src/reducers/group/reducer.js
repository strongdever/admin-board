import { createSlice } from '@reduxjs/toolkit'
import { apiClient } from '../../api/apiClient'
import { toast } from 'react-toastify';

// Slice
const Group = createSlice({
  name: 'group',
  initialState: {
    isGroupLoading: false,
    arrGroupList : [],
    objGroupDetail : {},
    arrSelectedGroupId : []
  },
  reducers: {
    LoadingRequest: (state) => {
      state.isGroupLoading = true
    },
    LoadingGrpListSuccess: (state, action) => {
      state.isGroupLoading = false
      state.arrGroupList = action.payload
    },
    LoadingGrpDtlByIdSuccess: (state, action) => {
      state.isGroupLoading = false
      state.objGroupDetail = action.payload
    },
    LoadingFailure: (state) => {
      state.isGroupLoading = false
      state.arrGroupList = []
    },
    storeGruopId: (state, action) => {
      if (state.arrSelectedGroupId.includes(action.payload)) {
        state.arrSelectedGroupId = state.arrSelectedGroupId.filter((info)=>(info !== action.payload ))
      } else {
        state.arrSelectedGroupId = state.arrSelectedGroupId.concat(action.payload )
      }
    },
    initialGroupId: (state) => {
      state.arrSelectedGroupId=[]
    }
  },
});

// Actions
const {
  LoadingRequest,
  LoadingFailure,
  LoadingGrpListSuccess,
  LoadingGrpDtlByIdSuccess,
  storeGruopId,
  initialGroupId } = Group.actions

// get group list..
export const getGroupList = () => async dispatch => {  
  try {
    dispatch(LoadingRequest())
    apiClient.getGroupList()
      .then((response)=>{
        if (response.status === 200) {
          dispatch(LoadingGrpListSuccess(response.data.groups))
        } 
      })
      .catch((error)=>{
        toast.error(error.data)
        dispatch(LoadingFailure())
      })
  } catch (e) {
    dispatch(LoadingFailure())
    console.error(e.message);
  }
}

// get machine detail by id..
export const getGrpDetailById = (id) => async dispatch => {  
  try {
    dispatch(LoadingRequest())
    apiClient.getGrpDetailById(id)
      .then((response)=>{
        if (response.status === 200) {
          dispatch(LoadingGrpDtlByIdSuccess(response.data.group))
        }
      })
  } catch (e) {
    dispatch(LoadingFailure())
    console.error(e.message);
  }
}

//store group ids
export const storeGroupIds = (id) => async dispatch =>  {
  dispatch(storeGruopId(id))
}

//initial group ids
export const initialGroupIds = () => async dispatch =>  {
  dispatch(initialGroupId())
}

export default Group.reducer