import { Grid } from "@mui/material";
import Chart from './Chart'
import RecentDeposits from "./RecentDeposits";
import RecentOrders from './RecentOrders'

const Dashboard = () => {
	return ( 
			<Grid container spacing={3}>
				<Chart />
				<RecentDeposits />
				<RecentOrders />
			</Grid>
		);
}
 
export default Dashboard;