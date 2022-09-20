import { LangType } from "../slicers/translation";

// LangTypeからなんの言語かを日本語で取得
export const toJapaneseFromLangType = (lang: string) => {
    return lang === LangType.JAPANESE ? "日本語" : "中国語"
}