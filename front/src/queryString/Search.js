import { useState, useEffect, useContext } from 'react';
import { useLocation, Link } from "react-router-dom";

import { api } from './api'
import style from './Search.module.css'

export const Search = props => {
  const [inputValue, setInputValue] = useState('') // パーセントエンコーディング前のURL
  const [searchResults, setSearchResults] = useState([])
  const location = useLocation()

  useEffect(() => {
    const encodedUrl = location.search.split('=')[1]
    const url = encodedUrl ? decodeURIComponent(encodedUrl) : ''
    api.queryString.index(encodedUrl).then(r => {
      setSearchResults(r)
      setInputValue(url)
      props.history.push(encodedUrl ? `search?q=${encodedUrl}` : 'search')
    })
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    const encodedUrl = encodeURIComponent(inputValue)
    api.queryString.index(encodedUrl).then(r => {
      setSearchResults(r)
      props.history.push(encodedUrl ? `search?q=${encodedUrl}` : 'search')
    })
  }

    // <div>
    //   <form>
    //     <input value={inputValue} onChange={({target: {value}}) => setInputValue(value)}/>
    //     <button onClick={handleSubmit}>search!</button>
    //   </form>
    //   <div>
    //     <Link to={'/new'}>新規作成</Link>
    //   </div>
    //   {searchResults.map((searchResult, i) => <Path searchResult={searchResult} key={i}/>)}
    // </div>
  return (
    <>
      <Header />
    </>
  )
}

const Path = ({ searchResult: { created_at, path, key, value, description } }) => {
  return (
    <ul>
      <li>{path}</li>
      <li>{key}</li>
      <li>{value}</li>
      <li>{description}</li>
    </ul>
  )
}

const Header = () => {
  return (
    <div className={style.header}>
      <div className={style.homeIcon}></div>
      <input className={style.searchInput}/>
      <SearchIcon/>
      <div className={style.constructedUrl}>
        <span className={style.constructedUrlText}>https://example.com</span>
      </div>
      <JumpIcon/>
    </div>
  )
}

const SearchIcon = () => (
  <svg className={style.searchIcon} viewBox="2 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="black" fill-opacity="0.87"/>
  </svg>
)

const JumpIcon = () => (
  <svg className={style.jumpIcon} viewBox="2 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="black" fill-opacity="0.87"/>
  </svg>
)
