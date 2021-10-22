import { useState } from 'react'
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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { makeStyles } from '@material-ui/core/styles';
import { Fragment } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import moment from 'moment'
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup
    .string('Enter your email')
    .required('Name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
})

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

const Form = () => {
const classes = useStyles()

const [value, setValue] = useState({
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  gender: "",
  birth: "",
  education: ""
});

const handleChange = (event) => {
  console.log(event.target.value)
  setValue({...value, [event.target.name]: event.target.value})
  
}

const onSubmit = (event) => {
  event.preventDefault()
  console.table(value)

  alert(JSON.stringify(value))
}

const formik = useFormik({
  initialValues: {
    name: '',
    email: '',
    password: '',
  },
  validationSchema: validationSchema,
  onSubmit: (values) => {
    alert(JSON.stringify(values, null, 2))
  }
})  

return ( 
  <Fragment>
    <Typography 
      variant="h4" 
      component="h2"
      color="textSecondary"
    >
        Sign Up
    </Typography>

    <form noValidate autoComplete="off" onSubmit={formik.handleSubmit && onSubmit}>   
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <TextField 
            id="name"
            name="name"
            label="Name"
            variant="standard"
            placeholder="Your Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            variant="standard"
            placeholder="youremail@example.com"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            variant="standard"
            placeholder="*******"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            onChange={handleChange}
            variant="standard"
            type="number"
            placeholder="123-45-678" 
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel>Gender</FormLabel>
          <RadioGroup row aria-label="gender" name="gender" onChange={handleChange}>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            id="birth"
            name="birth" 
            label="Birth Date"
            value={value.birth}
            onChange={(newValue) => {
              const formatDate = moment(newValue).format('YYYY-MM-DD')
              console.log(moment(newValue).format('YYYY-MM-DD'))
              setValue({...value, 'birth': formatDate})
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            disablePortal
            id="education"
            name="education"
            label="Education" 
            onChange={(event, values) => setValue({...value, 'education': values.id})} 
            options={pendidikan}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField  {...params} label="Education" />}
          />
        </Grid>
        <Grid item xs={12}>
        <Button
          type="submit"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
        </Grid>
      </Grid>      
    </form>

  </Fragment>
  );
}
 
export default Form;

const pendidikan = [
  { id: 1, label: 'SD', },
  { id: 2, label: 'SMP', },
  { id: 3, label: 'SMA/SMK', },
  { id: 4, label: 'S1', },
  { id: 5, label: 'S2', },
  { id: 6, label: 'S3', },
]