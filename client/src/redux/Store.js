import { configureStore } from '@reduxjs/toolkit'
import storyIdSlice from './slices/storyIdSlice'

export const store = configureStore({
  reducer: {
    storyId: storyIdSlice
  },
})