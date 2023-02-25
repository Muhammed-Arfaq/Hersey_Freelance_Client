import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    show : false,
    data: ''
}

const vendorReviewModal = createSlice({
  name: 'vendorReview',
  initialState: INITIAL_STATE,
  reducers: {
    setModalOn: (state, data) => {
      state.show = true
      state.data = data.payload
    },
    setModalOff: (state) => {
        state.show = false
    }
  }
})

export const { setModalOff, setModalOn } = vendorReviewModal.actions;
export default vendorReviewModal.reducer;