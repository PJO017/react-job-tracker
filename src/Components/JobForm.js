import { Grid } from '@material-ui/core'
import { Controls } from './Controls/Controls'
import { React, useState, useEffect } from 'react'
import { useForm, Form } from './useForm'



// Initial form values
const initialFValues = {
    id: 0,
    companyName: '',
    position: '',
    websiteLink: '',
    dateApplied: new Date(),
    status: 'Applied',
    interviewDate: new Date() ,
}

// List of status the a job can have
const statusItems = [
    {id:'applied', title:'Applied'},
    {id:'interview', title:'Interview'},
    {id:'offer', title:'Offer'},
    {id:'noOffer', title:'No Offer'},
    {id:'noContact', title:'No Contact'}
]


export const JobForm = (props) => {

    // Check if website link is valid
    const isValidUrl = (_string) => {

        let url_string; 
        try {
          url_string = new URL(_string);
        } catch (_) {
          return false;  
        }
        return url_string.protocol === "http:" || url_string.protocol === "https:";
      }

    // Validate form values
    const validate = () => {
        let temp = {}

        temp.companyName = values.companyName ? "" : "This field is required."
        temp.position = values.position ? "" : "This field is required."
        temp.websiteLink = isValidUrl(values.websiteLink)  ? "" : "Enter a valid link."
        
        // Get any errors in the form
        setErrors({
            ...temp
        })

        // If every value in temp is "" then the form is valid
        return Object.values(temp).every(x => x === "");
    }

    // Validate form and submit data to firestore
    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm) 
        } 
    }


    useEffect(() => {
        if (jobToEdit) {
            setValues({
                ...jobToEdit,
                dateApplied: jobToEdit.dateApplied.toDate(), 
                interviewDate: jobToEdit.interviewDate.toDate()
            })
        }
    }, [])

    // Form Component
    const {
        values,
        setValues,
        resetForm,
        handleInputChange,
    } = useForm(initialFValues)

    const [errors, setErrors] = useState({})
    const { addOrEdit, jobToEdit } = props

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
                        text={jobToEdit === null ? 'Add' : 'Edit'} />   

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
