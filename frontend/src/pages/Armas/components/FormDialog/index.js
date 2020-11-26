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
  const [tipos, setTipos] = useState([])
  const [modelo, setModelo] = useState('')
  const [marca, setMarca] = useState('')
  const [calibre, setCalibre] = useState('')
  const [tipo, setTipo] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const {data} = await Provider.getTiposDeArmas()
        setTipo(data[0]?.id)
        setTipos(data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const performRegister = async () => {
    try {
      await Provider.performRegister({
        modelo,
        marca,
        calibre,
        tipo,
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
          value={modelo}
          placeholder={i18n.t('model')}
          onTextChange={text => setModelo(text)} />
        <Field
          value={marca}
          placeholder={i18n.t('brand')}
          onTextChange={text => setMarca(text)} />
        <Field
          maxLength={10}
          value={calibre}
          placeholder={i18n.t('caliber')}
          onTextChange={text => setCalibre(text)} />
        <FormControl
          fullWidth
          margin='dense'
          variant='outlined'>
          <InputLabel id='tipo-arma-input-label'>Tipo de arma</InputLabel>
          <Select
            value={tipo}
            labelId='tipo-arma-input-label'
            onChange={event => setTipo(event.target.value)}>
            {tipos.map(({id, descricao}, index) => (
              <MenuItem
                key={index}
                value={id}>
                {descricao}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
