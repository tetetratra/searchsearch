import { useState, useEffect, useContext } from 'react';
import { useLocation, Link } from "react-router-dom";
// import AddIcon from '@material-ui/icons/Add';

import { api } from './api'
// import { NotificationContext } from './../notification'

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

  return (
    <div>
      <form>
        <input value={inputValue} onChange={({target: {value}}) => setInputValue(value)}/>
        <button onClick={handleSubmit}>search!</button>
      </form>
      <div>
        <Link to={'/new'}>新規作成</Link>
      </div>
      {searchResults.map((searchResult, i) => <Path searchResult={searchResult} key={i}/>)}
    </div>
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

