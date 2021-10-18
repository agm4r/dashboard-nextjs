import { Grid, Paper } from "@mui/material";
import ComponentDeposits from './ComponentDeposits'

const RecentDeposits = () => {
    return ( 
        <Grid item xs={12} md={4} lg={3}>
            <Paper
                sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                }}
            >
                <ComponentDeposits />
            </Paper>
        </Grid>
     );
}
 
export default RecentDeposits;