import React from 'react'
import { useLocation } from 'react-router-dom'

export default function BlogSinglePage() {

  const location = useLocation();
  console.log(location);
  return (
    <div className='container-fluid'>
      <div className="row mt-2">
        <img style={{ width: '100vw', height: '450px' }} src={location.state.details.urlToImage} alt="article related pic" />
        <div className="col-md-12">
          <div className='mt-2'>
            <h3>{location.state.details.title}</h3>
            <p>{location.state.details.description}</p>
          </div>
        </div>
      </div>

    </div>
  )
}
