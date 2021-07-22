import React from 'react'
import { FormControl, FormLabel, MenuItem, NativeSelect as MuiSelect} from '@material-ui/core';


export const Select = (props) => {
    const { name, label, value, onChange, items } = props;

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiSelect
            name={name}
            value={value}
            onChange={onChange}
            >
                {
                    items.map(
                        (item, index) => (
                        <option value={item.id}>{item.title}</option>
                        )
                    )
                }
            </MuiSelect>
        </FormControl>
    )
}
