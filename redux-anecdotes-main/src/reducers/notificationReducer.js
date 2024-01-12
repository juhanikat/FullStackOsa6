import { createSlice } from "@reduxjs/toolkit"


const notificationAtStart = ""
const initialState = notificationAtStart


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
export default notificationSlice.reducer