import { useState, useContext, forwardRef } from 'react';
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

export const Content = forwardRef(({ hasMore, loadMore, searchResults }, ref) => {

  return (
    <InfiniteScroll
      ref={ref}
      loadMore={loadMore}
      hasMore={hasMore}
      loader={loaderIcon}
    >
      {searchResults.map((searchResult, i) => <Path key={i} path={searchResult} />)}
    </InfiniteScroll>
  )
})

const Path = ({ path: { name } }) => {
  return (
    <div className={style.path}>
      <img src={`http://www.google.com/s2/favicons?domain=${name.split('/')[0]}`} style={{width: 18}}/>
      <a href={`path/${encodeURIComponent(name)}`}>{name}</a>
    </div>
  )
}

