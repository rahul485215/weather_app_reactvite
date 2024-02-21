import React from 'react';
import WeatherDetails from './WeatherDetails';
import pageError from "./images/page_error.jpg"


const Error = ({error, loading, cityNotFound}) => {
 
  return (
    <>
      {loading && 
        <div className="loading-container">
        <div className='loading-message'>loading...</div></div>}
        
      {error && <div className="error-message">{error}</div>}
      
      {cityNotFound && (
        <div className="error-container">
          <div>
            <img src={pageError} alt="" className='error' />
          </div>
          <div className="city-not-found">City Not Found</div>
        </div>
      )}

      {!loading && !error&&!cityNotFound && <WeatherDetails />}
    </>
  );
};

export default Error;
