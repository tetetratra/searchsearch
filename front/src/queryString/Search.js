import { useState, useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom";
// import AddIcon from '@material-ui/icons/Add';

import { api } from './api'
import { NotificationContext } from './../notification'

export const Search = props => {
  const [inputValue, setInputValue] = useState('') // パーセントエンコーディング前のURL
  const [searchResult, setSearchResult] = useState([])
  const location = useLocation()

  useEffect(() => {
    const encodedUrl = location.search.split('=')[1]
    const url = encodedUrl ? decodeURIComponent(encodedUrl) : ''
    api.url.index(encodedUrl).then(r => {
      setSearchResult(r)
      setInputValue(url)
      props.history.push(encodedUrl ? `search?q=${encodedUrl}` : 'search')
    })
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    const encodedUrl = encodeURIComponent(inputValue)
    api.url.index(encodedUrl).then(r => {
      setSearchResult(r)
      props.history.push(encodedUrl ? `search?q=${encodedUrl}` : 'search')
    })
  }

  return (
    <div>
      <form>
        <input value={inputValue} onChange={({target: {value}}) => setInputValue(value)}/>
        <button onClick={handleSubmit}>search!</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>更新日</th>
          </tr>
        </thead>
        <tbody>
          {searchResult.map(({ path, updated_at: updatedAt }, i) => (
            <tr key={i}>
              <td><button onClick={() => props.history.push(`qs/${encodeURIComponent(path)}`)}>{path}</button></td>
              <td>{updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <NewUrl setSearchResult={setSearchResult} inputValue={inputValue} />
      </div>
    </div>
  )
}

const NewUrl = ({ setSearchResult, inputValue }) => {
  const [showNew, setShowNew] = useState(false)
  const [createPath, setCreatePath] = useState('')
  const notificationApi = useContext(NotificationContext)
  const handleChange = ({ target: { value } }) => setCreatePath(value)
  const handleSubmit = event => {
    event.preventDefault()
    api.url.create(createPath).then(createResponse =>
      api.url.index(encodeURIComponent(inputValue)).then(indexResponse => {
        setSearchResult(indexResponse)
        setCreatePath('')
        notificationApi.success('保存しました')
      })
    ).catch(({error}) =>
      notificationApi.error(`エラー: ${error}`)
    )
  }
  return showNew ? (
    <form onSubmit={handleSubmit}>
      <label>URL:</label>
      <input value={createPath} onChange={handleChange} placeholder='example.com/search?'/>
      <button>URLを追加</button>
    </form>
  ) : (
    <button onClick={() => setShowNew(true)}>+</button>
  )
}

