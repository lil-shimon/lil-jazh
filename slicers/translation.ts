import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

export interface Translation {
  orgWord: string // 変換前の単語
  cvtWord: string // 変換後の単語
  type: string // 言語の種類
}

export const LangType = {
  JAPANESE: 'ja',
  CHINESE: 'zh'
} as const

export interface TranslationState {
  translations: Translation[]
}

export const initialState: TranslationState = {
  translations: []
}

const translationSlice = createSlice({
  name: 'translation',
  initialState: initialState,
  reducers: {
    setTranslations: (state, action) => {
      state.translations = [action.payload, ...state.translations]
    }
  }
})

export const { setTranslations } = translationSlice.actions

export const translationState = (state: RootState) =>
  state.translation.translations

export default translationSlice.reducer
