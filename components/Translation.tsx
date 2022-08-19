import { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LangType, setTranslations, Translation, translationState } from "../slicers/translation";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Button, Card, CardContent, Container, Stack, styled, Typography } from "@mui/material";

const Component: FC = () => {

    const dispatch = useDispatch()
    const translations = useSelector(translationState)
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const {
        browserSupportsSpeechRecognition,
        transcript,
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
        <Container fixed>
            <div>{transcript}</div>
            {translations.map((t: Translation, index: number) => {
                return (
                    <TransCard translation={t} key={index}/>
                )
            })}
            <ButtonContainer direction="row" spacing={8} sx={{ mt: 1.5 }}>
                <TransButton lang={LangType.CHINESE} startListening={startListening} stopListening={stopListening}
                             style={{ position: "fixed", right: "5%", bottom: "5%" }}/>
                <TransButton lang={LangType.JAPANESE} startListening={startListening} stopListening={stopListening}
                             style={{ position: "fixed", left: "5%", bottom: "5%" }}/>
            </ButtonContainer>
        </Container>
    )
}

const ButtonContainer = styled(Stack)({
    padding: "0 10rem"
})

interface ButtonProps {
    lang: string
    startListening: (lang: string) => void
    stopListening: (lang: string) => void
    style: any
}

const TransButton: FC<ButtonProps> = ({
                                          lang,
                                          startListening,
                                          stopListening,
                                          style
                                      }) => {

    const text = (lang === LangType.JAPANESE) ? '日本語' : '中国語'
    const colour = (lang === LangType.JAPANESE) ? 'primary' : 'secondary'

    return (
        <TransBtn
            sx={style}
            variant="outlined"
            color={colour}
            onTouchStart={() => startListening(lang)}
            onMouseDown={() => startListening(lang)}
            onTouchEnd={() => stopListening(lang)}
            onMouseUp={() => stopListening(lang)}
        >
            {text}
        </TransBtn>
    )
}

const TransBtn = styled(Button)({
    borderRadius: "50%",
    width: "10rem",
    height: "10rem"
})

interface TransCardProps {
    translation: Translation
}

const TransCard: FC<TransCardProps> = ({ translation }) => {
    return (
        <Card sx={{ minWidth: 275, mt: 1.5 }}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
                    {translation.cvtWord}
                </Typography>
                <Typography color="text.secondary">
                    {translation.orgWord}
                </Typography>
            </CardContent>
        </Card>
    )
}

export const TranslationComponent = memo(Component)