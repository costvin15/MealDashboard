import i18n from 'i18next'
import ptBR from './pt-br'

i18n.init({
  interpolation: {
    escapeValue: false,
  },
  lng: 'pt-BR',
  resources: {
    'pt-BR': {
      translation: ptBR
    }
  }
})

export default i18n
