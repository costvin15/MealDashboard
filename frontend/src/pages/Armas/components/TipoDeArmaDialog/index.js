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
  error = false,
  value = '',
  type = 'text',
  placeholder = '',
  onTextChange = () => {}
}) => {
  return (
    <TextField
      fullWidth
      value={value}
      error={error}
      margin='dense'
      variant='outlined'
      label={placeholder}
      onChange={event => onTextChange(event.target.value)} />
  )
}

const FormDialog = ({
  open = false,
  onClose = () => {},
  onError = () => {},
}) => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  
  const performRegister = async () => {
    try {
      await Provider.performRegister({
        nome: name,
      })
      onClose()
    } catch (error) {
      onError()
      setError(true)
    }
  }

  return (
    <Dialog open={open} minWidth='md'>
      <DialogTitle>{i18n.t('add')} {i18n.t('guntype')}</DialogTitle>
      <DialogContent>
        <Field
          value={name}
          error={error}
          onTextChange={text => setName(text)}
          placeholder={i18n.t('name')} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {i18n.t('cancel')}
        </Button>

        <Button onClick={() => performRegister()}>
          {i18n.t('send')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog
