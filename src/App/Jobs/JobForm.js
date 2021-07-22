import { Grid, makeStyles, TextField } from '@material-ui/core'
import { Controls } from '../../Components/Controls/Controls'
import { React } from 'react'
import { useForm, Form } from '../../Components/useForm'
import { DatePicker } from '@material-ui/pickers'



const initialFValues = {
    id: 0,
    companyName: '',
    position: '',
    websiteLink: '',
    dateApplied: new Date(),
    status: 'applied',
    interviewDate: new Date() ,
}

const statusItems = [
    {id:'applied', title:'Applied'},
    {id:'interview', title:'Interview'},
    {id:'offer', title:'Offer'},
    {id:'noOffer', title:'No Offer'},
    {id:'noContact', title:'No Contact'}
]

export const JobForm = () => {
    
    const {
        values,
        setValues,
        handleInputChange,
    } = useForm(initialFValues)

    return (
        <Form>
            <Grid container>
                <Grid item xs={6}>
                    <TextField 
                        variant='outlined'
                        label='Company Name'
                        name='companyName'
                        value={ values.companyName }
                        onChange={handleInputChange}
                    />
                    <TextField 
                        variant='outlined'
                        label='Position'
                        name='position'
                        value={ values.position }
                        onChange={ handleInputChange }
                    />
                    <TextField 
                        variant='outlined'
                        label='Website Link'
                        name='websiteLink'
                        value={ values.websiteLink }
                        onChange={ handleInputChange }
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.DatePicker 
                        name="dateApplied"
                        label="Date Applied"
                        value={values.dateApplied}
                        onChange={handleInputChange}
                    />
                    <Controls.Select
                        name="status"
                        label="Status"
                        value={values.status}
                        onChange={handleInputChange}
                        items={statusItems}
                    />
                    {values.status !== 'interview' || 
                    <Controls.DatePicker 
                        name="interviewDate"
                        label="Interview Date"
                        value={values.interviewDate}
                        onChange={handleInputChange}
                    />}
                </Grid>
            </Grid>
        </Form>
    )
}
