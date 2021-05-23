import { useState } from 'react';

import { Header } from './Header.js'
import { MainContent } from './MainContent.js'

export const New = ({ setSearchResults, inputValue }) => {
  const [input, setInput] = useState("")
  const handleInput = event => {
    setInput(event.target.value)
  }

  const url = parseUrl(input)
  return <div>
    <Header
      input={input}
      handleInput={handleInput}
      url={url}
    />
    <MainContent
      url={url}
    />
  </div>
}

const parseUrl = input => {
  try {
    return new URL(input)
  } catch {
    return null
  }
}

