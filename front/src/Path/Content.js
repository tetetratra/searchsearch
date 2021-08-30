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

export const Content = ({ searchResult }) => {
  const loaderIcon = <FontAwesomeIcon className={style.loading} icon={faSpinner}/>
  return (
    <div className={style.main}>
      { searchResult === null ? loaderIcon : (
        searchResult.query_string_keys.map(qs => <QueryString queryString={qs}/>)
      )}
    </div>
  )
}

const QueryString = ({ queryString }) => {
  return (
    <div>
      <p>{queryString.key}</p>
      <ul>
        {queryString.query_string_descriptions.map(d => <li>{d.description}</li>)}
      </ul>
    </div>
  )
}

