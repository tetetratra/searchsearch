import { useState } from 'react';
import { Link } from "react-router-dom";

import style from './index.module.css'

export const LeftBar = ({ sort, setSort, prefixMatch, setPrefixMatch, distinct, setDistinct, onlyStar, setOnlyStar, author, setAuthor, handleSubmit }) => {
  return (
    <div className={style.leftBar}>
      <SortSelect sort={sort} setSort={setSort}/>
      <div className={style.checkBoxesContainer}>
        <PrefixMatchCheck fill={prefixMatch} toggleCheck={() => setPrefixMatch(p => !p)} />
        <DistinctCheck fill={distinct} toggleCheck={() => setDistinct(p => !p)}/>
        <OnlyStarCheck fill={onlyStar} toggleCheck={() => setOnlyStar(p => !p)}/>
        <Author
          author={author}
          setAuthor={setAuthor}
        />
      </div>
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
      <input value={author} onChange={handleUserNameInput} className={style.userCheckInput}/>
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
    <div>
      {check}
    </div>
  )
}

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
