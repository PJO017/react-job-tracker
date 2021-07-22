import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 1000,
        backgroundColor: 'white'
    },

    paper: {
        backgroundColor: '#546b8f',
        
    }
})

const createData = (id, company_name, position, website_link, date_applied, status, interview_date) => {
    return { id, company_name, position, website_link, date_applied, status, interview_date }
}

const rows = [
    createData(1, 'Tesla', 'Application Engineer', 'website', '7/20/2021', 'Pending', 'N/a'),
    createData(2, 'Tesla', 'Application Engineer', 'website', '7/20/2021', 'Pending', 'N/a'),
    createData(3, 'Tesla', 'Application Engineer', 'website', '7/20/2021', 'Pending', 'N/a')
]

export const AppsTable = () => {

    const classes = useStyles();

    return (
        <TableContainer component={Paper} className={classes.paper}>
            <Table className={ classes.table }>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell aling='right'>Company Name</TableCell>
                        <TableCell aling='right'>Position</TableCell>
                        <TableCell aling='right'>Website Link</TableCell>
                        <TableCell aling='right'>Date Applied</TableCell>
                        <TableCell aling='right'>Status</TableCell>
                        <TableCell aling='right'>Interview Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                     {rows.map((row) => (
                        <TableRow key={ row.id }>
                            <TableCell component="th" scope="row" >{row.id}</TableCell>
                            <TableCell aling='right'>{row.company_name}</TableCell>
                            <TableCell aling='right'>{row.position}</TableCell>
                            <TableCell aling='right'>{row.website_link}</TableCell>
                            <TableCell aling='right'>{row.date_applied}</TableCell>
                            <TableCell aling='right'>{row.status}</TableCell>
                            <TableCell aling='right'>{row.interview_date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table> 
        </TableContainer>
    )
}
