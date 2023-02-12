import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    show : false
}

const vendorReviewModal = createSlice({
  name: 'vendorReview',
  initialState: INITIAL_STATE,
  reducers: {
    setModalOn: (state) => {
      state.show = true
    },
    setModalOff: (state) => {
        state.show = false
    }
  }
})

export const { setModalOff, setModalOn } = vendorReviewModal.actions;
export default vendorReviewModal.reducer;