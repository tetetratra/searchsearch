import { useState, useEffect, useContext } from 'react';
// import AddIcon from '@material-ui/icons/Add';
// import RemoveIcon from '@material-ui/icons/Remove';
import { useParams } from "react-router-dom";
import { sortBy as _sortBy, groupBy as _groupBy } from 'lodash'

import { api } from './api'
import { NotificationContext } from './../notification'

import style from './Show.module.css'

export const Show = props => {
  const [url, setUrl] = useState('')
  const [urlId, setUrlId] = useState()
  const [queryStrings, setQueryStrings] = useState([])
  const param = useParams()

  useEffect(() => {
    const encodedUrl = param.url
    setUrl(decodeURIComponent(encodedUrl)) // URLからとる
    api.url.show(encodedUrl).then(({ id, query_strings: queryStrings }) => {
      setUrlId(id)
      setQueryStrings(
        _sortBy(queryStrings, ({key}) => key).map(qs =>
          ({ ...qs, value: '' })
        )
      )
    })
  }, [])

  const handleInput = queryStringId => ({ target: {value } }) => {
    setQueryStrings(prevQueryStrings => {
      const qs = prevQueryStrings.find(({id}) => id === queryStringId)
      const qsIndex = prevQueryStrings.findIndex(({id}) => id === queryStringId)
      return [
        ...prevQueryStrings.filter((_, i) => i < qsIndex),
        { ...qs, value },
        ...prevQueryStrings.filter((_, i) => i > qsIndex)
      ]
    })
  }

  return (
    <main className={style.main}>
      <h1>{url}</h1>
      <UrlTable queryStrings={queryStrings} handleInput={handleInput} />
      <ConstructUrl url={url} queryStrings={queryStrings} />
      <AddQueryString urlId={urlId} setQueryStrings={setQueryStrings} />
    </main>
  )
}

const ConstructUrl = ({ url, queryStrings }) => {
  const [schema, setSchema] = useState('https')
  const queryString = Object.values(_groupBy(queryStrings, ({key}) => key)).map(gqs => gqs[0])
    .filter(({value}) => value !== '').map(({key, value}) => `${key}=${value}`).join("&")
  const domain = `${url}${queryString}`
  return (
    <div>
      <button tabIndex={-1} onClick={() => setSchema(schema === 'https' ? 'http' : 'https')}>{schema}://</button>
      <a href={`${schema}://${domain}`} rel='noreferrer' target='_blank' >
        {domain}
      </a>
    </div>
  )
}

// white-space: pre-wrap; をCSSに
const UrlTable = ({queryStrings, handleInput}) => {
  const groupedQueryStrings = Object.values(_groupBy(queryStrings, ({key}) => key))
  return (
    <table>
      <tbody>{
        groupedQueryStrings.map((qss, i) => (
          <tr key={i}>
            <td>{qss[0].key}</td>
            <td>= <input onChange={handleInput(qss[0].id)} value={qss[0].value} /></td>
            <td><ul>
              {qss.map(({ description }, i) => (
                <li key={i}>{description}</li>
              ))}
            </ul></td>
          </tr>
        ))
      }</tbody>
    </table>
  )
}

const AddQueryString = ({ urlId, setQueryStrings }) => {
  const [showNew, setShowNew] = useState(false)
  const [inputKey, setInputKey] = useState('')
  const [inputDescription, setInputDescription] = useState('')
  const notificationApi = useContext(NotificationContext)
  const handleSubmit = event => {
    event.preventDefault()
    api.queryString.create(urlId, inputKey, inputDescription).then(({ query_strings: newQueryStrings }) => {
      setQueryStrings(prevQueryStrings =>
        _sortBy(newQueryStrings.map(qs => {
          const value = prevQueryStrings.find(({key}) => key === qs.key)?.value || ''
          return { ...qs, value }
        }), ({key}) => key)
      )
      setInputKey('')
      setInputDescription('')
      notificationApi.success('追加しました')
    }).catch(({error}) =>
      notificationApi.error(`エラー: ${error}`)
    )
  }
  return showNew ? (
    <div>
      <button onClick={() => setShowNew(false)}>-</button>
      <form onSubmit={handleSubmit} >
        <input placeholder='key' value={inputKey} onChange={({target: {value}}) => setInputKey(value)} />
        <textarea placeholder='description' value={inputDescription} onChange={({target: {value}}) => setInputDescription(value)} />
        <button>クエリストリングを追加</button>
      </form>
    </div>
  ) : (
    <button onClick={() => setShowNew(true)}>+</button>
  )
}
