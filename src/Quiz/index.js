import React, { useContext, useEffect, useState } from "react";
import { useEffectOnce, useLocation } from "react-use";
import Timer from "./Timer";
import quiz from "./quizes.js";
import Question from "./Question";
import { Redirect, useParams } from "react-router";
import "./index.css";
function Index() {
console.log(useLocation());
  let {sic,subjectCode} = useParams();
  let examNo = subjectCode[3];
  
  let data = quiz.CS6[examNo];


  const [state, setState] = useState(0);
  const [score, setScore] = useState(0);
  const [id, setid] = useState(0);
  const [seconds, setSeconds] = React.useState(300);

  const [timer, setTimer] = useState(0);
  const [qstate, setQstate] = useState([]);
  const [OptionStyle, setOptionStyle] = useState("");

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
        setTimer(1);
      
    }
  })

  useEffectOnce(() => {
    
    let tmp = [];
    let colortmp = [];
    let optiontmp = [];
    for (let i = 0; i < data.qn; i++) {
      tmp.push(0);
      colortmp.push("red");
      optiontmp.push(0);
    }
    setScore(tmp);
    setQstate(colortmp);
    setOptionStyle(optiontmp);


  });

  function handleClick(a, oid) {
    let arr = score;
    arr[id] = a;
    let col = qstate;
    col[id] = "green";

    let oarr = OptionStyle;
    oarr[id] = oid;
    setQstate(col);
    setScore(arr);
    setOptionStyle(oarr);
  }

  if (timer == 1) {
    return (
      <Redirect
        to={{
          pathname: "/res",
          state: { sic,score , subjectCode},
        }}
      />
    );
  }

  return (
    <div className="Q" >
      <div className="row" >
        <div className="grd row col-lg-5 ">
          {data.body.map((i) => {
            return (
              <div className="grdElm col-xs-2">
                <button
                  onClick={() => setid(i.id - 1)}
                  id={i.id - 1}
                  className={
                    qstate[i.id - 1] == "red"
                      ? " btn btn-danger"
                      : "  btn btn-success"
                  }
                >
                  {i.id}
                </button>
              </div>
            );
          })}
        </div>
        <div className="col-lg-2 col-xs-3 timr" >
          <Timer t={seconds} />
          <button className="btn btn-warning" onClick={() => setTimer(1)}>Finish Test</button>
        </div>
      </div>
      <div>
        <Question q={data.body[id].question} n={id + 1} />
      </div>
      <div>
        {data.body[id].options.map((i) => {
          return (
            <button
              onClick={() => {
                handleClick(i.value, i.oid);
              }}
              className={
                i.oid == OptionStyle[id]
                  ? "option btn btn-primary"
                  : "option btn btn-white"
              }
            >
              {i.body}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Index;
