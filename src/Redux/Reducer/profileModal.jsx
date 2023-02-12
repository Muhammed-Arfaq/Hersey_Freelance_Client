import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    show : false
}

const profileModal = createSlice({
  name: 'profile',
  initialState: INITIAL_STATE,
  reducers: {
    switchOn: (state) => {
      state.show = true
    },
    switchOff: (state) => {
        state.show = false
    }
  }
})

export const { switchOff, switchOn } = profileModal.actions;
export default profileModal.reducer;