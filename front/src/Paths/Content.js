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
import style from './Content.module.css'
import { LoginContext } from './../App'

export const Content = ({ hasMore, loadMore, searchResults }) => {
  const loaderIcon = <FontAwesomeIcon className={style.loading} icon={faSpinner}/>
  return (
    <div className={style.main}>
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        loader={loaderIcon}>
        {searchResults.map((searchResult, i) => <Path key={i} path={searchResult} />)}
      </InfiniteScroll>
    </div>
  )
}

const Path = ({ path: { name } }) => {
  return (
    <div className={style.path}>
      <img src={`http://www.google.com/s2/favicons?domain=${name.split('/')[0]}`} style={{width: 18}}/>
      <a href={`path/${encodeURIComponent(name)}`}>{name}</a>
    </div>
  )
}
