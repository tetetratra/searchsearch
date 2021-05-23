import { useState } from 'react';

import { Header } from './Header.js'
import { MainContent } from './MainContent.js'

export const New = ({ setSearchResults, inputValue }) => {
  const [input, setInput] = useState("https://www.google.com/search?q=js+url+parse&oq=js+url+parse&aqs=chrome..69i57j0i30l4j0i5i30l5.1682j0j4&sourceid=chrome&ie=UTF-8&ie=UTF-8&ie=UTF-8&ie=UTF-8&ie=UTF-8&ie=UTF-8&ie=UTF-8&ie=UTF-8&ie=UTF-8&ie=UTF-8") // TODO
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

