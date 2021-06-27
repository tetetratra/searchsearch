import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import _ from 'lodash'
import querystring from 'querystring'

import { requestApi } from './../api'
import { Header } from './Header.js'
import { LeftBar } from './LeftBar.js'
import { MainContent } from './MainContent.js'
import style from './index.module.css'

export const Search = props => {
  const [searchInputValue, setSearchInputValue] = useState('') // パーセントエンコーディング前のURL
  const [sort, setSort] = useState('star')
  const [prefixMatch, setPrefixMatch] = useState(false)
  const [distinct, setDistinct] = useState(false)
  const [onlyStar, setOnlyStar] = useState(false)
  const [author, setAuthor] = useState("")
  const [selectedPath, setSelectedPath] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [fold, setFold] = useState(false)

  const location = useLocation()

  useEffect(() => {
    const parsedQueryString = querystring.parse(location.search.replace(/^\?/, ''))
    const encodedUrl = parsedQueryString.query
    const url = encodedUrl ? decodeURIComponent(encodedUrl) : ''

    setSearchInputValue(url)
    setSort(parsedQueryString.sort || 'star')
    setPrefixMatch(!!parsedQueryString.prefixMatch)
    setDistinct(!!parsedQueryString.distinct)
    setOnlyStar(!!parsedQueryString.onlyStar)
    setAuthor(parsedQueryString.author || '')

    const params = _.pickBy({
      query: encodedUrl,
      sort: parsedQueryString.sort,
      prefixMatch: !!parsedQueryString.distinct,
      distinct: !!parsedQueryString.onlyStar,
      onlyStar: !!parsedQueryString.onlyStar,
      author: encodeURIComponent(parsedQueryString.author || '')
    })
    const paramsStr = Object.entries(params).map(e => e.join('=')).join("&")
    requestApi('/query_strings?' + paramsStr, 'GET').then(r => {
      setSearchResults(formatFetchedSearchResults(r))
    })
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    search()
  }

  const search = (over) => {
    const encodedUrl = encodeURIComponent(searchInputValue)
    const params = _.pickBy({
      query: encodedUrl,
      sort,
      prefixMatch,
      distinct,
      onlyStar,
      author: encodeURIComponent(author),
      ...over
    })
    const paramsStr = Object.entries(params).map(e => e.join('=')).join("&")
    props.history.push(paramsStr ? `search?${paramsStr}` : 'search')
    requestApi('/query_strings?' + paramsStr, 'GET').then(r => {
      setSearchResults(formatFetchedSearchResults(r))
    })
  }

  const handleSearchInputValue = e => {
    setSearchInputValue(e.target.value)
  }

  const constructedUrl = constructUrl(selectedPath, searchResults)
  const constructedUrlLink = constructUrlLink(selectedPath, searchResults)

  return (
    <div className={style.root}>
      <div className={style.headerAndLeftBar}>
        <Header
          searchInputValue={searchInputValue}
          handleSearchInputValue={handleSearchInputValue}
          handleSubmit={handleSubmit}
          constructedUrl={constructedUrl}
          constructedUrlLink={constructedUrlLink}
          search={search}
        />
        <LeftBar
          sort={sort}
          setSort={setSort}
          prefixMatch={prefixMatch}
          setPrefixMatch={setPrefixMatch}
          distinct={distinct}
          setDistinct={setDistinct}
          onlyStar={onlyStar}
          setOnlyStar={setOnlyStar}
          author={author}
          setAuthor={setAuthor}
          handleSubmit={handleSubmit}
          fold={fold}
          setFold={setFold}
        />
      </div>
      <MainContent
        fold={fold}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        selectedPath={selectedPath}
        setSelectedPath={setSelectedPath}
        setSearchInputValue={setSearchInputValue}
        search={search}
      />
    </div>
  )
}

const formatFetchedSearchResults = fetchedSearchResults => (
  fetchedSearchResults.map(searchResult => ({
    ...searchResult,
    value: ''
  }))
)

const constructUrl = (selectedPath, searchResults) => {
  if (selectedPath === null) { return null }

  const queryString = searchResults
    .filter(searchResult => searchResult.value)
    .map(searchResult => `${searchResult.key}=${searchResult.value.replace(/\+/g, '%2B').replace(/\s/g, '+')}`)
    .join('&')
  return `${selectedPath}?${queryString}`
}

const constructUrlLink = (selectedPath, searchResults) => {
  if (selectedPath === null) { return '' }

  const queryString = searchResults
    .filter(searchResult => searchResult.value)
    .map(searchResult => `${encodeURIComponent(searchResult.key)}=${encodeURIComponent(searchResult.value)}`)
    .join('&')
  return `https://${selectedPath}?${queryString}`
}


