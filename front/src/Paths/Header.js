import { useContext } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faUserPlus  } from "@fortawesome/free-solid-svg-icons";

import style from './Header.module.css'
import { LoginContext } from './../App'

export const Header = () => {
  const loginned = useContext(LoginContext)

  return (
    <div className={style.header}>
      <a className={style.homeIcon}><img className={style.homeIconImg} src={"/homeicon.svg"}/></a>
      { loginned ? (
        <a href={'/users/edit'} className={style.userInfo}>
          <FontAwesomeIcon className={style.userIcon} icon={faUserEdit}/>
        </a>
      ) : (
        <a href={'/users/sign_in'} className={style.userInfo}>
          <FontAwesomeIcon className={style.userIcon} icon={faUserPlus}/>
        </a>
      ) }
    </div>
  )
}

