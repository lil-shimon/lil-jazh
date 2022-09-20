import { LangType } from "../slicers/translation";

// LangTypeからなんの言語かを日本語で取得
export const toJapaneseFromLangType = (langType: string) => {
    return langType === LangType.JAPANESE ? "日本語" : "中国語"
}