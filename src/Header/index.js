import React from "react";

function Header() {
  return (
    <div>
      <div className="row head">
        <div className="col-lg-9 col-md-12 coll" style={{padding:"2.5rem"}}>
          <h1>SILICON INSTITUTE OF TECHNOLOGY</h1>
          <h3>Bhubaneswar , Odisha</h3>
        </div>
        <div className="col-lg-3 col-sm-12 coll" style={{float:"right"}}>
          <img src="./logo.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Header;
