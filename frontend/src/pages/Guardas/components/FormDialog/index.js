import React, {useState, useEffect} from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select as SelectField,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import Moment from 'moment'
import MomentUtils from '@date-io/moment'

import i18n from '../../../../lang'
import {Provider} from './provider'

const Field = ({
  input = '',
  type = 'text',
  placeholder = '',
  value = '',
  setValue = () => {},
  onError = () => {},
  errors = {},
}) => {
  return (
    <TextField
      fullWidth
      type={type}
      value={value}
      margin='dense'
      variant='outlined'
      label={placeholder}
      {...(errors.message.indexOf(input) !== -1 ? {
        error: true,
        helperText: i18n.t('fieldcannotbeempty')
      } : {})}
      onChange={event => {
        onError(input)
        setValue(event.target.value)
      }} />
  )
}

const Select = ({
  input = '',
  placeholder = '',
  data = [],
  selected = null,
  onChange = () => {},
  onError = () => {},
  errors = {},
}) => {
  return (
    <FormControl
      fullWidth
      margin='dense'
      variant='outlined'>
      <InputLabel>{placeholder}</InputLabel>
      <SelectField
        label={placeholder}
        {...(errors.message?.indexOf(input) !== -1 ? {
          error: true,
        } : {})}
        value={selected}
        onChange={event => {
          onError(input)
          onChange(event.target.value)
        }}>
        {data.map(({id, value}) => (
          <MenuItem key={id} value={id}>{value}</MenuItem>
        ))}
      </SelectField>
    </FormControl>
  )
}

const DateField = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <KeyboardDatePicker
      fullWidth
      margin='dense'
      label={placeholder}
      format='DD/MM/yyyy'
      inputVariant='outlined'
      value={value}
      onChange={onChange} />
  )
}

const FormDialog = ({open = false, user = null, onClose = () => {}, onError = () => {}}) => {
  const [id, setId] = useState(-1)
  const [name, setName] = useState('')
  const [warname, setWarName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [sexo, setSexo] = useState(0)
  const [graduacoes, setGraduacoes] = useState([])
  const [graduacao, setGraduacao] = useState(0)
  const [funcoes, setFuncoes] = useState([])
  const [funcao, setFuncao] = useState(0)
  const [admissao, setAdmissao] = useState(Moment())
  const [status, setStatus] = useState(0)
  const [demissao, setDemissao] = useState(Moment())
  const [error, setError] = useState({
    hasError: false,
    message: []
  })

  const performRegister = async () => {
    const errors = []

    if (!name) {
      errors.push('nome')
    }
    if (!warname) {
      errors.push('nome_guerra')
    }
    if (!email) {
      errors.push('email')
    }
    if (!password) {
      errors.push('senha')
    }
    if (graduacao === 0) {
      errors.push('graduacao')
    }
    if (funcao === 0) {
      errors.push('funcao')
    }

    try {
      if (errors.length > 0) {
        setError({
          hasError: true,
          message: errors,
        })
      } else {
        if (id === -1) {
          await Provider.performRegister({
            nome: name,
            nome_guerra: warname,
            email,
            senha: password,
            sexo,
            graduacao_id: graduacao,
            funcao_id: funcao,
            admissao: admissao.format('YYYY-MM-DD')
          })
        } else {
          await Provider.performEdit({
            id,
            nome: name,
            nome_guerra: warname,
            email,
            senha: password,
            sexo,
            graduacao_id: graduacao,
            funcao_id: funcao,
            admissao: admissao.format('YYYY-MM-DD'),
            demissao: status !== 0 ? demissao.format('YYYY-MM-DD') : null,
          })
        }
        onClose()
        window.location.reload()
      }
    } catch (error) {
      onError()
      onClose()
    }
  }

  const onInputError = input => {
    const errors = [...error.message]
    const index = error.message.indexOf(input)
    if (index !== -1) {
      errors.splice(index, 1)
      setError({
        hasError: errors.length > 0,
        message: errors,
      })
    }
  }

  useEffect(() => {
    (async () => {
      const data = await Provider.getGraduations()
      setGraduacoes(data)
    })()
  }, [setGraduacoes])

  useEffect(() => {
    (async () => {
      const data = await Provider.getFunctions()
      setFuncoes(data)
    })()
  }, [setFuncoes])

  useEffect(() => {
    if (user) {
      setId(user.id)
      setName(user.nome)
      setEmail(user.email)
      setSexo(user.sexo === "M" ? 0 : 1)
      setWarName(user.nome_guerra)
      setGraduacao(user.graduacao_id)
      setFuncao(user.funcao_id)
      setAdmissao(Moment(user.admissao))
      if (user.demissao) {
        setStatus(1)
        setDemissao(Moment(user.demissao))
      } else {
        setStatus(0)
      }
    } else {
      setId(-1)
      setName('')
      setEmail('')
      setSexo(0)
      setWarName('')
      setGraduacao(null)
      setFuncao(null)
      setAdmissao(Moment())
      setStatus(0)
      setDemissao(Moment())
    }
  }, [user])

  return (
    <Dialog open={open} minWidth='md'>
      <DialogTitle>{i18n.t('add')}</DialogTitle>
      <DialogContent>
        <Field
          value={name}
          input={'nome'}
          errors={error}
          onError={onInputError}
          setValue={setName}
          placeholder={i18n.t('name')} />
        <Field
          type={'text'}
          value={email}
          input={'email'}
          errors={error}
          onError={onInputError}
          setValue={setEmail}
          placeholder={i18n.t('email')} />
        <Field
          value={warname}
          errors={error}
          input={'nome_guerra'}
          onError={onInputError}
          setValue={setWarName}
          placeholder={i18n.t('warname')} />
        <Field
          type={'password'}
          value={password}
          errors={error}
          input={'senha'}
          onError={onInputError}
          setValue={setPassword}
          placeholder={i18n.t('password')} />
        <Select
          errors={error}
          data={[{id: 0, value: i18n.t('male')}, {id: 1, value: i18n.t('female')}]}
          input={'sexo'}
          selected={sexo}
          onError={onInputError}
          onChange={setSexo}
          placeholder={i18n.t('gender')} />
        <Select
          errors={error}
          data={graduacoes}
          input={'graduacao'}
          selected={graduacao}
          onError={onInputError}
          onChange={setGraduacao}
          placeholder={i18n.t('graduation')} />
        <Select
          errors={error}
          input={'funcao'}
          data={funcoes}
          selected={funcao}
          onError={onInputError}
          onChange={setFuncao}
          placeholder={i18n.t('function')} />
        {id !== -1 && (
          <Select
            errors={error}
            data={[{id: 0, value: 'Empregado'}, {id: 1, value: 'Demitido'}]}
            input={'status'}
            selected={status}
            onError={onInputError}
            onChange={setStatus}
            placeholder={i18n.t('status')} />
        )}
        <MuiPickersUtilsProvider libInstance={Moment} utils={MomentUtils}>
          <DateField
            value={admissao}
            onChange={setAdmissao}
            placeholder={i18n.t('admission')} />
          {status !== 0 && (
            <DateField
              value={demissao}
              onChange={setDemissao}
              placeholder={i18n.t('dismissal')} />
          )}
        </MuiPickersUtilsProvider>
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

export default FormDialog
