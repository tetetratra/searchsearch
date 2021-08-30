import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import _ from 'lodash'
import querystring from 'querystring'

import { requestApi } from './../api'
import { Content } from './Content.js'
import { Header } from './Header.js'
import style from './index.module.css'

export const Paths = props => {
  const [searchParams, setSearchParams] = useState({
    path: '' // パーセントエンコーディング前のURL
  })
  const [searchResults, setSearchResults] = useState([])
  const [hasMore, setHasMore] = useState(true)

  const location = useLocation()

  const loadMore = page => {
    const paramsStr = Object.entries({ ..._.pickBy(searchParams), page: page }).map(e => e.join('=')).join("&")
    requestApi('/paths?' + paramsStr, 'GET').then(r => {
      setSearchResults(prevSearchResults => [...prevSearchResults, ...r])
      if(r.length === 0) {
        setHasMore(false)
        console.log(searchResults)
      }
    })
  }

  return (
    <div className={style.root}>
      <Header
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <Content
        hasMore={hasMore}
        loadMore={loadMore}
        searchResults={searchResults}
      />
    </div>
  )
}

