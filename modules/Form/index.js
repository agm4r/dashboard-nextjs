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
import FormHelperText from '@mui/material/FormHelperText'

const phoneRegExp = '/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/'

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
  phone: yup 
    .string('Enter your phone') 
    .trim("No whitespace") 
    .matches(/^(^0)(\d{3,4}?){2}\d{3,4}$/g, "Nomor handphone tidak valid (Contoh valid: 085612341234, 081212341234).") 
    .required("Phone is required"),
  gender: yup
    .string()
    .required(),
  birth: yup
    .string()
    .required(),
  education: yup
    .string()
    .required()
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
  name: '',
  email: '',
  password: '',
  phone: '',
  gender: '',
  birth: '',
  education: ''
});

const handleChange = (event) => {
  console.log(event.target.value)
  setValue({...value, [event.target.name]: event.target.value})
  console.log(value)
  
}

const onSubmit = (event) => {
  event.preventDefault()
  console.table(value)
}

const formik = useFormik({
  initialValues: {
    name: value.name,
    email: value.email,
    password: value.password,
    phone: value.phone,
    gender: value.gender,
    birth: value.birth || null,
    education: value.education
  },
  validationSchema: validationSchema,
  onSubmit: (values) => {
    alert(JSON.stringify(values, null, 2))
    console.log(values)
  },
  validateOnChange: true,
  validateOnBlur: true
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

    <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>   
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
            id="phone"
            name="phone"
            label="phone"
            type="text"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            variant="standard" 
          />
        </Grid>
        {/* <Grid item xs={12}>
          <TextField 
            id="phone"
            name="phone"
            label="Phone"
            type="text"
            variant="standard"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            // error={console.log(formik.errors)}
            helpertext={formik.touched.phone && formik.errors.phone}
          />
        </Grid> */}
        <Grid item xs={12}>
          <FormLabel>Gender</FormLabel>
          <RadioGroup 
            row aria-label="gender" 
            id="gender"
            name="gender" 
            onChange={formik.handleChange}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          <FormHelperText error={formik.touched.gender && Boolean(formik.errors.gender)}>{formik.touched.gender && formik.errors.gender}</FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            id="birth"
            name="birth" 
            label="Birth Date"
            value={formik.values.birth}
            onChange={(newValue) => {
              const formatDate = moment(newValue).format('YYYY-MM-DD')
              console.log(formatDate)
              formik.setFieldValue('birth', formatDate)
              console.log(formik.values.birth)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <FormHelperText error={formik.touched.birth && Boolean(formik.errors.birth)}>{formik.touched.birth && formik.errors.birth}</FormHelperText>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            disablePortal
            id="education"
            name="education"
            label="Education" 
            key={formik.values.id}
            value={formik.values.education.label}
            onChange={(event, values) => formik.setFieldValue('education', values.id)} 
            options={pendidikan}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField  {...params} label="Education" />}
          />
          <FormHelperText error={formik.touched.education && Boolean(formik.errors.education)}>{formik.touched.education && formik.errors.education}</FormHelperText>
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