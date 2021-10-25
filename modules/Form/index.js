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
    .required(),
  hobbies: yup
    .array()
    .min(5)
    .required(),
  movies: yup
    .array()
    .min(2)
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
    education: '',
    hobbies: '',
    movies: ''
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
      birth: value.birth,
      education: value.education,
      hobbies: [],
      movies: []
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
            value={formik.values.education.label}
            onChange={(event, values) => {
              formik.setFieldValue('education', values.id)
            }} 
            options={pendidikan}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField  {...params} label="Education" />}
          />
          <FormHelperText error={formik.touched.education && Boolean(formik.errors.education)}>{formik.touched.education && formik.errors.education}</FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            id="hobbies"
            name ="hobbies"
            label ="hobbies"
            value={formik.values.hobbies || []}
            options={hobbies}
            onChange={(event, value) => {
              formik.setFieldValue('hobbies', value)
              console.log(formik.values.hobbies)}
            }
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Hobbies"
                placeholder="Favorites"
              />
            )}
          />
          <FormHelperText error={formik.touched.hobbies && Boolean(formik.errors.hobbies)}>{formik.touched.hobbies && formik.errors.hobbies}</FormHelperText>   
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            id="movies"
            name ="movies"
            label ="movies"
            value={formik.values.movies || []}
            options={top100Films}
            onChange={(event, value) => {
              formik.setFieldValue('movies', value)
              console.log(formik.values.movies)}
            }
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Fav Movies"
                placeholder="Favorites"
              />
            )}
          />
          <FormHelperText error={formik.touched.movies && Boolean(formik.errors.movies)}>{formik.touched.movies && formik.errors.movies}</FormHelperText>   
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

const hobbies = [
  {id: 1, title: "WATCHING MOVIE" },
  {id: 2, title: "SPORTS" },
  {id: 3, title: "MUSIC" },
  {id: 4, title: "DRAWING" },
  {id: 5, title: "ART" },
  {id: 6, title: "GAME" },
  {id: 7, title: "E SPORTS" },
];

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  {
    title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  {
    title: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  {
    title: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];