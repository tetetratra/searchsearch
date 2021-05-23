import { useState } from 'react';
import _ from 'lodash'

import { api } from './../api'
import style from './MainContent.module.css'

export const MainContent = ({ url }) => {
  const path = url ? `${url.hostname}${url.pathname}?` : ''
  const formattedUrls = url ?
    _.zip(Array.from(url.searchParams.keys()), Array.from(url.searchParams.values()))
      .map(([ key, value ]) => ({ key, value })) : []
  return (
    <div className={style.main}>
      {formattedUrls.map(formattedUrl => <Query key={formattedUrl.key} formattedUrl={formattedUrl} path={path}/>)}
    </div>
  )
}

const Query = ({ formattedUrl, path }) => {
  const [description, setDescription] = useState(formattedUrl.value)
  const handleDescriptionInput = event => {
    setDescription(event.target.value)
  }
  const handleClick = e => {
    // api をつかう
  }
  return (
    <div className={style.query}>
      <div className={style.queryPath}>{path}</div>
      <div className={style.queryKey}>{formattedUrl.key}</div>
      <textarea onChange={handleDescriptionInput} className={style.queryDescription} value={description}/>
      <button className={style.querySave} onClick={handleClick}>create</button>
    </div>
  )
}
