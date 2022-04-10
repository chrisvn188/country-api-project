import React from 'react'
import './Search.css'
import { AiOutlineSearch } from 'react-icons/ai'

export default function Search({ handleSearch }) {
  return (
    <label className='search'>
      <span className='visually-hidden'>Search:</span>
      <AiOutlineSearch className='icon' />
      <input
        type='search'
        placeholder='Search for a country...'
        onChange={handleSearch}
      />
    </label>
  )
}
