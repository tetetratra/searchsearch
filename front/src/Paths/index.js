import { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import _ from 'lodash'
import querystring from 'querystring'
import { useHistory } from 'react-router-dom';

import { requestApi } from './../api.js'
import { paramsToQueryString } from './../utils.js'
import { Content } from './Content.js'
import { Header } from './Header.js'
import style from './index.module.css'

export const Paths = props => {
  const location = useLocation()
  const infiniteScrollRef = useRef()
  const history = useHistory()

  const [searchParams, setSearchParams] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    const parsedQueryString = querystring.parse(location.search.replace(/^\?/, ''))
    setSearchParams(parsedQueryString)
  }, [])

  useEffect(() => {
    const queryString = paramsToQueryString(searchParams)
    history.push(queryString ? `/search?${queryString}` : '/search')

    if(infiniteScrollRef.current) { // TODO: debounceする
      infiniteScrollRef.current.pageLoaded = 0
      setSearchResults([])
      setHasMore(true)
    }
  }, [searchParams])

  const loadMore = page => {
    requestApi('/paths?' + paramsToQueryString({ ...searchParams, page }), 'GET').then(fetchedSearchResults => {
      setSearchResults(prevSearchResults =>
        _.uniqBy( // FIXME: 原因不明で重複してしまう
          [...prevSearchResults, ...fetchedSearchResults],
          sr => sr.name
        )
      )
      if(fetchedSearchResults.length === 0) {
        setHasMore(false)
      }
    })
  }

  return (
    <div className={style.root}>
      <Header
      />
      {searchParams && <Content
        hasMore={hasMore}
        loadMore={loadMore}
        searchResults={searchResults}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        ref={infiniteScrollRef}
      />}
    </div>
  )
}

