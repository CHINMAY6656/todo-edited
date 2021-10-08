import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffectOnce } from "react-use";
const axios = require("axios").default;
const qs = require("querystring");


function Index() {
  const [s, setS] = useState(0);
  let l = useLocation();

  const [res, setRes] = useState();
  const [Show, setShow] = useState(0);

  useEffectOnce(() => {
    let res = l.state.score;
    let wr = 0;
    let cc = 0;
    res.forEach((i) => {
      if (i == 0) {
        wr += 1;
      } else {
        cc += 1;
      }
    });
    setRes({ correct: cc, wromg: wr });
    setS(cc);
    try {
      const response =  axios({
        method: "post",
        url: "https://quiz-backend-iwt.herokuapp.com/score",
        data: qs.stringify({
          sic:l.state.sic,
          subjectCode : l.state.subjectCode,
          fullMark : 5,
          scoredMark : cc
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
        .then(function (res) {
         console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    } finally {
    }
  });

  return (
    <div>
      <br/>
      <br/>
      <button
      
      className="btn btn-success"
      style={{ display: "block", margin: "auto" }}
        onClick={() => {
          setShow(!Show);
        }}
      >
        Show Result
      </button>
      <br/>
      {Show == 0 ? (
        <span></span>
      ) : (
        <div  style={{textAlign:"center" }}>
          <br/>
          <h1>Correct : {res.correct}</h1>
          <h1>Wrong : {res.wromg}</h1>
          <h1>Score : {s}</h1>
          <br/>
        </div>
      )}
      <h6 style={{color:'red',textAlign:"center"}} >⚠YOU WONT BE ABLE SEE THE RESULT ONCE YOU GO HOME</h6>
      <button
      className="btn btn-primary"
      style={{ display: "block", margin: "auto" }}
        onClick={() => {
          window.close();
        }}
      >
        Go Home
      </button>
    </div>
  );
}

export default Index;
