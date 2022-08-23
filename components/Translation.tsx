import { FC, memo, useEffect } from "react";

import { useSelector } from "react-redux";
import { useSpeechRecognition } from "react-speech-recognition";
import { Button, Card, CardContent, Container, Stack, styled, Typography } from "@mui/material";

import { useTranslation } from "../hooks/translation.hook";
import { LangType, Translation, translationState } from "../slicers/translation";
import { toast } from "react-toastify";
import { getLangName } from "../utils/helper";

interface TransCardProps {
    translation: Translation
}

interface ButtonProps {
    lang: string
    startListening: (lang: string) => void
    stopListening: (lang: string) => void
    style: any
}

const Component: FC = () => {

    const translations = useSelector(translationState)
    const { startListening, stopListening, transcript } = useTranslation()
    const { browserSupportsSpeechRecognition } = useSpeechRecognition()

    if (!browserSupportsSpeechRecognition) return <p>ブラウザがサポートしていません</p>

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
                             style={{ position: "fixed", right: "5%", bottom: "7%" }}/>
                <TransButton lang={LangType.JAPANESE} startListening={startListening} stopListening={stopListening}
                             style={{ position: "fixed", left: "5%", bottom: "7%" }}/>
            </ButtonContainer>
        </Container>
    )
}

const TransButton: FC<ButtonProps> = ({
                                          lang,
                                          startListening,
                                          stopListening,
                                          style
                                      }) => {

    const text = getLangName(lang)
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

const TransCard: FC<TransCardProps> = ({ translation }) => {

    if (!translation.orgWord) return null

    return (
        <Card sx={{ minWidth: 275, mt: 1.5 }}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
                    {translation.cvtWord}
                </Typography>
                <Typography color="text.secondary">
                    The original： {translation.orgWord}
                </Typography>
            </CardContent>
        </Card>
    )
}

const TransBtn = styled(Button)({
    borderRadius: "50%",
    width: "10rem",
    height: "10rem",
    backgroundColor: "white"
})

const ButtonContainer = styled(Stack)({
    padding: "0 10rem"
})

export const TranslationComponent = memo(Component)