import { Grid, Paper } from "@mui/material";
import ComponentOrders from './ComponentOrders'
const RecentOrders = () => {
    return ( 
        <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <ComponentOrders />
            </Paper>
        </Grid>
     );
}
 
export default RecentOrders;