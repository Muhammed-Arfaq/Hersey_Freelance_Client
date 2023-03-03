import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    show : false,
    data: ''
}

const reserveModal = createSlice({
  name: 'reserve',
  initialState: INITIAL_STATE,
  reducers: {
    setCreateSwitchOn: (state, data) => {
      state.show = true
      state.data = data.payload
      console.log(state.data);
    },
    setCreateSwitchOff: (state) => {
        state.show = false
    }
  }
})

export const { setCreateSwitchOff, setCreateSwitchOn } = reserveModal.actions;
export default reserveModal.reducer;