import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Search from './components/Search/Search'
import Filter from './components/Filter/Filter'
import CountryCard from './components/CountryCard/CountryCard'
import useLocalStorage from 'use-local-storage'

const url = 'https://restcountries.com/v3.1/all'
const regions = ['all', 'africa', 'americas', 'asia', 'europe', 'oceania']

export default function App() {
  const [countries, setCountries] = useState([])
  const [searchingTerm, setSearchingTerm] = useState('')
  const [searchedCountries, setSearchedCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filterCategory, setFilterCategory] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  const isDefaultDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
  const [theme, setTheme] = useLocalStorage(
    'theme',
    isDefaultDark ? 'dark' : 'light'
  )

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
      if (filterCategory && filterCategory !== 'all') {
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

  function switchTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return (
    <div className='site-wrapper' data-theme={theme}>
      <Header switchTheme={switchTheme} theme={theme} />
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
          {searchedCountries.length > 0 ? (
            <ul className='countries'>
              {searchedCountries.map(country => (
                <CountryCard key={country.name.common} country={country} />
              ))}
            </ul>
          ) : (
            <p>There is no countries...</p>
          )}
        </div>
      </main>
    </div>
  )
}
