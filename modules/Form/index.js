import { Typography, TextField, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { Fragment } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
})

const Form = () => {
    const classes = useStyles()

    return ( 
        <Fragment>
            <Typography 
                variant="h4" 
                component="h2"
                color="textSecondary"
            >
                Daftar
            </Typography>
            <form noValidate autoComplete="off" >
                <TextField 
                variant="standard"
                label="Nama"
                className={classes.field}
                required
                />
                <TextField 
                variant="standard"
                label="Email"
                type="email"
                className={classes.field}
                required
                />
                <Button
                type="submit"
                variant="contained"
                endIcon={<KeyboardArrowRightIcon />}
                >
                Submit
                </Button>
            </form>
        </Fragment>
     );
}
 
export default Form;