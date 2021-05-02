import { useState } from 'react';
import _ from 'lodash'

import { api } from './api'

export const New = ({ setSearchResults, inputValue }) => {
  const [input, setInput] = useState("https://www.google.com/search?q=js+url+parse&oq=js+url+parse&aqs=chrome..69i57j0i30l4j0i5i30l5.1682j0j4&sourceid=chrome&ie=UTF-8") // TODO
  const handleInput = event => {
    setInput(event.target.value)
  }

  const url = parseUrl(input)
  return (
    <>
      <input value={input} onChange={handleInput}></input>
      { url && <Forms url={url}/> }
    </>
  )
}

const parseUrl = input => {
  try {
    return new URL(input)
  } catch {
    return null
  }
}

const Forms = ({ url }) => {
  const formattedUrls = _.zip(Array.from(url.searchParams.keys()), Array.from(url.searchParams.values()))
    .map(([ key, value ]) => ({ key, value }))
  return formattedUrls.map(formattedUrl => <Form formattedUrl={formattedUrl}/>)
}

const Form = ({ formattedUrl }) => {
  const [value, setValue] = useState(formattedUrl.value)
  const [description, setDescription] = useState("")
  const handleValueInput = event => {
    setValue(event.target.value)
  }
  const handleDescriptionInput = event => {
    setDescription(event.target.value)
  }
  return (
    <div>
      <div>
        {formattedUrl.key}=<input value={value} onChange={handleValueInput}></input>
      </div>
      <div>
        <input value={description} onChange={handleDescriptionInput}></input>
      </div>
    </div>
  )
}
