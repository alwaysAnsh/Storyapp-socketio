import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    storyId:  'empty',
}

export const storyIdSlice = createSlice({
  name: 'storyId',
  initialState,
  reducers: {

    updateStoryId: (state, action) => {
      state.storyId = action.payload
      
    },
  },
})


export const { updateStoryId } = storyIdSlice.actions

export default storyIdSlice.reducer