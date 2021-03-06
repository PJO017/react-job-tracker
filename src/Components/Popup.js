import React from 'react'
import { Dialog, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import {Controls} from '../Components/Controls/Controls' 

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        paddingTop: theme.spacing(1),
        position: 'absolute',
    },
    dialogTitle: {
        paddingRight: '15px'
    }
}))

export const Popup = props => {
    const { title, children, openPopup, setOpenPopup } = props
    const classes = useStyles()


    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper:classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{display: "flex"}}>
                    <Typography variant='h6' component='div' style={{flexGrow: 1}}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        color='secondary'
                        onClick={() => setOpenPopup(false)}
                    >
                        <CloseIcon/>
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
