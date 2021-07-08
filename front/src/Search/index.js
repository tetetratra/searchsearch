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
  const [hasMore, setHasMore] = useState(true)

  const location = useLocation()

  const handleSubmit = event => {
    event.preventDefault()
    search()
  }

  const search = (over) => {
    const encodedUrl = encodeURIComponent(searchInputValue)
    const params = _.pickBy({
      query: encodedUrl,
      sort,
      prefix: prefixMatch,
      distinct,
      star: onlyStar,
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

  const loadMore = page => {
    const parsedQueryString = querystring.parse(location.search.replace(/^\?/, ''))
    const encodedUrl = parsedQueryString.query
    const url = encodedUrl ? decodeURIComponent(encodedUrl) : ''

    setSearchInputValue(url)
    setSort(parsedQueryString.sort || 'star')
    setPrefixMatch(!!parsedQueryString.prefix)
    setDistinct(!!parsedQueryString.distinct)
    setOnlyStar(!!parsedQueryString.star)
    setAuthor(parsedQueryString.author || '')

    const params = _.pickBy({
      query: encodedUrl,
      sort: parsedQueryString.sort,
      prefix: !!parsedQueryString.prefix,
      distinct: !!parsedQueryString.distinct,
      star: !!parsedQueryString.star,
      author: encodeURIComponent(parsedQueryString.author || ''),
      page: page
    })
    const paramsStr = Object.entries(params).map(e => e.join('=')).join("&")
    requestApi('/query_strings?' + paramsStr, 'GET').then(r => {
      setSearchResults(prevSearchResults => [...prevSearchResults, ...formatFetchedSearchResults(r)])
      if(r.length === 0) {
        setHasMore(false)
      }
    })
  }

  return (
    <div className={style.root}>
      <div className={style.headerAndLeftBar}>
        <Header
          constructedUrl={constructedUrl}
          constructedUrlLink={constructedUrlLink}
          search={search}
        />
        <LeftBar
          sort={sort}
          setSort={setSort}
          searchInputValue={searchInputValue}
          handleSearchInputValue={handleSearchInputValue}
          handleSubmit={handleSubmit}
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
        hasMore={hasMore}
        loadMore={loadMore}
        fold={fold}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        selectedPath={selectedPath}
        setSelectedPath={setSelectedPath}
        setSearchInputValue={setSearchInputValue}
        search={search}
        setAuthor={setAuthor}
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


