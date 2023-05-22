import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.delete("https://koliflux.onrender.com/logout");
           localStorage.removeItem("token");
            navigate("/", {replace: true});
        } catch (error) {
            console.log(error);
        }
    }
    

    return (
        <div>
            <button className="btn btn-primary" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Logout;
