import React, {useState, useEffect} from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  InputLabel,
  FormControl,
} from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from '@material-ui/pickers'
import 'moment'
import DateUtils from '@date-io/moment'

import i18n from '../../../../lang'
import Provider from './provider'

const FormDialog = ({
  id = 0,
  open = false,
  isDepature = false,
  onClose = () => {},
}) => {
  const [enterDateTime, setEnterDateTime] = useState(new Date())
  const [exitDateTime, setExitDateTime] = useState(new Date())
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const data = await Provider.getAllUsers()
        setUsers(data)
        setSelectedUser(data[0].id)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return (
    <Dialog open={open} minWidth='md'>
      <DialogTitle>Registrar ponto</DialogTitle>
      <DialogContent>
        {(!isDepature && (
          <>
            <FormControl variant='outlined' fullWidth>
              <InputLabel htmlFor='usuario-select'>{i18n.t('selectauser')}</InputLabel>
              <Select
                native
                margin='dense'
                label={i18n.t('selectauser')}
                inputProps={{
                  id: 'usuario-select'
                }}
                onChange={(event) => setSelectedUser(event.target.value)}>
                  {users.map(user => (
                    <option value={user.id} key={user.id}>
                      {user.email}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <MuiPickersUtilsProvider utils={DateUtils}>
              <KeyboardDateTimePicker
                fullWidth
                margin='dense'
                label={i18n.t('entry')}
                format='DD/MM/yyyy HH:mm'
                value={enterDateTime}
                onChange={(date) => setEnterDateTime(date)} />
            </MuiPickersUtilsProvider>
          </>
        )) || (
          <MuiPickersUtilsProvider utils={DateUtils}>
            <KeyboardDateTimePicker
              fullWidth
              margin='dense'
              label={i18n.t('Saída')}
              format='DD/MM/yyyy HH:mm'
              value={exitDateTime}
              onChange={(date) => setExitDateTime(date)} />
          </MuiPickersUtilsProvider>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {i18n.t('cancel')}
        </Button>

        <Button onClick={async () => {
          if (!isDepature) {
            await Provider.performEntry(selectedUser, enterDateTime)
          } else {
            await Provider.performDeparture(id, exitDateTime)
          }
          onClose()
          window.location.reload()
        }}>
          {i18n.t('send')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog
