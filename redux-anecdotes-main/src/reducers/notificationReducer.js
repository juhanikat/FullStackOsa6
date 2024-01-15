import { createSlice } from "@reduxjs/toolkit"


const notificationAtStart = ""
const initialState = notificationAtStart

let timeoutId = false


const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showNotification(state, action) {
            return action.payload
        },
        hideNotification() {
            return ""
        }
    }
})


export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
    return dispatch => {
        dispatch(showNotification(content))

        if (timeoutId !== null) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
            dispatch(hideNotification())
        }, time * 1000)
    }
}

export default notificationSlice.reducer