import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
const Error400 = () => {
  return (
    <Fragment>
      <div className="page-wrapper">
        {/* <!-- error-400 start--> */}
        <div className="error-wrapper">
          <div className="container">
            <div className="error-heading">
              <h2 className="headline font-info">{"400"}</h2>
            </div>
            <div className="col-md-8 offset-md-2">
              <p className="sub-content">{"The page you are attempting to reach is currently not available. This may be because the page does not exist or has been moved."}</p>
            </div>
            <div><Link to={`/`} className="btn btn-info-gradien"> Back to home page</Link></div>
          </div>
        </div>
        {/* <!-- error-400 end--> */}
      </div>
    </Fragment>
  );
};

export default Error400;
