import React, {useState, useEffect} from 'react'
import {
  makeStyles,
  Typography,
  Paper,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
} from '@material-ui/core'
import {
  SpeedDial,
  SpeedDialAction,
} from '@material-ui/lab'
import {
  Add as AddIcon,
  ViewModule as ViewModuleIcon,
} from '@material-ui/icons'

import i18n from '../../lang'
import {Provider} from './provider'
import {Page} from '../../components'
import {
  FormDialog,
  TipoDeArmaDialog,
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
  title: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
}))

const Armas = () => {
  const classes = useStyles()
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showTipoDeArmaDialog, setShowTipoDeArmaDialog] = useState(false)
  const [armas, setArmas] = useState([])
  const [tipos, setTipos] = useState([])

  useEffect(() => {
    (async () => {
      const {data} = await Provider.getArmas()
      setArmas(data)
    })()
  }, [])
  
  useEffect(() => {
    (async () => {
      try {
        const {data} = await Provider.getTiposDeArmas()
        setTipos(data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <Page title={i18n.t('guns')}>
      <div>
        {(armas.length === 0 && (
          <Typography>Não há dados para ser exibido</Typography>
        )) || (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Modelo</TableCell>
                  <TableCell>Marca</TableCell>
                  <TableCell>Calibre</TableCell>
                  <TableCell>Tipo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {armas.map(({modelo, marca, calibre, tipo_arma_id}, index) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{modelo}</TableCell>
                    <TableCell>{marca}</TableCell>
                    <TableCell>{calibre}</TableCell>
                    <TableCell>{tipos.find(({id}) => id === tipo_arma_id)?.descricao}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Typography
          className={classes.title}
          color='primary'
          variant='h4'>
          Tipos de armas
        </Typography>
        
        {(tipos.length === 0 && (
          <Typography>Não há dados para ser exibido</Typography>
        )) || (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Nome</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tipos.map(({descricao}, index) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{descricao}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

      <SpeedDial
        ariaLabel={i18n.t('add')}
        className={classes.fab}
        icon={<AddIcon />}
        open={true}
        FabProps={{
          onClick: () => {
            setShowAddDialog(true)
          },
        }}>
        <SpeedDialAction
          icon={<ViewModuleIcon />}
          tooltipTitle={i18n.t('guntype')}
          onClick={() => {
            setShowTipoDeArmaDialog(true)
          }} />
      </SpeedDial>
      <FormDialog
        open={showAddDialog}
        onClose={() => {
          setShowAddDialog(false)
          window.location.reload()
        }} />
      <TipoDeArmaDialog
        open={showTipoDeArmaDialog}
        onClose={() => {
          setShowTipoDeArmaDialog(false)
          window.location.reload()
        }} />
    </Page>
  )
}

export default Armas
