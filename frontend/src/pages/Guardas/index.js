import React, {useState, useEffect} from 'react'
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  IconButton,
} from '@material-ui/core'
import {
  Add as AddIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Edit as EditIcon,
} from '@material-ui/icons'
import {
  Skeleton,
  SpeedDial,
  SpeedDialAction,
} from '@material-ui/lab'
import Moment from 'moment'

import {Page, Dialogs} from '../../components'
import i18n from '../../lang'
import Provider from './provider'
import {
  FormDialog,
  FunctionFormDialog,
  GraduationFormDialog,
} from './components'

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
}))

const Guardas = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [editingUser, setEditingUser] = useState({})
  const [addDialogOpened, setAddDialogOpened] = useState(false)
  const [functionDialogOpened, setFunctionDialogOpened] = useState(false)
  const [graduationDialogOpened, setGraduationDialogOpened] = useState(false)
  const classes = useStyles()
  
  useEffect(() => {
    (async () => {
      try {
        const response = await Provider.getData()
        setData(response.data)
      } catch (exception) {
        setError(true)
        setErrorMessage(i18n.t('checkyourinternet'))
      }
    })()
  }, [])

  return (
    <Page title={i18n.t('keepers')}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>{i18n.t('name')}</TableCell>
              <TableCell>{i18n.t('warname')}</TableCell>
              <TableCell>{i18n.t('email')}</TableCell>
              <TableCell>{i18n.t('admission')}</TableCell>
              <TableCell>{i18n.t('status')}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length === 0 && [...Array(10)].map((value, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton variant='text' />
                </TableCell>
                <TableCell>
                  <Skeleton variant='text' />
                </TableCell>
                <TableCell>
                  <Skeleton variant='text' />
                </TableCell>
                <TableCell>
                  <Skeleton variant='text' />
                </TableCell>
                <TableCell>
                  <Skeleton variant='text' />
                </TableCell>
                <TableCell>
                  <Skeleton variant='text' />
                </TableCell>
                <TableCell>
                  <IconButton size='small'>
                    <EditIcon fontSize='small' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {data.map((value, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{value.nome}</TableCell>
                <TableCell>{value.nome_guerra}</TableCell>
                <TableCell>{value.email}</TableCell>
                <TableCell>{Moment(value.admissao).format("DD/MM/YYYY")}</TableCell>
                <TableCell>{(value.demissao && "Demitido") || "Empregado"}</TableCell>
                <TableCell>
                  <IconButton size='small' onClick={() => {
                    setEditingUser(value)
                    setAddDialogOpened(true)
                  }}>
                    <EditIcon fontSize='small' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SpeedDial
        ariaLabel={i18n.t('add')}
        className={classes.fab}
        icon={<AddIcon />}
        open={true}
        FabProps={{
          onClick: () => {
            setEditingUser(null)
            setAddDialogOpened(true)
          }
        }}>
        <SpeedDialAction
          icon={<SchoolIcon />}
          tooltipTitle={i18n.t('graduation')}
          onClick={() => {
            setGraduationDialogOpened(true)
          }} />

        <SpeedDialAction
          icon={<WorkIcon />}
          tooltipTitle={i18n.t('function')}
          onClick={() => {
            setFunctionDialogOpened(true)
          }} />
      </SpeedDial>
      <FormDialog
        open={addDialogOpened}
        user={editingUser}
        onClose={() => setAddDialogOpened(false)}
        onError={() => {
          setAddDialogOpened(false)
          setError(true)
          setErrorMessage(i18n.t('checkthedata'))
        }} />
      <FunctionFormDialog
        open={functionDialogOpened}
        onClose={() => setFunctionDialogOpened(false)}
        onError={() => {}} />
      <GraduationFormDialog
        open={graduationDialogOpened}
        user={editingUser}
        onClose={() => setGraduationDialogOpened(false)}
        onError={() => {
          setGraduationDialogOpened(false)
          setError(true)
          setErrorMessage(i18n.t('checkthedata'))
        }} />
      <Dialogs
        open={error}
        title={i18n.t('anerrorhasocurred')}
        description={errorMessage}
        onClose={() => setError(false)} />
    </Page>
  )
}

export default Guardas
