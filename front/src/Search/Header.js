import { useContext } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

import style from './Header.module.css'
import { LoginContext } from './../App'

export const Header = ({ handleSubmit, constructedUrl, constructedUrlLink, search }) => {
  const loginned = useContext(LoginContext)

  const handleHomeIconClick = () => {
    search({
      query: '',
      sort: '',
      prefix: '',
      distinct: '',
      star: '',
      author: ''
    })
  }
  const innerBox = <>
    <SearchIcon />
    <span className={style.constructedUrlText}>https://{constructedUrl}</span>
  </>
  return (
    <div className={style.header}>
      <a tabIndex={-1} onClick={handleHomeIconClick} className={style.homeIcon}></a>
      <a tabIndex={-1} href={loginned ? '/users/edit' : '/users/sign_in'} className={style.userInfo}>
        {loginned ? <FontAwesomeIcon className={style.userIcon} icon={faUserAlt}/> : '+'}
      </a>

      { constructedUrlLink ? (
        <a tabIndex={7} target='_blank' rel="noreferrer" href={constructedUrlLink} className={style.constructedUrl}>{innerBox}</a>
      ) : (
        <span tabIndex={7} className={style.constructedUrl}>{innerBox}</span>
      )}
    </div>
  )
}

const SearchIcon = () => (
  <svg className={style.searchIcon} viewBox="2 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="gray" fillOpacity="0.87"/>
  </svg>
)

