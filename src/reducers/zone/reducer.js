import { createSlice } from '@reduxjs/toolkit'
import { apiClient } from '../../api/apiClient'
import { toast } from 'react-toastify'

// Slice
const Zone = createSlice({
    name: 'zone',
    initialState: {
        isZoneLoading: false,
        isSelect: false,
        arrZoneList : [],
        objZoneDetail: {},
    },
    reducers: {
        LoadingRequest: (state) => {
            state.isZoneLoading = true
        },
        LoadingZoneListSuccess: (state, action) => {
            state.isZoneLoading = false
            state.arrZoneList = action.payload
        },
        LoadingCreateNewSuccess: (state) => {
            state.isZoneLoading = false
        },
        LoadingUdtZoneByIdSuccess: (state, action) => {
            state.isZoneLoading = false
            state.isSelect = true
            state.objZoneDetail = action.payload
        },
        LoadingFailure: (state, action) => {
            state.isZoneLoading = false
            switch(action.payload) {
                case 'zoneDetail':
                  state.objZoneDetail = {}
                  break
                case 'zoneList':
                  state.arrZoneList = []
                  break
                default:
                  break
              }
        },
        searchZoneByKey: (state, action) => {
            state.arrZoneList = state.arrZoneList.filter((info) => info.name.toLocaleLowerCase().includes(action.payload))
        },
        initialState : (state) => {
            state.isSelect = false
        }
    },
});

// Actions
const { 
    LoadingRequest,
    LoadingFailure,
    LoadingZoneListSuccess,
    LoadingCreateNewSuccess,
    LoadingUdtZoneByIdSuccess,
    searchZoneByKey,
    initialState } = Zone.actions

// get zone list..
export const getZonetList = () => async dispatch => {
    try {
        dispatch(LoadingRequest())
        apiClient.getZonetList()
        .then((response)=>{
            if (response.status === 200) {
            dispatch(LoadingZoneListSuccess(response.data))
            } 
        })
        .catch((error)=>{
            let errorInfo = error.response.data
            toast.error(errorInfo.message)
            dispatch(LoadingFailure('zoneList'))
        })
    } catch (e) {
        dispatch(LoadingFailure('zoneList'))
        console.error(e.message);
    }
}

//create new zone
export const createNewZone = (data) => async dispatch => {
    if (!valid(data.id)) return toast.error('Please input the id!')
    if (!valid(data.region)) return toast.error('Please input the region!')
    if (data.region.length > 3) return toast.error('The region maximum character length must be less than 3.')
    if (!valid(data.site)) return toast.error('Please input the site!')
    if (data.groupIds.site > 3) return toast.error('The maximum character length must be less than 3.')
    if (!valid(data.area)) return toast.error('Please input the area!')
    if (!valid(data.fbxName)) return toast.error('Please input the fbxName!')
    if (!valid(data.groupIds)) return toast.error('Please select the groupIds!')
    if (!valid(data.locationTags)) return toast.error('Please input the locationTags!')

    try {
        dispatch(LoadingRequest())
        apiClient.createNewZone(data)
        .then((response)=>{
            if (response.status === 200) {
                toast.success('Zone created successfully!')
                dispatch(LoadingCreateNewSuccess())
            } 
        })
        .catch((error)=>{
            let errorInfo = error.response.data
            toast.error(errorInfo.message)
            dispatch(LoadingFailure())
        })
    } catch (e) {
        dispatch(LoadingFailure())
        console.error(e.message);
    }
}

//get zone detail by id
export const getZoneDetailById = (id) => async dispatch => {
    if (!valid(id)) return toast.error('Please select zone!')

    try {
        dispatch(LoadingRequest())
        apiClient.getZoneDetailById(id)
        .then((response)=>{
            if (response.status === 200) {
                dispatch(LoadingUdtZoneByIdSuccess(response.data))
            } 
        })
        .catch((error)=>{
            let errorInfo = error.response.data
            toast.error(errorInfo.message)
            dispatch(LoadingFailure('zoneDetail'))
        })
    } catch (e) {
        dispatch(LoadingFailure('zoneDetail'))
        console.error(e.message);
    }
}

//update zone detail by id
export const updateZoneDetailById = (id, data) => async dispatch => {
    if (!valid(data.fbxName)) return toast.error('Please input the fbxName!')
    if (!valid(data.groupIds)) return toast.error('Please select the groupIds!')

    try {
        dispatch(LoadingRequest())
        apiClient.updateZoneDetailById(id, data)
        .then((response)=>{
            if (response.status === 200) {
                toast.success('Update successfully!')
                dispatch(LoadingUdtZoneByIdSuccess(response.data))
            } 
        })
        .catch((error)=>{
            let errorInfo = error.response.data
            toast.error(errorInfo.message)
            dispatch(LoadingFailure('zoneDetail'))
        })
    } catch (e) {
        dispatch(LoadingFailure('zoneDetail'))
        console.error(e.message);
    }
}

//search zone by keyword
export const searchZoneByKeyWord = (key) => async dispatch => {
    dispatch(searchZoneByKey(key))
}

//initial select state
export const intitialIsSelect = () => async dispatch => {
    dispatch(initialState())
}

//once page laod, initialization objZoneDetail 
export const initObjZone = () => async dispatch => {
    dispatch(LoadingFailure('zoneDetail'))
}

//validation
const valid = (value) => {
    if (value.length === 0) return false
    return true
}

export default Zone.reducer