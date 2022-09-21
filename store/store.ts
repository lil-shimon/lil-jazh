import { configureStore } from '@reduxjs/toolkit'
import translation from '../slicers/translation'

export const store = configureStore({
  reducer: {
    translation: translation
  }
})

export type RootState = ReturnType<typeof store.getState>
