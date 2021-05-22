import moment from 'moment'

import style from './index.module.css'

export const MainContent = ({ searchResults, setSearchResults, selectedPath, setSelectedPath, setSearchInputValue }) => {
  const setSearchResult = index => updateProp => {
    setSearchResults(prevSearchResults => (
      prevSearchResults.map((prevSearchResult, i) => (
        i === index ? (
          { ...prevSearchResult, ...updateProp }
        ) : (
          prevSearchResult
        )
      ))
    ))
  }
  return (
    <div className={style.main}>
      {searchResults.map((searchResult, i) => (
        <Query
          key={i}
          searchResult={searchResult}
          setSearchResult={setSearchResult(i)}
          selectedPath={selectedPath}
          setSelectedPath={setSelectedPath}
          setSearchInputValue={setSearchInputValue}
        />
      ))}
    </div>
  )
}

const Query = ({ searchResult, setSearchResult, selectedPath, setSelectedPath, setSearchInputValue }) => {
  const handleInputChange = e => {
    setSearchResult({ value: e.target.value })
    setSelectedPath(searchResult.path)
  }
  return (
    <div className={style.query}>
      <div onClick={() => setSearchInputValue(searchResult.path)} className={style.queryPath}>{searchResult.path}?</div>
      <div className={style.queryKey}>{searchResult.key}=</div>
      <input
        value={searchResult.value}
        onChange={handleInputChange}
        className={style.queryValue}>
      </input>
      <div className={style.queryDescription}>{searchResult.description}</div>
      <div className={style.queryInfo}>
        <StarIcon/>
        <span className={style.queryStar}>{searchResult.favorite_count}</span>
        📅
        <span className={style.queryDate}>{moment(searchResult.created_at).format('YYYY-MM-DD')}</span>
      </div>
    </div>
  )
}

const StarIcon = () => (
  <svg width="25" height="25" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M10.5773 15.9854L16.0246 19.2732L14.5791 13.0766L19.3917 8.90742L13.0542 8.36974L10.5773 2.52577L8.10046 8.36974L1.76288 8.90742L6.57556 13.0766L5.12999 19.2732L10.5773 15.9854Z" fill="#C4C4C4"/>
  </svg>
)
