import { useState, useEffect, useContext } from 'react';
import { useLocation, Link } from "react-router-dom";

import { api } from './api'
import style from './Search.module.css'

export const Search = props => {
  const [inputValue, setInputValue] = useState('') // パーセントエンコーディング前のURL
  const [searchResults, setSearchResults] = useState([])
  const location = useLocation()

  useEffect(() => {
    const encodedUrl = location.search.split('=')[1]
    const url = encodedUrl ? decodeURIComponent(encodedUrl) : ''
    api.queryString.index(encodedUrl).then(r => {
      setSearchResults(r)
      setInputValue(url)
      props.history.push(encodedUrl ? `search?q=${encodedUrl}` : 'search')
    })
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    const encodedUrl = encodeURIComponent(inputValue)
    api.queryString.index(encodedUrl).then(r => {
      setSearchResults(r)
      props.history.push(encodedUrl ? `search?q=${encodedUrl}` : 'search')
    })
  }

  return (
    <>
      <Header/>
      <LeftBar/>
    </>
  )
}

const Header = () => {
  return (
    <div className={style.header}>
      <div className={style.homeIcon}></div>
      <input className={style.searchInput}/>
      <SearchIcon/>
      <div className={style.constructedUrl}>
        <span className={style.constructedUrlText}>https://example.com</span>
      </div>
      <JumpIcon/>
    </div>
  )
}

const SearchIcon = () => (
  <svg className={style.searchIcon} viewBox="2 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="black" fillOpacity="0.87"/>
  </svg>
)

const JumpIcon = () => (
  <svg className={style.jumpIcon} viewBox="2 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="black" fillOpacity="0.87"/>
  </svg>
)

const LeftBar = () => {
  return (
    <div className={style.leftBar}>
      <SortSelect/>
      <div className={style.checkBoxesContainer}>
        <PrefixMatchCheck/>
        <DistinctCheck/>
        <OnlyFavCheck/>
        <UserCheck/>
      </div>
      <SubmitSearch/>
      <hr className={style.leftBarHr}/>
      <NewLink/>
    </div>
  )
}

const SortSelect = () => {
  const [show, setShow] = useState(false)

  const toggleShow = () => {
    setShow(prevShow => !prevShow)
  }
  return <>
    <div className={style.sortSelect} onClick={toggleShow}>
      <span className={style.sortSelectSort}>Sort:&nbsp;</span>
      <span className={style.sortSelectSortType}>Star</span>&nbsp;<MenuIcon/>
    </div>
    { show && (
      <div className={style.sortSelectOptions}>
        <div className={style.sortSelectOption}>Star</div>
        <div className={style.sortSelectOption}>New</div>
        <div className={style.sortSelectOption}>Old</div>
      </div>
    )}
  </>
}

const MenuIcon = () => (
  <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.899994 0.5L6.39999 6L11.9 0.5H0.899994Z" fill="black" fill-opacity="0.87"/>
  </svg>
)

const PrefixMatchCheck = () => {
  return (
    <div className={style.checkBox}>
      <CheckBox/><span className={style.checkBoxText}>前方一致</span>
    </div>
  )
}

const DistinctCheck = () => {
  return (
    <div className={style.checkBox}>
      <CheckBox/><span className={style.checkBoxText}>重複を排除</span>
    </div>
  )
}

const OnlyFavCheck = () => {
  return (
    <div className={style.checkBox}>
      <CheckBox/><span className={style.checkBoxText}>お気に入りのみ</span>
    </div>
  )
}

const UserCheck = () => {
  const [fill, setFill] = useState(false)
  const [userName, setUserName] = useState("")
  const toggleCheck = () => {
    setFill(prev => !prev)
  }
  const handleUserNameInput = event => {
    setUserName(event.target.value)
  }
  return <>
    <div className={style.checkBox}>
      <CheckBox fill={fill} toggleCheck={toggleCheck}/><span className={style.checkBoxText}>作者指定</span>
    </div>
    {fill && (
      <input value={userName} onChange={handleUserNameInput} className={style.userCheckInput}/>
    )}
  </>
}

const CheckBox = ({ fill, toggleCheck }) => {
  const check = fill ? (
    <svg className={style.checkBoxcon} width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M29.2917 4.625H7.70833C5.99708 4.625 4.625 6.0125 4.625 7.70833V29.2917C4.625 30.9875 5.99708 32.375 7.70833 32.375H29.2917C31.0029 32.375 32.375 30.9875 32.375 29.2917V7.70833C32.375 6.0125 31.0029 4.625 29.2917 4.625ZM15.4167 26.2083L7.70834 18.5L9.88209 16.3262L15.4167 21.8454L27.1179 10.1442L29.2917 12.3333L15.4167 26.2083Z" fill="black" fill-opacity="0.87"/>
    </svg>
  ) : (
    <svg className={style.checkBoxcon} width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="29" height="29">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.70833 4.625H29.2917C30.9875 4.625 32.375 6.0125 32.375 7.70833V29.2917C32.375 30.9875 30.9875 32.375 29.2917 32.375H7.70833C6.0125 32.375 4.625 30.9875 4.625 29.2917V7.70833C4.625 6.0125 6.0125 4.625 7.70833 4.625ZM29.2917 29.2917V7.70833H7.70833V29.2917H29.2917Z" fill="white"/>
      </mask>
        <g mask="url(#mask0)">
        <rect width="37" height="37" fill="black" fill-opacity="0.38"/>
      </g>
    </svg>
  )
  return (
    <div onClick={toggleCheck}>
      {check}
    </div>
  )
}

const SubmitSearch = () => {
  return (
    <div className={style.submitSearch}>
      Search
      <SubmitSearchIcon/>
    </div>
  )
}

const SubmitSearchIcon = () => (
  <svg className={style.submitSearchIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="black" fill-opacity="0.87"/>
  </svg>
)

const NewLink = () => {
  return (
    <div className={style.newLink}>
      New
      <NewIcon/>
    </div>
  )
}

const NewIcon = () => (
  <svg className={style.newIcon} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="black" fill-opacity="0.87"/>
  </svg>
)


