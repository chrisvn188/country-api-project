import React from 'react'
import './CountryCard.css'

export default function CountryCard({ country }) {
  return (
    <li className='country'>
      <img src={country.flags.svg} alt={`${country}'s flags`} />
      <div className='info'>
        <h3>{country.name.common}</h3>
        <p>
          <span className='fw-semi-bold'>Population:</span>
          <span className='fw-light ml-sm'>{country.population}</span>
        </p>
        <p>
          <span className='fw-semi-bold'>Region:</span>
          <span className='fw-light ml-sm'>{country.region}</span>
        </p>
        <p>
          <span className='fw-semi-bold'>Capital:</span>
          <span className='fw-light ml-sm'>{country.capital}</span>
        </p>
      </div>
    </li>
  )
}
