import React, { createContext, useContext, useState } from "react";
import { useLocation } from "react-router";
import ProfileStrip from "./profileStrip";

const axios = require("axios").default;
const qs = require("querystring");


function Index(props) {
  const l = useLocation();
  const [Acc, setAcc] = useState(l.state.detail);
  const [toggler, setToggler] = useState(0);
  const [dis, setDis] = useState(false)
//console.log(l.state);
  function setDetailsAgain() {

    try {
      const response =  axios({
        method: "post",
        url: "https://quiz-backend-iwt.herokuapp.com/login",
        data: qs.stringify({
          sic: l.state.sic,
          password: l.state.password,
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
        .then(function (res) {

          setAcc(res.data);
          //console.log(res);
          
        })
        .catch(function (error) {});
    } finally {
    }
  }
  if (toggler) {
    return(
      <h1>WAIT A WHILE</h1>
    )
  }

  return (
    <div>
      <ProfileStrip name={Acc.name} />
      <div>
        <button
          className="btn btn-success"
          style={{display:"block",margin:"1rem auto"}}
          onClick={() => {
            setDetailsAgain()
            setToggler(1)
            setTimeout(() => {
              setDis(false)
              setToggler(0)
            }, 1000);
          }}
        >
          REFRESH
        </button>
        <h6 style={{color:"red",textAlign:"center"}}>{dis==true?"PLEASE REFRESH":" "}</h6>
      </div>
      <div className="dash">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">SUBJECT</th>
              <th scope="col">LINK</th>
            </tr>
          </thead>
          <tbody>
            {Acc.quizScores.map((i) => {
              if (i.scoredMark == null) {
                return (
                  <tr>
                    <td>{i.subjectCode}</td>
                    <td>{i.subjectName}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        disabled={dis}
                        onClick={() => {
                          setDis(true)
                          window.open(
                            "/dash/quiz/" + Acc.sic + "/" + i.subjectCode,
                            "mywindow",
                            "status=1,toolbar=0"
                          );
                        }}
                      >
                        Attempt
                      </button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Index;
