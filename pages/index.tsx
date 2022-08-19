import type { NextPage } from 'next'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useState } from "react";

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

    const startListening = () => SpeechRecognition.startListening({ continuous: true })

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
            <button
                onTouchStart={startListening}
                onMouseDown={startListening}
                onTouchEnd={stopListening}
                onMouseUp={stopListening}
            >
                Hold to talk
            </button>
            <div>{transcript}</div>
            <div>{text}</div>
        </>
    )
}

export default Home
