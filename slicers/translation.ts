import { createSlice } from "@reduxjs/toolkit"
import { RootState } from '../store/store';

export interface Translation {
    orgWord: string
    cvtWord: string
    type: typeof LangType
}

export const LangType = {
    JAPANESE: 'ja',
    CHINESE: 'zh-CN',
} as const

export interface TranslationState {
    translations: Translation[]
}

export const initialState: TranslationState = {
    translations: [],
}

const translationSlice = createSlice({
    name: 'translation',
    initialState: initialState,
    reducers: {
        reset: (state) => {
            state.translations = []
        }
    }
})

export const { reset } = translationSlice.actions

export const translationState = (state: RootState) => state.translation

export default translationSlice.reducer