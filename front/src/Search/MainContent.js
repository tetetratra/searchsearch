import { useState, useContext } from 'react';
import { useAlert } from 'react-alert'
import moment from 'moment'
import _ from 'lodash'
import InfiniteScroll  from 'react-infinite-scroller'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCalendarAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

import { requestApi } from './../api'
import style from './MainContent.module.css'
import { LoginContext } from './../App'

export const MainContent = ({ hasMore, loadMore, fold, searchResults, setSearchResults, selectedPath, setSelectedPath, setSearchInputValue, search, setAuthor }) => {
  const setSearchResult = index => updateProp => {
    setSearchResults(prevSearchResults => (
      prevSearchResults.map((prevSearchResult, i) => (
        i === index ? (
          updateProp == null ? null : ({ ...prevSearchResult, ...updateProp })
        ) : (
          prevSearchResult
        )
      )).filter(_.identity)
    ))
  }
  const loader = <FontAwesomeIcon className={style.loading} icon={faSpinner}/>
  return (
    <div className={`${style.main} ${fold ? style.main50left : style.main250left}`}>
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        loader={loader}>
        {searchResults.map((searchResult, i) => (
          <Query
            key={i}
            searchResult={searchResult}
            setSearchResult={setSearchResult(i)}
            selectedPath={selectedPath}
            setSelectedPath={setSelectedPath}
            setSearchInputValue={setSearchInputValue}
            search={search}
            setAuthor={setAuthor}
          />
        ))}
      </InfiniteScroll>
    </div>
  )
}

const Query = ({ searchResult, setSearchResult, selectedPath, setSelectedPath, setSearchInputValue, search, setAuthor }) => {
  const loginned = useContext(LoginContext)
  const alert = useAlert()

  const handleInputChange = e => {
    setSearchResult({ value: e.target.value })
    setSelectedPath(searchResult.path)
  }
  const handleButtonClick = str => {
    setSearchResult({ value: str })
    setSelectedPath(searchResult.path)
  }
  const handleQueryPathClick = () => {
    setSearchInputValue(searchResult.path)
    const encodedUrl = encodeURIComponent(searchResult.path)
    search({ query: encodedUrl })
  }
  const handleClickUserName = () => {
    setAuthor(searchResult.user_name)
  }
  const handleClickStar = () => {
    if (!loginned) { return }

    if (searchResult.favorited) {
      requestApi('/favorites', 'DELETE', {
        query_string_id: searchResult.id
      })
      setSearchResult({
        favorited: false,
        favorite_count: searchResult.favorite_count - 1
      })
    } else {
      requestApi('/favorites', 'POST', {
        query_string_id: searchResult.id,
      })
      setSearchResult({
        favorited: true,
        favorite_count: searchResult.favorite_count + 1
      })
    }
  }
  const handleDeleteButton = () => {
    console.log("aaa")
    confirmAlert({
      title: '削除しますか?',
      message: '',
      buttons: [
        {
          label: 'キャンセル',
          onClick: () => null
        },
        {
          label: '削除する',
          onClick: () => {
            console.log("abc")
            requestApi(`/query_strings/${searchResult.id}`, 'DELETE').then(r => {
              alert.info('削除しました')
              setSearchResult(null)
            })
          }
        }
      ]
    })
  }
  return (
    <div className={style.query}>
      <div onClick={handleQueryPathClick} className={style.queryPath}>{searchResult.path}?</div>
      <div className={style.queryKey}>{searchResult.key}=</div>
      <input
        value={searchResult.value}
        onChange={handleInputChange}
        className={style.queryValue}>
      </input>
      <div className={style.queryDescription}>{buildDescription(searchResult.description, handleButtonClick)}</div>
      <div className={style.queryInfo}>
        <span className={style.queryStar}><StarIcon stared={searchResult.favorited} onClick={handleClickStar}/> {searchResult.favorite_count}</span>
        <span className={style.queryDate}><FontAwesomeIcon icon={faCalendarAlt}/> {moment(searchResult.created_at).format('YYYY-MM-DD')}</span>
        {searchResult.user_name &&
          <span onClick={handleClickUserName} className={style.queryUserName}>@{searchResult.user_name}</span>
        }
        {searchResult.owner ?
          <button className={style.deleteButton} onClick={handleDeleteButton}><FontAwesomeIcon icon={faTrash}/></button>
        : null}
      </div>
    </div>
  )
}

const buildDescription = (desc, handleButtonClick) => {
  const regexp = /\[.*?\]/g

  const formatted = _.zip(
    Array.from(desc.split(regexp)),
    Array.from(desc.matchAll(regexp)).map(x => x[0])
  ).flat().filter(_.identity).map((str, i) => (
    str.match(/^\[/) ? (
      <MatchedButton
        key={i}
        str={str.replace(/^\[|\]$/g, '')}
        handleButtonClick={handleButtonClick}
      />
    ) : str
  ))
  return formatted
}

const MatchedButton = ({ str, handleButtonClick }) => {
  const handleClick = () => {
    handleButtonClick(str)
  }
  return (
    <button onClick={handleClick} className={style.matchedButton}>{str}</button>
  )
}

const StarIcon = ({ onClick, stared }) => (
  <svg className={style.starIcon} onClick={onClick} width="25" height="25" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M10.5773 15.9854L16.0246 19.2732L14.5791 13.0766L19.3917 8.90742L13.0542 8.36974L10.5773 2.52577L8.10046 8.36974L1.76288 8.90742L6.57556 13.0766L5.12999 19.2732L10.5773 15.9854Z" fill={stared ? "#5AF" : "#C4C4C4"}/>
  </svg>
)
