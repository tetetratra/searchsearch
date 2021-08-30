import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import _ from 'lodash'
import querystring from 'querystring'

import { Content } from './Content.js'
import { Header } from './Header.js'
import { requestApi } from './../api'
import style from './index.module.css'

export const Path = () => {
  const [searchParams, setSearchParams] = useState({
    sort: null,
    star: true,
  })
  const [searchResult, setSearchResult] = useState(null)

  const location = useLocation()

  const encodedPath = location.pathname.replace(/^\/path\//, '')

  useEffect(() => {
    const paramsStr = Object.entries(_.pickBy(searchParams)).map(e => e.join('=')).join("&")
    requestApi(`/paths/${encodedPath}?` + paramsStr, 'GET').then(r => {
      setSearchResult(r)
    })
  }, [])

  return (
    <div className={style.root}>
      <Header
      />
      <Content
        searchResult={searchResult}
      />
    </div>
  )
}


