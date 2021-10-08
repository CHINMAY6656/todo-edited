import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../Header"
const axios = require("axios").default;
const qs = require("querystring");



function Registrartion() {
  const history = useHistory();
  const [sic, setSic] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [rPass, setRPass] = useState("");

  const [res, setRes] = useState()
  
  const [sicCheck, setSicChecker] = useState(false);
  const [nameChecker, setNameChecker] = useState(false);
  const [passChecker, setPassChecker] = useState(false);

  const [toggler, setToggler] = useState(true)

  useEffect(() => {
    
    if(sic.length==9 ){
      setSicChecker(true)
    }else{
      setSicChecker(false)
    }

    if (name.length > 0 && (/^[a-zA-Z\s]+$/.test(name))) {
      setNameChecker(true)
    }else{
      setNameChecker(false)
    }

    if (pass == rPass && pass.length>6) {
      setPassChecker(true);
    }else{
      setPassChecker(false)
    }
    //console.log(sicCheck);
  }, [sic,name,pass,rPass])


  async function handleReg(e) {
    e.preventDefault();
    setToggler(false);
    //console.log(sic,name,pass,rPass);
    try {
       await axios({
        method: "post",
        url: "https://quiz-backend-iwt.herokuapp.com/register",
        data: qs.stringify({
          sic: sic,
          password: pass,
          name: name
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
        .then(function (res) {
          if (res.data == "OK") {
            setRes("DONE...REDIRECTING");
            history.push("/");
          }else if(res.data == "AE"){
            setRes("ACCOUNT ALREADY EXISTS");
            setToggler(true)
          }else {
            setRes("ERROR PLEASE CHECK YOUR INFORMATION!")
            setToggler(true)
          }
        })
        .catch(function (error) {
          //console.log(error);
        });
    } finally {
    }
  }
  return (
    <div>
      <Header />
      <form onSubmit={handleReg} className="login">
        <div className="mb-3 ">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mb-3 ">
          <label htmlFor="exampleInputEmail1" className="form-label">
            SIC
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            value={sic}
            onChange={(e) => {
              setSic(e.target.value)
            }}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={rPass}
            onChange={(e) => {
              setRPass(e.target.value);
            }}
          />
        </div>
        <span style={{color:"red",textAlign:"center"}} >{res}</span>
        <button type="submit" disabled={!(sicCheck*nameChecker*passChecker*toggler)} className="btn loginbtn btn-success">
          Register
        </button>
      </form>
      <Link to="/" style={{ textDecoration: "none" }}>
        
        <button  className="btn btn-primary loginbtn">Login</button>
      </Link>
    </div>
  );
}

export default Registrartion;
