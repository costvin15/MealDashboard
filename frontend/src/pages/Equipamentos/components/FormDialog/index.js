import React, {useState, useEffect} from 'react'
import {
  Button,
  Dialog,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core'

import Provider from './provider'
import i18n from '../../../../lang'

const Field = ({
  value = '',
  maxLength = 0,
  placeholder = '',
  onTextChange = () => {},
}) => {
  return (
    <TextField
      fullWidth
      value={value}
      margin='dense'
      variant='outlined'
      label={placeholder}
      onChange={event => {
        if (maxLength === 0 || event.target.value.length <= maxLength) {
          onTextChange(event.target.value)
        }
      }} />
  )
}

const FormDialog = ({
  open = false,
  onClose = () => {},
  onError = () => {},
}) => {
  const [descricao, setDescricao] = useState('')
  const [estoque, setEstoque] = useState('')

  const performRegister = async () => {
    try {
      await Provider.performRegister({
        descricao,
        estoque,
      })
      onClose()
    } catch (error) {
      onError()
    }
  }

  return (
    <Dialog open={open} minWidth='md'>
      <DialogTitle>{i18n.t('add')}</DialogTitle>
      <DialogContent>
        <Field
          value={descricao}
          placeholder={i18n.t('description')}
          onTextChange={text => setDescricao(text)} />
        <Field
          value={estoque}
          placeholder={i18n.t('stock')}
          onTextChange={text => setEstoque(text)} />
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
