import { Grid, makeStyles, TextField } from '@material-ui/core'
import { Controls } from '../../Components/Controls/Controls'
import { React, useState } from 'react'
import { useForm, Form } from '../../Components/useForm'




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

    const isValidUrl = (_string) => {
        if (_string === "") return true;

        let url_string; 
        try {
          url_string = new URL(_string);
        } catch (_) {
          return false;  
        }
        return url_string.protocol === "http:" || url_string.protocol === "https:";
      }


    const validate = () => {
        let temp = {}

        temp.companyName = values.companyName ? "" : "This field is required."
        temp.position = values.position ? "" : "This field is required."
        temp.websiteLink = isValidUrl(values.websiteLink)  ? "" : "Enter a valid link."
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "");
    }

    const [errors, setErrors] = useState({})
    
    const {
        values,
        setValues,
        resetForm,
        handleInputChange,
    } = useForm(initialFValues)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate())
            window.alert("Valid Form")
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input 
                        variant='outlined'
                        label='Company Name'
                        name='companyName'
                        value={ values.companyName }
                        onChange={handleInputChange}
                        error={errors.companyName}
                    />
                    <Controls.Input 
                        variant='outlined'
                        label='Position'
                        name='position'
                        value={ values.position }
                        onChange={ handleInputChange }
                        error={errors.position}
                    />
                    <Controls.Input 
                        variant='outlined'
                        label='Website Link'
                        name='websiteLink'
                        value={ values.websiteLink }
                        onChange={ handleInputChange }
                        error={errors.websiteLink}
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
                    <div>
                        <Controls.Button 
                        type='submit'
                        text='Add' />   

                        <Controls.Button 
                        text="Reset"
                        color="default"
                        onClick={() => resetForm(setErrors)}/>
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
