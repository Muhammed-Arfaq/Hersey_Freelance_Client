import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    show : false
}

const reviewModal = createSlice({
  name: 'review',
  initialState: INITIAL_STATE,
  reducers: {
    setSwitchOn: (state) => {
      state.show = true
    },
    setSwitchOff: (state) => {
        state.show = false
    }
  }
})

export const { setSwitchOff, setSwitchOn } = reviewModal.actions;
export default reviewModal.reducer;