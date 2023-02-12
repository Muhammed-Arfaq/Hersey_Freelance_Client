import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    show : false
}

const reserveModal = createSlice({
  name: 'reserve',
  initialState: INITIAL_STATE,
  reducers: {
    setCreateSwitchOn: (state) => {
      state.show = true
    },
    setCreateSwitchOff: (state) => {
        state.show = false
    }
  }
})

export const { setCreateSwitchOff, setCreateSwitchOn } = reserveModal.actions;
export default reserveModal.reducer;