# model

```yaml
Translations:
  translations Translation[]

Translation:
  type  LangType
  orgWord
  cvtWord

LangType:
  1 JAPANESE
  2 CHINESE
```

# View
```
display each element of a translations

when translation.LangType == CHINESE, placed message on the left
when translation.LangType == JAPANESE, it must be on the right

message must be like this

cvtWord
orgWord
```

# API

## speech to text
https://cloud.google.com/speech-to-text


## language detection
https://cloud.google.com/translate/docs/basic/detecting-language

## language translation
https://cloud.google.com/translate