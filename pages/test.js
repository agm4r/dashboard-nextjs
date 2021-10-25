import React from "react";
import { 
  Typography, 
  TextField, 
  Button, 
  FormLabel, 
  FormControlLabel, 
  Radio, 
  RadioGroup, 
  Autocomplete,
  Grid
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText'
import * as yup from 'yup'

const validationSchema = yup.object({
  title: yup
    .string()
    .min(2)
    .required()
})

const test = () => {
  const formik = useFormik({
    initialValues: {
      hobbies: []
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
    validateOnChange: true,
    validateOnBlur: true
  })
  return ( 
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Autocomplete
          multiple
          id="hobbies"
          name ="hobbies"
          label ="hobbies"
          value={formik.values.hobbies || []}
          options={hobbies}
          onChange={(event, value) => {
            formik.setFieldValue('hobbies', value)
            console.log(formik.values)}
          }
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Multiple values"
              placeholder="Favorites"
            />
          )}
        />
         <FormHelperText error={formik.touched.title && Boolean(formik.errors.title)}>{formik.touched.title && formik.errors.title}</FormHelperText>
        <Button
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </form>
    </div>
   );
}
 
export default test;

const hobbies = [
  {id: 1, title: "WATCHING MOVIE" },
  {id: 2, title: "SPORTS" },
  {id: 3, title: "MUSIC" },
  {id: 4, title: "DRAWING" }
];