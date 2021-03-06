import { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import _ from 'lodash'
import querystring from 'querystring'
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert'
import { useDebounce } from "use-debounce";
import {
  Container,
  TextField
} from '@mui/material'

import { requestApi } from './../api.js'
import { sleep, paramsToQueryString, formatPath } from './../utils.js'
import { Header } from './../Header.js'
import { New } from './New.js'
import { Content } from './Content.js'

export const Paths = props => {
  const location = useLocation()
  const infiniteScrollRef = useRef()
  const history = useHistory()
  const alert = useAlert()

  const [searchParams, setSearchParams] = useState(null)
  const [debouncedSearchParams] = useDebounce(searchParams, 500)
  const [searchResults, setSearchResults] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => { // 初期のクエリストリングからstateを作る
    const parsedQueryString = querystring.parse(location.search.replace(/^\?/, ''))
    setSearchParams(parsedQueryString)
    document.title = 'パス検索 | searchsearch'
  }, [])

  useEffect(() => { // 入力の変化(= stateの変化)からクエリストリングを作る
    const encodedQueryString = paramsToQueryString({
      ...searchParams
    })
    history.push(encodedQueryString ? `/search?${encodedQueryString}` : '/search')

    if(infiniteScrollRef.current) {
      infiniteScrollRef.current.pageLoaded = 0
      setSearchResults([])
      setHasMore(true)
    }
  }, [debouncedSearchParams])

  const loadMore = page => { // stateから検索をする
    const encodedQueryString = paramsToQueryString({
      ...searchParams,
      ...(searchParams?.q ? { fq: formatPath(searchParams.q) } : {}),
      page
    })
    requestApi('/paths?' + encodedQueryString, 'GET').then(fetchedSearchResults => {
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

  useEffect(async () => {
    await sleep(2500) // FIXME
    // ページを開いて直後にこのリクエストをすると、
    // 以降の別のリクエストでrailsのflashが再生産されてしまうのか、
    // リロードしたらまた同じflashが出てしまう。のでsetTimeoutさせている
    await requestApi('/consume_messages', 'GET').then(r => {
      r.forEach(msg => {
        alert.info(msg)
      })
    })
  }, [])

  return (
    <>
      <Header
        title="パス検索"
      />
      <Container>
        {searchParams && <>
          <Input
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <Content
            hasMore={hasMore}
            loadMore={loadMore}
            searchResults={searchResults}
            ref={infiniteScrollRef}
          />
          { !hasMore && searchParams.q && (
            <New
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              searchResults={searchResults}
            />
          )}
        </>}
      </Container>
    </>
  )
}

const Input = ({ searchParams, setSearchParams }) => {
  const handleInput = ({ target: { value } }) => {
    setSearchParams(prevSearchParams => ({ ...prevSearchParams, q: value }))
  }
  return (
    <TextField
      sx={{ margin: '20px 0', width: '80%' }}
      label="パスを検索or作成"
      variant="outlined"
      value={searchParams.q || ''}
      onChange={handleInput}
    />
  )
}

