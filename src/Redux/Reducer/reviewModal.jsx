import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    show : false,
    data: ''
}

const reviewModal = createSlice({
  name: 'review',
  initialState: INITIAL_STATE,
  reducers: {
    setSwitchOn: (state, data) => {
      state.show = true
      state.data = data.payload
      console.log(state.data);
    },
    setSwitchOff: (state) => {
        state.show = false
    }
  }
})

export const { setSwitchOff, setSwitchOn } = reviewModal.actions;
export default reviewModal.reducer;