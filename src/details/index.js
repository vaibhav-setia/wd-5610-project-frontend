import NavBar from "../nav";
import { useParams } from "react-router-dom";
// import MyComponent from "./my-connect";
import ReviewPopUp from "./review-popup";

const Details=()=>{
    let { ID } = useParams();
    return(
        <div >
       <NavBar />
       <ReviewPopUp id={ID} />
       
       </div>
    );
};
export default Details;