import { createSlice } from "@reduxjs/toolkit"


const filterAtStart = ""
const initialState = filterAtStart

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        changeFilter(state, action) {
            const filter = action.payload
            console.log(JSON.parse(JSON.stringify(state)))
            return {...state, filter: filter}
           
        }
    }
})


export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer