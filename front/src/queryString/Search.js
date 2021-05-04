import { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory, Link } from "react-router-dom";

import { api } from './api'
import style from './Search.module.css'

export const Search = props => {
  const [searchInputValue, setSearchInputValue] = useState('') // パーセントエンコーディング前のURL
  const [sort, setSort] = useState('Star')
  const [prefixMatch, setPrefixMatch] = useState(false)
  const [distinct, setDistinct] = useState(false)
  const [onlyStar, setOnlyStar] = useState(false)
  const [specificAuthor, setSpecificAuthor] = useState(false)
  const [author, setAuthor] = useState("")
  const [selectedPath, setSelectedPath] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  const location = useLocation()

  useEffect(() => {
    const encodedUrl = location.search.split('=')[1]
    const url = encodedUrl ? decodeURIComponent(encodedUrl) : ''
    api.queryString.index(encodedUrl).then(r => {
      setSearchResults(formatFetchedSearchResults(r))
      setSearchInputValue(url)
      props.history.push(encodedUrl ? `search?q=${encodedUrl}` : 'search')
    })
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    const encodedUrl = encodeURIComponent(searchInputValue)
    api.queryString.index(encodedUrl).then(r => {
      setSearchResults(formatFetchedSearchResults(r))
      props.history.push(encodedUrl ? `search?q=${encodedUrl}` : 'search')
    })
  }

  const handleSearchInputValue = e => {
    setSearchInputValue(e.target.value)
  }

  const constructedUrl = constructUrl(selectedPath, searchResults)
  const constructedUrlLink = constructUrlLink(selectedPath, searchResults)

  return (
    <>
      <Header
        searchInputValue={searchInputValue}
        handleSearchInputValue={handleSearchInputValue}
        handleSubmit={handleSubmit}
        constructedUrl={constructedUrl}
        constructedUrlLink={constructedUrlLink}
      />
      <LeftBar
        sort={sort}
        setSort={setSort}
        prefixMatch={prefixMatch}
        setPrefixMatch={setPrefixMatch}
        distinct={distinct}
        setDistinct={setDistinct}
        onlyStar={onlyStar}
        setOnlyStar={setOnlyStar}
        specificAuthor={specificAuthor}
        setSpecificAuthor={setSpecificAuthor}
        author={author}
        setAuthor={setAuthor}
        handleSubmit={handleSubmit}
      />
      <MainContent
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        selectedPath={selectedPath}
        setSelectedPath={setSelectedPath}
      />
    </>
  )
}

const formatFetchedSearchResults = fetchedSearchResults => (
  fetchedSearchResults.map(searchResult => ({
    ...searchResult,
    value: searchResult.value || '',
    checked: false
  }))
)

const constructUrl = (selectedPath, searchResults) => {
  if (selectedPath === null) { return 'https://' }
  const queryString = searchResults
    .filter(searchResult => searchResult.checked)
    .map(searchResult => `${searchResult.key}=${searchResult.value.replace(/\+/g, '%2B').replace(/\s/g, '+')}`)
    .join('&')
  return `https://${selectedPath}?${queryString}`
}

const constructUrlLink = (selectedPath, searchResults) => {
  if (selectedPath === null) { return '' }
  const queryString = searchResults
    .filter(searchResult => searchResult.checked)
    .map(searchResult => `${encodeURIComponent(searchResult.key)}=${encodeURIComponent(searchResult.value)}`)
    .join('&')
  return `https://${selectedPath}?${queryString}`
}

const Header = ({ searchInputValue, handleSearchInputValue, handleSubmit, constructedUrl, constructedUrlLink }) => {
  return (
    <div className={style.header}>
      <div className={style.homeIcon}></div>
      <input value={searchInputValue} onChange={handleSearchInputValue} className={style.searchInput}/>
      <SearchIcon handleSubmit={handleSubmit}/>
      <div className={style.constructedUrl}>
        <span className={style.constructedUrlText}>{constructedUrl}</span>
      </div>
      <a target='_blank' href={constructedUrlLink}>
        <JumpIcon/>
      </a>
    </div>
  )
}

const SearchIcon = ({ handleSubmit }) => (
  <svg onClick={handleSubmit} className={style.searchIcon} viewBox="2 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="black" fillOpacity="0.87"/>
  </svg>
)

const JumpIcon = () => (
  <svg className={style.jumpIcon} viewBox="2 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="black" fillOpacity="0.87"/>
  </svg>
)

const LeftBar = ({ sort, setSort, prefixMatch, setPrefixMatch, distinct, setDistinct, onlyStar, setOnlyStar, specificAuthor, setSpecificAuthor, author, setAuthor, handleSubmit }) => {
  return (
    <div className={style.leftBar}>
      <SortSelect sort={sort} setSort={setSort}/>
      <div className={style.checkBoxesContainer}>
        <PrefixMatchCheck fill={prefixMatch} toggleCheck={() => setPrefixMatch(p => !p)} />
        <DistinctCheck fill={distinct} toggleCheck={() => setDistinct(p => !p)}/>
        <OnlyStarCheck fill={onlyStar} toggleCheck={() => setOnlyStar(p => !p)}/>
        <AuthorCheck
          fill={specificAuthor}
          toggleCheck={() => setSpecificAuthor(p => !p)}
          author={author}
          setAuthor={setAuthor}
        />
      </div>
      <SubmitSearch handleSubmit={handleSubmit}/>
      <hr className={style.leftBarHr}/>
      <NewLink/>
    </div>
  )
}

const SortSelect = ({ sort, setSort }) => {
  const [show, setShow] = useState(false)
  const toggleShow = () => {
    setShow(prevShow => !prevShow)
  }
  const changeSort = type => () => {
    setSort(type)
    setShow(false)
  }
  return <>
    <div className={style.sortSelect} onClick={toggleShow}>
      <span className={style.sortSelectSort}>Sort:&nbsp;</span>
      <span className={style.sortSelectSortType}>{sort}</span>&nbsp;<MenuIcon/>
    </div>
    { show && (
      <div className={style.sortSelectOptions}>
        <div onClick={changeSort("Star")} className={style.sortSelectOption}>Star</div>
        <div onClick={changeSort("New")} className={style.sortSelectOption}>New</div>
        <div onClick={changeSort("Old")} className={style.sortSelectOption}>Old</div>
      </div>
    )}
  </>
}

const MenuIcon = () => (
  <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M0.899994 0.5L6.39999 6L11.9 0.5H0.899994Z" fill="black" fillOpacity="0.87"/>
  </svg>
)

const PrefixMatchCheck = ({ fill, toggleCheck }) => {
  return (
    <div className={style.checkBox}>
      <CheckBoxIcon fill={fill} toggleCheck={toggleCheck}/><span className={style.checkBoxText}>前方一致</span>
    </div>
  )
}

const DistinctCheck = ({ fill, toggleCheck }) => {
  return (
    <div className={style.checkBox}>
      <CheckBoxIcon fill={fill} toggleCheck={toggleCheck}/><span className={style.checkBoxText}>重複を排除</span>
    </div>
  )
}

const OnlyStarCheck = ({ fill, toggleCheck }) => {
  return (
    <div className={style.checkBox}>
      <CheckBoxIcon fill={fill} toggleCheck={toggleCheck}/><span className={style.checkBoxText}>お気に入りのみ</span>
    </div>
  )
}

const AuthorCheck = ({ fill, toggleCheck, author, setAuthor }) => {
  const handleUserNameInput = event => {
    setAuthor(event.target.value)
  }
  return <>
    <div className={style.checkBox}>
      <CheckBoxIcon fill={fill} toggleCheck={toggleCheck}/><span className={style.checkBoxText}>作者指定</span>
    </div>
    {fill && (
      <input value={author} onChange={handleUserNameInput} className={style.userCheckInput}/>
    )}
  </>
}

const CheckBoxIcon = ({ fill, toggleCheck }) => {
  const check = fill ? (
    <svg className={style.checkBoxIcon} width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M29.2917 4.625H7.70833C5.99708 4.625 4.625 6.0125 4.625 7.70833V29.2917C4.625 30.9875 5.99708 32.375 7.70833 32.375H29.2917C31.0029 32.375 32.375 30.9875 32.375 29.2917V7.70833C32.375 6.0125 31.0029 4.625 29.2917 4.625ZM15.4167 26.2083L7.70834 18.5L9.88209 16.3262L15.4167 21.8454L27.1179 10.1442L29.2917 12.3333L15.4167 26.2083Z" fill="black" fillOpacity="0.87"/>
    </svg>
  ) : (
    <svg className={style.checkBoxIcon} width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="29" height="29">
        <path fillRule="evenodd" clipRule="evenodd" d="M7.70833 4.625H29.2917C30.9875 4.625 32.375 6.0125 32.375 7.70833V29.2917C32.375 30.9875 30.9875 32.375 29.2917 32.375H7.70833C6.0125 32.375 4.625 30.9875 4.625 29.2917V7.70833C4.625 6.0125 6.0125 4.625 7.70833 4.625ZM29.2917 29.2917V7.70833H7.70833V29.2917H29.2917Z" fill="white"/>
      </mask>
        <g mask="url(#mask0)">
        <rect width="37" height="37" fill="black" fillOpacity="0.38"/>
      </g>
    </svg>
  )
  return (
    <div onClick={toggleCheck}>
      {check}
    </div>
  )
}

const SubmitSearch = ({ handleSubmit }) => {
  return (
    <div className={style.submitSearch}>
      Search
      <SubmitSearchIcon handleSubmit={handleSubmit}/>
    </div>
  )
}

const SubmitSearchIcon = ({ handleSubmit }) => (
  <svg onClick={handleSubmit} className={style.submitSearchIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="black" fillOpacity="0.87"/>
  </svg>
)

const NewLink = () => {
  return (
    <Link to="/new">
      <div className={style.newLink}>
        New
        <NewIcon/>
      </div>
    </Link>
  )
}

const NewIcon = () => (
  <svg className={style.newIcon} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="black" fillOpacity="0.87"/>
  </svg>
)

const MainContent = ({ searchResults, setSearchResults, selectedPath, setSelectedPath }) => {
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
    <div className={style.mainContent}>
      {searchResults.map((searchResult, i) => (
        <Query
          key={i}
          searchResult={searchResult}
          setSearchResult={setSearchResult(i)}
          selectedPath={selectedPath}
          setSelectedPath={setSelectedPath}
        />
      ))}
    </div>
  )
}

const Query = ({ searchResult, setSearchResult, selectedPath, setSelectedPath }) => {
  const checked = selectedPath === searchResult.path
  const handleChecked = () => {
    setSelectedPath(searchResult.path)
  }
  const handleInputChange = e => {
    setSearchResult({ value: e.target.value })
  }
  const handleToggleCheck = () => {
    setSearchResult({ checked: !searchResult.checked })
  }
  return (
    <div className={style.query}>
      <RadioCheckIcon checked={checked} handleChecked={handleChecked}/>
      <div className={style.queryPath}>{searchResult.path}?</div>
      <UrlCheckBoxIcon fill={searchResult.checked} toggleCheck={handleToggleCheck}/>
      <div className={style.queryQuery}>{searchResult.key}=</div>
      <div>
        <input
          value={searchResult.value}
          onChange={handleInputChange}
          className={style.queryInput}>
        </input>
      </div>
      <div className={style.queryDescription}>{searchResult.description}</div>
      <div className={style.queryInfo}>
        <StarIcon/>
        <span className={style.queryStar}>283</span>
        📅
        <span className={style.queryDate}>2020/1/1</span>
      </div>
    </div>
  )
}

const StarIcon = () => (
  <svg width="25" height="25" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M10.5773 15.9854L16.0246 19.2732L14.5791 13.0766L19.3917 8.90742L13.0542 8.36974L10.5773 2.52577L8.10046 8.36974L1.76288 8.90742L6.57556 13.0766L5.12999 19.2732L10.5773 15.9854Z" fill="#C4C4C4"/>
  </svg>
)

const RadioCheckIcon = ({ checked, handleChecked }) => {
  const icon = checked ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="black" fillOpacity="0.87"/>
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="black" fillOpacity="0.87"/>
    </svg>
  )
  return (
    <div className={style.radioCheckIcon} onClick={handleChecked}>{icon}</div>
  )
}
const UrlCheckBoxIcon = ({ fill, toggleCheck }) => {
  const check = fill ? (
    <svg className={style.queryCheckBoxIcon} width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M29.2917 4.625H7.70833C5.99708 4.625 4.625 6.0125 4.625 7.70833V29.2917C4.625 30.9875 5.99708 32.375 7.70833 32.375H29.2917C31.0029 32.375 32.375 30.9875 32.375 29.2917V7.70833C32.375 6.0125 31.0029 4.625 29.2917 4.625ZM15.4167 26.2083L7.70834 18.5L9.88209 16.3262L15.4167 21.8454L27.1179 10.1442L29.2917 12.3333L15.4167 26.2083Z" fill="black" fillOpacity="0.87"/>
    </svg>
  ) : (
    <svg className={style.queryCheckBoxIcon} width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="29" height="29">
        <path fillRule="evenodd" clipRule="evenodd" d="M7.70833 4.625H29.2917C30.9875 4.625 32.375 6.0125 32.375 7.70833V29.2917C32.375 30.9875 30.9875 32.375 29.2917 32.375H7.70833C6.0125 32.375 4.625 30.9875 4.625 29.2917V7.70833C4.625 6.0125 6.0125 4.625 7.70833 4.625ZM29.2917 29.2917V7.70833H7.70833V29.2917H29.2917Z" fill="white"/>
      </mask>
        <g mask="url(#mask0)">
        <rect width="37" height="37" fill="black" fillOpacity="0.38"/>
      </g>
    </svg>
  )
  return (
    <div onClick={toggleCheck}>
      {check}
    </div>
  )
}
