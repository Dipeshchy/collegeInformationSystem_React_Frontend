import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function NotFound(props){
    return(
        <div style={{marginTop: '300px', marginLeft: '700px'}}>
            <h1 className="text-danger">Oops!! Page not found.</h1>
            <div className="row text-center mt-3 ml-5">
                <div className="text-center ml-5">
                    <Link to="/" className="btn btn-lg btn-primary">Home</Link>
                </div>
                <div className="ml-5">
                    <button onClick={props.history.goBack} className="btn btn-lg btn-secondary">Back</button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(NotFound)