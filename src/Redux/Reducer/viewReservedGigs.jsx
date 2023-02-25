import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    show : false,
    data: ''
}

const viewReservedGigs = createSlice({
  name: 'viewOrders',
  initialState: INITIAL_STATE,
  reducers: {
    orderModalOn: (state, data) => {
      state.show = true
      state.data = data.payload
    },
    orderModalOff: (state) => {
        state.show = false
    }
  }
})

export const { orderModalOff, orderModalOn } = viewReservedGigs.actions;
export default viewReservedGigs.reducer;