import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  chatUser: {}
}

const currentChat = createSlice({
  name: 'currentChat',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentChat: (state, chatUser) => {
      state.chatUser = chatUser.payload
    }
  }
})

export const { setCurrentChat } = currentChat.actions;
export default currentChat.reducer;