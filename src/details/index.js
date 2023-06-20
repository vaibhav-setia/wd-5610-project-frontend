import NavBar from "../nav";
import { useParams } from "react-router-dom";
import MyComponent from "./my-connect";

const Details=()=>{
    let { ID } = useParams();
    return(
        <div >
       <NavBar />
       <MyComponent id={ID} />
       
       </div>
    );
};
export default Details;