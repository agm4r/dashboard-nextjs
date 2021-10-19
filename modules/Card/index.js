import { Box } from "@mui/system";
import CardImage from './CardImage'
import CardRating from "./CardRating";

const Card = () => {
    return ( 
        <Box>
            <CardImage />
            <CardRating />
        </Box>
     );
}
 
export default Card;