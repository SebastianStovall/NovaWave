import { createSlice } from "@reduxjs/toolkit";

function getRandDocumentsInCollection(numDocuments: number) {
    const randomArray: Number[] = []
    while(randomArray.length < 3 ) {
        let randNum = Math.floor(Math.random() * numDocuments)
        if( randNum !== 0 && !randomArray.includes(randNum) ) {
            randomArray.push(randNum)
        }
    }
    return randomArray
}

// Create a slice for the session state
const persistantSlice = createSlice({
    name: "persist",
    initialState: { quickplayGrid: { albums: '', artists: '' } },
    reducers: {
        generateQuickplayGridValues: (state) => {
            state.quickplayGrid = {
                albums: `${getRandDocumentsInCollection(10)}`,
                artists: `${getRandDocumentsInCollection(5)}`
            }
        },
    },
});

export const {generateQuickplayGridValues} = persistantSlice.actions

export default persistantSlice.reducer;
