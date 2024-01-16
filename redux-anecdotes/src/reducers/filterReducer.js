import { createSlice } from "@reduxjs/toolkit"


const filterAtStart = ""
const initialState = { filter: filterAtStart }

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        changeFilter(state, action) {
            const filter = action.payload
            state.filter = filter

        }
    }
})


export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer