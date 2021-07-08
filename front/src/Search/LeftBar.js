import { useState, useContext } from 'react'
import { Link } from "react-router-dom"
import OutsideClickHandler from 'react-outside-click-handler'

import style from './LeftBar.module.css'
import { LoginContext } from './../App'

export const LeftBar = ({ fold, setFold, searchInputValue, handleSearchInputValue, sort, setSort, prefixMatch, setPrefixMatch, distinct, setDistinct, onlyStar, setOnlyStar, author, setAuthor, handleSubmit }) => {
  const loginned = useContext(LoginContext)

  return fold ? (
    <div className={style.leftBarFold}>
      <Fold fold={fold} onClick={() => setFold(f => !f)}/>
      <SearchLinkMini handleSubmit={handleSubmit}/>
      <NewLinkMini/>
    </div>
  ) : (
    <div className={style.leftBar}>
      <Fold onClick={() => setFold(f => !f)}/>
      <SearchInput searchInputValue={searchInputValue} handleSearchInputValue={handleSearchInputValue} handleSubmit={handleSubmit}/>
      <SortSelect sort={sort} setSort={setSort}/>
      <div className={style.checkBoxesContainer}>
        <PrefixMatchCheck fill={prefixMatch} toggleCheck={() => setPrefixMatch(p => !p)} />
        <DistinctCheck fill={distinct} toggleCheck={() => setDistinct(p => !p)}/>
        { loginned && <OnlyStarCheck fill={onlyStar} toggleCheck={() => setOnlyStar(p => !p)}/> }
        <Author
          author={author}
          setAuthor={setAuthor}
        />
      </div>
      <SearchLink handleSubmit={handleSubmit}/>
      <NewLink/>
    </div>
  )
}

const Fold = ({ fold, onClick }) => {
  return (
    <div onClick={onClick} className={style.fold}>
      {fold ? '＋' : 'ー'}
    </div>
  )
}

const SearchInput = ({ searchInputValue, handleSearchInputValue, handleSubmit }) => {
  const onKeyPress = e => {
    if(e.key === 'Enter'){
      handleSubmit(e)
    }
  }
  return (
    <div className={style.searchInputBox}>
      <input tabIndex={1} className={style.searchInput} value={searchInputValue} onChange={handleSearchInputValue} onKeyPress={onKeyPress}/>
      <SearchIcon />
    </div>
  )
}

const SortSelect = ({ sort, setSort }) => {
  const [showSort, setShowSort] = useState(false)
  const toggleShow = () => {
    setShowSort(prevShow => !prevShow)
  }
  const changeSort = type => () => {
    setSort(type)
    setShowSort(false)
  }
  return <>
    <button tabIndex={2} className={style.sortSelect} onClick={toggleShow}>
      <span className={style.sortSelectSort}>sort:&nbsp;</span>
      <span className={style.sortSelectSortType}>{sort}</span>&nbsp;<MenuIcon/>
    </button>
    { showSort && (
      <OutsideClickHandler onOutsideClick={() => setShowSort(false)} >
        <div className={style.sortSelectOptions}>
          <button tabIndex={2} onClick={changeSort("star")} className={style.sortSelectOption}>star</button>
          <button tabIndex={2} onClick={changeSort("new")} className={style.sortSelectOption}>new</button>
          <button tabIndex={2} onClick={changeSort("old")} className={style.sortSelectOption}>old</button>
        </div>
      </OutsideClickHandler>
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
    <div className={style.checkBox} onClick={toggleCheck}>
      <CheckBoxIcon fill={fill}/><span className={style.checkBoxText}>前方一致</span>
    </div>
  )
}

const DistinctCheck = ({ fill, toggleCheck }) => {
  return (
    <div className={style.checkBox} onClick={toggleCheck}>
      <CheckBoxIcon fill={fill}/><span className={style.checkBoxText}>重複を排除</span>
    </div>
  )
}

const OnlyStarCheck = ({ fill, toggleCheck }) => {
  return (
    <div className={style.checkBox} onClick={toggleCheck}>
      <CheckBoxIcon fill={fill}/><span className={style.checkBoxText}>お気に入りのみ</span>
    </div>
  )
}

const Author = ({ author, setAuthor }) => {
  const handleUserNameInput = event => {
    setAuthor(event.target.value)
  }
  return (
    <div className={style.author}>
       作者指定
      <input tabIndex={4} value={author} onChange={handleUserNameInput} className={style.userCheckInput}/>
    </div>
  )
}

const CheckBoxIcon = ({ fill }) => {
  const check = fill ? (
    <svg width="25" height="25" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M29.2917 4.625H7.70833C5.99708 4.625 4.625 6.0125 4.625 7.70833V29.2917C4.625 30.9875 5.99708 32.375 7.70833 32.375H29.2917C31.0029 32.375 32.375 30.9875 32.375 29.2917V7.70833C32.375 6.0125 31.0029 4.625 29.2917 4.625ZM15.4167 26.2083L7.70834 18.5L9.88209 16.3262L15.4167 21.8454L27.1179 10.1442L29.2917 12.3333L15.4167 26.2083Z" fill="black" fillOpacity="0.87"/>
    </svg>
  ) : (
    <svg width="25" height="25" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="29" height="29">
        <path fillRule="evenodd" clipRule="evenodd" d="M7.70833 4.625H29.2917C30.9875 4.625 32.375 6.0125 32.375 7.70833V29.2917C32.375 30.9875 30.9875 32.375 29.2917 32.375H7.70833C6.0125 32.375 4.625 30.9875 4.625 29.2917V7.70833C4.625 6.0125 6.0125 4.625 7.70833 4.625ZM29.2917 29.2917V7.70833H7.70833V29.2917H29.2917Z" fill="white"/>
      </mask>
        <g mask="url(#mask0)">
        <rect width="37" height="37" fill="black" fillOpacity="0.38"/>
      </g>
    </svg>
  )
  return (
    <button tabIndex={3} className={style.checkBoxButton}>
      {check}
    </button>
  )
}

const SearchLink = ({ handleSubmit }) => {
  return (
    <button tabIndex={5} onClick={handleSubmit} className={style.searchLink}>
      Search
      <SearchIcon/>
    </button>
  )
}

const SearchLinkMini = ({ handleSubmit }) => {
  return (
    <button tabIndex={5} onClick={handleSubmit} className={style.searchLinkMini}>
      <SearchIcon/>
    </button>
  )
}

const NewLink = () => {
  return (
    <Link to="/new" tabIndex={-1}>
      <button tabIndex={6} className={style.newLink}>
        New
        <NewIcon/>
      </button>
    </Link>
  )
}

const NewLinkMini = () => {
  return (
    <Link to="/new">
      <button tabIndex={6} className={style.newLinkMini}>
        <NewIcon/>
      </button>
    </Link>
  )
}

const SearchIcon = () => (
  <svg className={style.searchIcon} width="22" height="22" viewBox="2 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="black" fillOpacity="0.87"/>
  </svg>
)

const NewIcon = () => (
  <svg className={style.newIcon} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="black" fillOpacity="0.87"/>
  </svg>
)
