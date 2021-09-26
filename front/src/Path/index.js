import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import { Content } from './Content.js'
import { Header } from './../Header.js'
import { requestApi } from './../api.js'

export const Path = () => {
  const location = useLocation()

  const [searchResult, setSearchResult] = useState(null)

  const encodedPath = location.pathname.replace(/^\/path\//, '')

  const fetchSearchResult = () => {
    requestApi(`/paths/${encodedPath}?`, 'GET').then(fetchedSearchResult => {
      setSearchResult({
        ...fetchedSearchResult,
        query_string_keys: fetchedSearchResult.query_string_keys.map(qsk => ({
          ...qsk,
          value: ''
        }))
      })
      document.title = `${fetchedSearchResult.name} のクエリストリング | searchsearch`
    })
  }

  useEffect(() => {
    fetchSearchResult()
  }, [])

  return (
    <>
      <Header
        title={searchResult ? `${searchResult.name} のクエリストリング` : ''}
      />
      <Content
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        fetchSearchResult={fetchSearchResult}
      />
    </>
  )
}
