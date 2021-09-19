import _ from 'lodash'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import style from './util.module.css'

export const paramsToQueryString = params => Object.entries(_.pickBy(params || {})).map(e => e.join('=')).join('&')

export const loaderIcon = <FontAwesomeIcon className={style.loading} icon={faSpinner}/>
