import type { NextPage } from 'next'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { FC, useState } from "react";
import { LangType } from "../slicers/translation";

const Home: NextPage = () => {

    const [text, setText] = useState('');
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

    const stopListening = async () => {
        SpeechRecognition.stopListening()
        await translation()
        resetTranscript()
    }

    const translation = async () => {
        if (!API_KEY) return console.log('API_KEY is not defined')
        const params = {
            auth_key: API_KEY,
            text: transcript,
            target_lang: "en",
        }
        const query = new URLSearchParams(params)
        const res = await fetch(`${API_URL}?${query}`)
        const data = await res.json()
        setText(data.translations[0].text)
    }

    return (
        <>
            <div>Microphone: {listening ? 'on' : 'off'}</div>
            <TransButton lang={LangType.JAPANESE} startListening={startListening} stopListening={stopListening}/>
            <TransButton lang={LangType.CHINESE} startListening={startListening} stopListening={stopListening}/>
            <div>{transcript}</div>
            <div>{text}</div>
        </>
    )
}

interface ButtonProps {
    lang: string
    startListening: (lang: string) => void
    stopListening: () => void
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
            onTouchEnd={stopListening}
            onMouseUp={stopListening}
        >
            {text}
        </button>
    )
}

export default Home
