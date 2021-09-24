import { useContext } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faUserPlus  } from "@fortawesome/free-solid-svg-icons";
import { Typography } from '@mui/material';

import { LoginContext } from './App'

export const Header = ({ title }) => {
  const user = useContext(LoginContext)

  return (
    <div
      style={{
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        background: "#CDE",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ display: 'inline-block' }}>
        <Link to='/'
          style={{
            cursor: "pointer",
            display: "inline-block",
            margin: "8px 15px",
            width: "30px",
            height: "30px",
            borderRadius: "10px",
            verticalAlign: "middle"
          }}
        >
          <img style={{ borderRadius: '10px' }} src={"/homeicon.svg"} alt="icon"/>
        </Link>
        <Typography
          sx={{
            display: 'inline-block',
            fontSize: '20px',
            verticalAlign: 'middle',
            fontWeight: 'bold',
            color: '#555',
            margin: '0 0 0 15px'
          }}
        >
          { title }
        </Typography>
      </div>
      <a
        href={user.signed_in ? '/users/edit' : '/users/sign_in' }
        style={{
          cursor: "pointer",
          textDecoration: "none",
          color: "#444",
          fontSize: "30px",
          margin: "0 15px",
          padding: "0 10px 0 10px",
          borderRadius: "5px",
          background: "#BCD"
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
    </div>
  )
}

