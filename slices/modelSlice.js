import {createSlice} from "@reduxjs/toolkit"

export const modelSlice = createSlice({
    name:"model",
    initialState:{
        model:false,
    },


    reducers:{
        open :(state, action) => {
            state.model=true;
        },

        close:(state)=> {
            state.model=false;
        },
    },
});


export const {open,close} =modelSlice.actions;
export const selectModel =(state) => state.model.model;
export default modelSlice.reducer;