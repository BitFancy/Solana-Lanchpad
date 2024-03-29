import {createSlice} from "@reduxjs/toolkit"

export const balanceSlice = createSlice({
    name:"balance",
    initialState:{
        balance:null,
    },


    reducers:{
        setbalance :(state, action) => {
            state.balance=action.payload;
        },


        logoutbalance :(state,action)=>{
            state.balance=null;
        }

        
    },
});


export const {setbalance,logoutbalance} =balanceSlice.actions;
export const selectBalance =(state) => state.balance.balance;
export default balanceSlice.reducer;