import React, { useState } from 'react'
import { Table, TableHead, TableRow, TableCell, Typography, makeStyles, TablePagination } from '@material-ui/core'


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
            backgroundColor: '#f5f8ff',
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
                        <TableCell align='center' key={headCell.id}>
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

    const handlePageChange = (event, newPage) => {
        setPage(newPage)
    }

    const handleRowsPerPageChange = event => {
        setRowsPerPage(parseInt(event.target.value,10))
        setPage(0)
    }

    const recordsAfterPagingAndSorting = () => {
        return records.slice(page*rowsPerPage, (page+1)*rowsPerPage)
    }

    const TblPagination = () => (<TablePagination
        component='div' 
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        count={records.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
    />)

    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }
}
