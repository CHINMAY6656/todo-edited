import React from 'react';
import { useHistory } from 'react-router';
import "./index.css";
function ProfileStrip(props) {
    const history = useHistory();
    return (
        <div className="strip">
            <div  className="name ">
                <h3 >{props.name}</h3>
            </div>
            <div  className="logout ">
                <button onClick={()=>{history.push("/")}} className="logoutbtn btn btn-danger" >Logout</button>
            </div>
        </div>
    )
}

export default ProfileStrip
