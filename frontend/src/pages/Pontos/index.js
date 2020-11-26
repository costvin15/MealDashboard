import React, {useState, useEffect} from 'react'
import {
  Fab,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TablePagination,
  makeStyles,
  IconButton,
} from '@material-ui/core'
import {
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Done as DoneIcon,
} from '@material-ui/icons'
import Moment from 'moment'

import i18n from '../../lang'
import {FormDialog} from './components'
import {Page, Dialogs} from '../../components'
import {Provider} from './provider'

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  dateListToolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

const Pontos = () => {
  const classes = useStyles()
  const [error, setError] = useState(false)
  const [selectedDate, setSelectedDate] = useState(Moment.now())
  const [addDialogOpened, setAddDialogOpened] = useState(false)
  const [dialogDepatureOptions, setDialogDepatureOptions] = useState(false)
  const [selectedId, setSelectedId] = useState(0)
  const [data, setData] = useState({})
  const [page, setPage] = useState(0)

  useEffect(() => {
    (async () => {
      const result = await Provider.fetchData(selectedDate, page + 1)
      setData(result)
    })()
  }, [selectedDate, page])

  return (
    <Page title={i18n.t('timerecord')}>
      <>
        <Paper className={classes.dateListToolbar}>
          <Fab onClick={() => {
            setSelectedDate(Moment(selectedDate).subtract(1, 'days'))
          }}>
            <ArrowBackIcon />
          </Fab>
          <Typography>
            {Moment(selectedDate).format("DD/MM/YYYY")}
          </Typography>
          <Fab
            onClick={() => {
              const newDate = Moment(selectedDate).add(1, 'days')
              if (newDate.isBefore(Moment())) {
                setSelectedDate(newDate)
              }
            }}
            disabled={Moment().isSame(selectedDate, 'days')}>
            <ArrowForwardIcon />
          </Fab>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Guarda</TableCell>
                <TableCell>Entrada</TableCell>
                <TableCell>Saída</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data?.map((value, index) => (
                <TableRow key={index}>
                  <TableCell></TableCell>
                  <TableCell>{value.email}</TableCell>
                  <TableCell>{`${Moment(value.data_entrada).format("DD/MM/YYYY")} ${value.hora_entrada}`}</TableCell>
                  <TableCell>{value.data_saida ? `${Moment(value.data_saida).format("DD/MM/YYYY")} ${value.hora_saida}` : 'Não registrado'}</TableCell>
                  <TableCell>
                    {(value.data_saida && (
                      <IconButton disabled>
                        <DoneIcon />
                      </IconButton>
                    )) || (
                      <IconButton onClick={async () => {
                        setSelectedId(value.id)
                        setDialogDepatureOptions(true)
                        setAddDialogOpened(true)
                      }}>
                        <DoneIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPage={10}
                  rowsPerPageOptions={[]}
                  count={data?.count}
                  page={page}
                  onChangePage={(event, page) => {
                    setPage(page)
                  }} />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </>
      <Fab
        variant='extended'
        color='primary'
        className={classes.fab}
        onClick={() => {
          setAddDialogOpened(true)
        }}>
        <AddIcon />
        {i18n.t('add')}
      </Fab>
      <Dialogs
        open={error}
        title={i18n.t('anerrorhasocurred')}
        description={i18n.t('checkyourinternet')}
        onClose={() => setError(false)} />
      <FormDialog
        id={selectedId}
        isDepature={dialogDepatureOptions}
        open={addDialogOpened}
        onClose={() => {
          setAddDialogOpened(false)
          setDialogDepatureOptions(false)
        }} />
    </Page>
  )
}

export default Pontos
