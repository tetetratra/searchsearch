import { useState, useContext } from 'react';
import { useAlert } from 'react-alert'
import moment from 'moment'
import _ from 'lodash'
import InfiniteScroll  from 'react-infinite-scroller'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import style from './Content.module.css'

import { LoginContext } from './../App.js'
import { requestApi } from './../api.js'
import { loaderIcon } from './../utils.js'

export const Content = ({ searchResult, setSearchResult }) => {
  return (
    <div className={style.main}>
      { searchResult ? (
        searchResult.query_string_keys.map((qs, i) => <QueryString key={i} queryString={qs} setSearchResult={setSearchResult}/>)
      ) : loaderIcon }
      { searchResult &&
        <ConstructedUrl
          searchResult={searchResult}
        />
      }
    </div>
  )
}

const QueryString = ({ queryString, setSearchResult }) => {
  const setQueryStringValue = value => {
    setSearchResult(prevSearchResult => ({
      ...prevSearchResult,
      query_string_keys: prevSearchResult.query_string_keys.map(qsk => (
        { ...qsk, ...(qsk.key === queryString.key ? { value } : {}) }
      ))
    }))
  }

  return (
    <div>
      {queryString.key}=
      <input value={queryString.value} onChange={e => setQueryStringValue(e.target.value)} />
      <ul>
        {queryString.query_string_descriptions.map((d, i) => <Description key={i} description={d} setQueryStringValue={setQueryStringValue} />)}
      </ul>
    </div>
  )
}

const Description = ({ description, setQueryStringValue }) => {
  const handleClick = str => e => {
    setQueryStringValue(str)
  }


  const regexSplitByBrackets = /\[.*?\]/g
  const regexRemoveBrackets = /^\[|\]$/g
  const formatted = _.zip(
    Array.from(description.description.split(regexSplitByBrackets)),
    Array.from(description.description.matchAll(regexSplitByBrackets)).map(x => x[0])
  ).flat().filter(_.identity).map((str, i) => (
    str.match(regexSplitByBrackets) ? (
      <button key={i} onClick={handleClick(str.replace(regexRemoveBrackets, ''))} >{str.replace(regexRemoveBrackets, '')}</button>
    ) : (
      str
    )
  ))
  return (
    <li>
      {formatted}
    </li>
  )
}

const ConstructedUrl = ({ searchResult }) => {
  const filteredQueryStringKeys = searchResult.query_string_keys.filter(qsk => qsk.value)
  const constructedHref = `https://${searchResult.name}?` +
    filteredQueryStringKeys.map(qsk => `${encodeURIComponent(qsk.key)}=${encodeURIComponent(qsk.value)}`).join('&')
  const constructedUrl = `https://${searchResult.name}?` +
    filteredQueryStringKeys.map(qsk => `${qsk.key}=${qsk.value.replace(/\+/g, '%2B').replace(/\s/g, '+')}`).join('&')
  return (
    <div>
      <a target='_blank' href={constructedHref}>{constructedUrl}</a>
    </div>
  )
}
