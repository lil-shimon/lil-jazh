import type { NextPage } from 'next'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { FC } from "react";
import { LangType, setTranslations, Translation, translationState } from "../slicers/translation";
import { useDispatch, useSelector } from "react-redux";

const Home: NextPage = () => {

    const dispatch = useDispatch()
    const translations = useSelector(translationState)
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const {
        browserSupportsSpeechRecognition,
        transcript,
        listening,
        resetTranscript,
    } = useSpeechRecognition()

    if (!browserSupportsSpeechRecognition) {
        return <p>ブラウザがサポートしていません</p>
    }

    const startListening = (lang: string) => {
        SpeechRecognition.startListening({ continuous: true, language: lang })
    }

    const stopListening = async (lang: string) => {
        const targetLang = (lang === LangType.JAPANESE) ? LangType.CHINESE : LangType.JAPANESE
        SpeechRecognition.stopListening()
        await translation(targetLang)
        resetTranscript()
    }

    const translation = async (lang: string) => {
        if (!API_KEY) return console.log('API_KEY is not defined')
        const params = {
            auth_key: API_KEY,
            text: transcript,
            target_lang: lang,
        }
        const query = new URLSearchParams(params)
        const res = await fetch(`${API_URL}?${query}`)
        const data = await res.json()
        dispatch(setTranslations({
            orgWord: transcript,
            cvtWord: data.translations[0].text,
            type: lang
        }))
    }

    return (
        <>
            <div>Microphone: {listening ? 'on' : 'off'}</div>
            <TransButton lang={LangType.JAPANESE} startListening={startListening} stopListening={stopListening}/>
            <TransButton lang={LangType.CHINESE} startListening={startListening} stopListening={stopListening}/>
            <div>{transcript}</div>
            {translations.map((t: Translation, index: number) => {
                return (
                    <div key={index}>
                        <div>{t.cvtWord}</div>
                        <div>{t.orgWord}</div>
                    </div>
                )
            })}
        </>
    )
}

interface ButtonProps {
    lang: string
    startListening: (lang: string) => void
    stopListening: (lang: string) => void
}

const TransButton: FC<ButtonProps> = ({
                                          lang,
                                          startListening,
                                          stopListening,
                                      }) => {

    const text = (lang === LangType.JAPANESE) ? '日本語' : '中国語'

    return (
        <button
            onTouchStart={() => startListening(lang)}
            onMouseDown={() => startListening(lang)}
            onTouchEnd={() => stopListening(lang)}
            onMouseUp={() => stopListening(lang)}
        >
            {text}
        </button>
    )
}

export default Home
