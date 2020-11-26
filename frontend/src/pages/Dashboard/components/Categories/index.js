import React from 'react'
import {
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core'
import {ExpandMore as ExpandMoreIcon} from '@material-ui/icons/'

const Categories = ({categories = [], renderItem: Item = () => <></>}) => {
  return (
    <div>
      {categories.map((category, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{category.strCategory}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Item id={category.strCategory} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}

export default Categories
