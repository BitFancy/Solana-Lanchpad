import { createSlice } from "@reduxjs/toolkit";

export const createRoleSlice = createSlice({
  name: "createRole",
  initialState: {
    hasRole: false,
  },

  reducers: {
    updateRole: (state, action) => {
      state.hasRole = action.payload;
    },

    removeRole: (state) => {
      state.hasRole = false;
    },
  },
});

export const { updateRole, removeRole } = userSlice.actions;
export const getRole = (state) => state.createRole.hasRole;
export default userSlice.reducer;
