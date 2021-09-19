import { useState } from 'react';
import { useAlert } from 'react-alert'

import { requestApi } from './../api.js'
import { formatPath } from './../utils.js'

export const New = ({ searchParams, setSearchParams }) => {
  const alert = useAlert()

  const formattedUrl = formatPath(searchParams.q)

  const handleClick = () => {
    const body = { name: formattedUrl }
    requestApi('/paths', 'POST', body).then(r => {
      alert.success('作成しました')
      setSearchParams(prevSearchParams => ({
        ...prevSearchParams,
        q: formattedUrl
      }))
    }).catch(r => {
      alert.error(r.error)
    })
  }

  return formattedUrl && (
    <button onClick={handleClick}>
      { formattedUrl } を追加
    </button>
  )
}

