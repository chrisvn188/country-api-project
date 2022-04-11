import React, { useEffect, useState } from 'react'
import './DetailsPage.css'
import { useParams, Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

export default function DetailsPage() {
  const { name } = useParams()
  const [country, setCountry] = useState(null)

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then(res => res.json())
      .then(json => setCountry(json[0]))
  }, [name])

  return (
    <div className='details'>
      <div className='container'>
        <Link to='/' className='go-back-link'>
          <BsArrowLeft />
          Back
        </Link>
        {country && (
          <div className='country-details'>
            <div className='flag-container'>
              <img
                className='flag'
                src={country.flags.svg}
                alt={`${country.name.common}'s flag`}
              />
            </div>
            <div className='country-info'>
              <h3 className='country-name'>{country.name.common}</h3>
              <div className='info-body'>
                <div className='main-details'>
                  <p>
                    <span className='fw-semi-bold'>Native name: </span>
                    <span>
                      {Object.values(country.name.nativeName)[0].common}
                    </span>
                  </p>
                  <p>
                    <span className='fw-semi-bold'>Population: </span>
                    <span>{country.population}</span>
                  </p>
                  <p>
                    <span className='fw-semi-bold'>Region: </span>
                    <span>{country.region}</span>
                  </p>
                  <p>
                    <span className='fw-semi-bold'>Sub Region: </span>
                    <span>{country.subregion}</span>
                  </p>
                  <p>
                    <span className='fw-semi-bold'>Capital: </span>
                    <span>{country.capital}</span>
                  </p>
                </div>
                <div className='extra-details'>
                  <p>
                    <span className='fw-semi-bold'>Top level domain: </span>
                    <span>{country.tld}</span>
                  </p>
                  <p>
                    <span className='fw-semi-bold'>Currencies: </span>
                    {Object.values(country.currencies)
                      .map(currency => currency.name)
                      .join(',')}
                  </p>
                  <p>
                    <span className='fw-semi-bold'>Languages: </span>
                    {Object.values(country.languages)
                      .map(language => language)
                      .join(', ')}
                  </p>
                </div>
              </div>
              <div className='border-countries'>
                <h4>Border Countries</h4>
                <ul className='border-countries-list'>
                  {country.borders
                    ? Object.values(country.borders).map(border => (
                        <li className='border-pill' key={border}>
                          {border}
                        </li>
                      ))
                    : 'No borders'}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
