import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
    active: boolean
}

const nowPlayingSidebarState = JSON.parse(localStorage.getItem('nowPlayingSidebarState') || 'false')
const initialState: SidebarState = { active: nowPlayingSidebarState }

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.active = !state.active
        }
    },
})

export const {toggleSidebar} = sidebarSlice.actions

export default sidebarSlice.reducer
