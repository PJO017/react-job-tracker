import React, { useState } from 'react'
import { Table, TableHead, TableRow, TableCell, Typography, makeStyles } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(1),
        '& thead th': {
            fontWeight: 600,
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light
        },
        '& tbody td': {
            fontWeight: 300,
        },
        '&  tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer'
        }
    }
}))

export const useTable = (records, headCells) => {

    const classes = useStyles()

    const pages = [5, 10, 15]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
  
  

    const TblContainer = props => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

    const TblHead = props => (
        <TableHead>
            <TableRow>
                {
                    headCells.map(headCell => 
                        (
                        <TableCell align='left' key={headCell.id}>
                            {
                                <Typography>{headCell.label}</Typography>
                            }
                        </TableCell>
                        )
                        )
                }
            </TableRow>
        </TableHead>
    )

    return {
        TblContainer,
        TblHead
    }
}
