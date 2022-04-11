import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import useLocalStorage from 'use-local-storage'
import Header from './components/Header/Header'
import Countries from './pages/Countries/Countries'
import DetailsPage from './pages/DetailsPage/DetailsPage'
import ErrorPage from './pages/ErrorPage/ErrorPage'

const url = 'https://restcountries.com/v3.1/all'
const regions = ['all', 'africa', 'americas', 'asia', 'europe', 'oceania']

export default function App() {
  const [countries, setCountries] = useState([])
  const [searchingTerm, setSearchingTerm] = useState('')
  const [searchedCountries, setSearchedCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [filterCategory, setFilterCategory] = useLocalStorage('filter', '')
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
    handleShowFilter()
  }

  function handleShowFilter() {
    setShowFilter(prevShowFilter => !prevShowFilter)
  }

  function switchTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return (
    <Router>
      <div className='site-wrapper' data-theme={theme}>
        <Header switchTheme={switchTheme} theme={theme} />
        <Routes>
          <Route
            index
            element={
              <Countries
                handleFilter={handleFilter}
                handleSearch={handleSearch}
                showFilter={showFilter}
                searchedCountries={searchedCountries}
                regions={regions}
                handleShowFilter={handleShowFilter}
                filterCategory={filterCategory}
                setShowFilter={setShowFilter}
              />
            }
          />
          <Route path='country'>
            <Route path=':name' element={<DetailsPage />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  )
}
