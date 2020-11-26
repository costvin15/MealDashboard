import React, {useState, useEffect} from 'react'
import {
  makeStyles,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
} from '@material-ui/core'
import {
  SpeedDial,
} from '@material-ui/lab'
import {
  Add as AddIcon,
} from '@material-ui/icons'

import i18n from '../../lang'
import {Provider} from './provider'
import {Page} from '../../components'
import {
  FormDialog,
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

const Equipamentos = () => {
  const classes = useStyles()
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [equipamentos, setEquipamentos] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const {data} = await Provider.getEquipamentos()
        setEquipamentos(data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <Page title={i18n.t('equipments')}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Estoque</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipamentos.map(({descricao, estoque}, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{descricao}</TableCell>
                <TableCell>{estoque}</TableCell>
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
            setShowAddDialog(true)
          },
        }}>
      </SpeedDial>
      <FormDialog
        open={showAddDialog}
        onClose={() => {
          setShowAddDialog(false)
          window.location.reload()
        }} />
    </Page>
  )
}

export default Equipamentos
