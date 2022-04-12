import React from 'react'
import './Countries.css'
import Search from '../../components/Search/Search'
import Filter from '../../components/Filter/Filter'
import CountryCard from '../../components/CountryCard/CountryCard'

export default function Countries({
  handleSearch,
  handleFilter,
  handleShowFilter,
  regions,
  showFilter,
  filterCategory,
  searchedCountries,
  setShowFilter,
}) {
  return (
    <section className='countries-page'>
      <div className='container'>
        <header>
          <Search handleSearch={handleSearch} />
          <Filter
            handleFilter={handleFilter}
            handleShowFilter={handleShowFilter}
            regions={regions}
            showFilter={showFilter}
            filterCategory={filterCategory}
            setShowFilter={setShowFilter}
          />
        </header>

        {searchedCountries && searchedCountries.length > 0 ? (
          <ul className='countries'>
            {searchedCountries.map(country => (
              <li key={country.name.common}>
                <CountryCard country={country} />
              </li>
            ))}
          </ul>
        ) : (
          <p>There is no countries...</p>
        )}
      </div>
    </section>
  )
}
