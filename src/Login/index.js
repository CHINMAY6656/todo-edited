import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Header from "../Header"
const axios = require("axios").default;
const qs = require("querystring");


function Login() {
  const [sic, setSic] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState();
  const [Success, setSuccess] = useState("");
  const [detail, setdetail] = useState("");
  const [toggler, setToggler] = useState(false)

  async function handleLogin(e) {
    e.preventDefault();
    setToggler(true);
    try {
      const response = await axios({
        method: "post",
        url: "https://quiz-backend-iwt.herokuapp.com/login",
        data: qs.stringify({
          sic: sic,
          password: password,
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
        .then(function (res) {
          if (res.data == "NA") {
            setErrMsg("Account Not Found");
            setToggler(false);
          } else if (res.data == "WP") {
            setErrMsg("Wrong Password");
            setToggler(false);
          } else {
            setdetail(res.data);
            //console.log(Acc);
            setSuccess("Succes!");
          }
        })
        .catch(function (error) {
          //onsole.log(error);
        });
    } finally {
    }
  }
  if (Success == "Succes!") {
    
    return <Redirect to={{
      pathname: "/dash",
      state: { detail ,sic,password}
    }} />;
  }
  return (
    <div>
      <Header />
      <form onSubmit={handleLogin} className="login">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            SIC
          </label>
          <input
            value={sic}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            onChange={(e) => {
              setSic(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={password}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn loginbtn btn-primary" disabled={toggler} >
          Login
        </button>
      </form>
      <div>
        <span
          style={{
            color: "red",
            textAlign: "center",
            display: "block",
            margin: "auto",
          }}
        >
          {errMsg}
        </span>
        <span
          style={{
            color: "green",
            textAlign: "center",
            display: "block",
            margin: "auto",
          }}
        >
          {Success}
        </span>
      </div>

      <Link to="/reg" style={{ textDecoration: "none" }}>
        <button className="btn btn-warning loginbtn">Registeration</button>
      </Link>
    </div>
  );
}

export default Login;
