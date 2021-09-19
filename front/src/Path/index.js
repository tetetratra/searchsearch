import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import _ from 'lodash'
import querystring from 'querystring'

import { Content } from './Content.js'
import { Header } from './Header.js'
import { requestApi } from './../api.js'
import style from './index.module.css'

export const Path = () => {
  const location = useLocation()

  const [searchResult, setSearchResult] = useState(null)

  const encodedPath = location.pathname.replace(/^\/path\//, '')

  const fetchSearchResult = () => {
    console.log(fetchSearchResult)
    requestApi(`/paths/${encodedPath}?`, 'GET').then(fetchedSearchResult => {
      setSearchResult({
        ...fetchedSearchResult,
        query_string_keys: fetchedSearchResult.query_string_keys.map(qsk => ({
          ...qsk,
          value: ''
        }))
      })
    })
  }

  useEffect(() => {
    fetchSearchResult()
  }, [])

  return (
    <div className={style.root}>
      <Header
      />
      <Content
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        fetchSearchResult={fetchSearchResult}
      />
    </div>
  )
}
