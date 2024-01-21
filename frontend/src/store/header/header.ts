import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeaderState {
    color: string
    media: string
}

const initialState: HeaderState = { color: '33, 17, 95', media: '' };

const gradientSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        changeGradient: (state, action: PayloadAction<string>) => {
            state.color = action.payload;
        },
        changeMediaInfo: (state, action: PayloadAction<string>) => {
            state.media = action.payload;
        }
    },
})

export const {changeGradient, changeMediaInfo} = gradientSlice.actions

export default gradientSlice.reducer
