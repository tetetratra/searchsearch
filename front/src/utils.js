import _ from 'lodash'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import style from './util.module.css'

export const paramsToQueryString = params => Object.entries(_.pickBy(params || {}))
  .map(e => e.map(encodeURIComponent).join('='))
  .join('&')

export const loaderIcon = <FontAwesomeIcon key={-1} className={style.loading} icon={faSpinner}/>

export const formatPath = str => {
  let s = ""
  if (str.match(/^https?:\/\//)) {
    try {
      const url = new URL(str)
      s = url.hostname + url.pathname
    } catch {
      s = str.replace(/^https?:\/\//, '')
    }
  } else {
    if(str.match(/:\/\//)) {
      s = null
    }
    try {
      const url = new URL('https://' + str)
      s = url.hostname + url.pathname
    } catch {
      s = str.replace(/^https?:\/\//, '')
    }
  }
  const domain = s.split('/')[0]
  if (!domain.match(/\w+\.[a-z][a-z]+/)) {
    return null
  }
  return s.replace(/\/+$/, '')
}

export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
