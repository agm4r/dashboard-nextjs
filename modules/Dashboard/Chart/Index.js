import { Grid, Paper } from "@mui/material";
import ComponentChart from './ComponentChart'

const Chart = () => {
    return ( 
        <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <ComponentChart />
        </Paper>
      </Grid>
     );
}
 
export default Chart;