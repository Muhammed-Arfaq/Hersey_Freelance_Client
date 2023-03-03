import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    show : false,
    data: ''
}

const profileModal = createSlice({
  name: 'profile',
  initialState: INITIAL_STATE,
  reducers: {
    switchOn: (state, data) => {
      state.show = true
      state.data = data.payload
    },
    switchOff: (state) => {
        state.show = false
    }
  }
})

export const { switchOff, switchOn } = profileModal.actions;
export default profileModal.reducer;