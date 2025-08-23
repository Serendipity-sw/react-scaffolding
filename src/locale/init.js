import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageEnum from '../enum/language-enum'
import Zh from './language/cn'

i18n.use(initReactI18next).init({
  resources: {
    [LanguageEnum.ZhCN]: {
      translation: Zh
    }
  },
  lng: LanguageEnum.ZhCN,
  fallbackLng: LanguageEnum.ZhCN,
  interpolation: {
    escapeValue: false
  }
})
