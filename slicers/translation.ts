import { createSlice } from "@reduxjs/toolkit"
import { RootState } from '../store/store';

export interface Translation {
    orgWord: string
    cvtWord: string
    type: string
}

export const LangType = {
    JAPANESE: 'ja',
    CHINESE: 'zh',
} as const

export interface TranslationState {
    translations: Translation[]
}

export const initialState: TranslationState = {
    translations: [
    ],
}

const translationSlice = createSlice({
    name: 'translation',
    initialState: initialState,
    reducers: {
        reset: (state) => {
            state.translations = []
        },
        setTranslations: (state, action) => {
            state.translations = [...state.translations, action.payload]
        }
    }
})

export const { reset, setTranslations } = translationSlice.actions

export const translationState = (state: RootState) => state.translation.translations

export default translationSlice.reducer