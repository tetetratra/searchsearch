import { useContext } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faUserPlus  } from "@fortawesome/free-solid-svg-icons";
import { Typography } from '@mui/material';

import { LoginContext } from './App'

export const Header = () => {
  const user = useContext(LoginContext)

  return (
    <div
      style={{
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
        background: "#DDDDDD",
      }}
    >
      <Link to='/'
        style={{
          cursor: "pointer",
          display: "inline-block",
          margin: "10px 0 10px 10px",
          width: "50px",
          height: "50px",
          borderRadius: "10px",
          verticalAlign: "middle",
          background: "#FFFFFF"
        }}
      >
        <img style={{ borderRadius: '10px' }} src={"/homeicon.svg"}/>
      </Link>
      <a
        href={user.signed_in ? '/users/edit' : '/users/sign_in' }
        style={{
          cursor: "pointer",
          textDecoration: "none",
          color: "#000",
          display: "inline-block",
          fontSize: "30px",
          margin: "0 0 0 20px",
          padding: "0 10px 0 10px",
          borderRadius: "5px",
          background: "#EEE",
          verticalAlign: "middle",
          right: '50px'
        }}
      >
        <FontAwesomeIcon
          style={{
            margin: "0 0 3px 0",
            width: "23px",
            height: "23px",
          }}
          icon={user.signed_in ? faUserEdit : faUserPlus}
        />
      </a>
      <Typography
        sx={{
          display: 'inline-block',
          margin: 'auto 30px',
          fontSize: '28px',
          fontWeight: 'bold'
        }}
      >
        SearchSearch
      </Typography>
    </div>
  )
}

