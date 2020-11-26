import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core'

import i18n from '../../lang'

const Dialogs = ({open, onClose, title, description}) => (
  <Dialog open={open}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {description}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>
        {i18n.t('close')}
      </Button>
    </DialogActions>
  </Dialog>
)

export default Dialogs
