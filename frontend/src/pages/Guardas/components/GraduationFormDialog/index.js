import React, {useState} from 'react'
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core'

import i18n from '../../../../lang'
import {Provider} from './provider'

const Field = ({
  value = '',
  type = 'text',
  placeholder = '',
  hasError = false,
  onError = () => {},
  setValue = () => {},
}) => {
  return (
    <TextField
      fullWidth
      type={type}
      value={value}
      margin='dense'
      variant='outlined'
      label={placeholder}
      {...(hasError) ? {
        error: true,
      } : {}}
      onChange={event => {
        setValue(event.target.value)
        onError(event.target.value)
      }} />
  )
}

const GraduationFormDialog = ({open = false, onClose = () => {}, onError = () => {}}) => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)

  const performRegister = async () => {
    if (!name) {
      setError(true)
    } else {
      try {
        await Provider.performRegister({
          nome: name,
        })
        onClose()
        window.location.reload()
      } catch (error) {
        onError()
        onClose()
      }
    }
  }
  
  return (
    <Dialog open={open} minWidth='md'>
      <DialogTitle>{i18n.t('add')} {i18n.t('graduation')}</DialogTitle>
      <DialogContent>
        <Field
          value={name}
          hasError={error}
          onError={text => {
            if (!text) {
              setError(true)
            } else {
              setError(false)
            }
          }}
          setValue={setName}
          placeholder={i18n.t('name')} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {i18n.t('cancel')}
        </Button>

        <Button onClick={() => {
          performRegister()
        }}>
          {i18n.t('send')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default GraduationFormDialog
