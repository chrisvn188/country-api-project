import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Search from './components/Search/Search'
import Filter from './components/Filter/Filter'
import CountryCard from './components/CountryCard/CountryCard'

const url = 'https://restcountries.com/v3.1/all'
const regions = ['africa', 'americas', 'asia', 'europe', 'oceania']

export default function App() {
  const [countries, setCountries] = useState([])
  const [searchingTerm, setSearchingTerm] = useState('')
  const [searchedCountries, setSearchedCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filterCategory, setFilterCategory] = useState('')
  const [showFilter, setShowFilter] = useState(false)

  // Fetch Data
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setCountries(json)
      })
  }, [])

  // Searching
  useEffect(() => {
    if (filteredCountries.length > 0) {
      if (searchingTerm) {
        const filtered = filteredCountries.filter(country =>
          country.name.common.toLowerCase().includes(searchingTerm)
        )
        setSearchedCountries(filtered)
      } else {
        setSearchedCountries(filteredCountries)
      }
    }
  }, [searchingTerm, filteredCountries])

  // Filtering
  useEffect(() => {
    if (countries.length > 0) {
      if (filterCategory) {
        const filtered = countries.filter(country => {
          return country.region.toLowerCase() === filterCategory
        })
        setFilteredCountries(filtered)
      } else {
        setFilteredCountries(countries)
      }
    }
  }, [filterCategory, countries])

  function handleSearch(e) {
    setSearchingTerm(e.target.value)
  }

  function handleFilter(e) {
    setFilterCategory(e.target.dataset.region)
  }

  function handleShowFilter() {
    setShowFilter(prevShowFilter => !prevShowFilter)
  }

  return (
    <div className='site-wrapper'>
      <Header />
      <main className='main'>
        <div className='container'>
          <header>
            <Search handleSearch={handleSearch} />
            <Filter
              handleFilter={handleFilter}
              handleShowFilter={handleShowFilter}
              regions={regions}
              showFilter={showFilter}
            />
          </header>
          <ul className='countries'>
            {searchedCountries.map(country => (
              <CountryCard key={country.name.common} country={country} />
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
