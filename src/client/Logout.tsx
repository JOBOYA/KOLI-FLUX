import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

//logout component 
const Logout: React.FC = () => {
    const navigate = useNavigate();
    try {
        axios.get("https://koli-flux.herokuapp.com/logout").then((_response) => {
            navigate("/");
        });
    } catch (error) {
        console.log(error);
    }
    return (
        <div >
            <button className="btn btn-primary" onClick={() => navigate("/login")}>
                Logout
            </button>

        </div>


    );
};
export default Logout;
