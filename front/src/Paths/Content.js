import { useState, useContext, forwardRef } from 'react';
import { useAlert } from 'react-alert'
import moment from 'moment'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import InfiniteScroll  from 'react-infinite-scroller'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Card,
  CardContent,
  Container,
  TextField
} from '@mui/material'

import style from './Content.module.css'

import { LoginContext } from './../App.js'
import { requestApi } from './../api.js'
import { loaderIcon } from './../utils.js'

export const Content = forwardRef(({ hasMore, loadMore, searchResults }, ref) => {

  return (
    <InfiniteScroll
      ref={ref}
      loadMore={loadMore}
      hasMore={hasMore}
      loader={loaderIcon}
    >
      {searchResults.map((searchResult, i) => <Path key={i} path={searchResult} />)}
    </InfiniteScroll>
  )
})

const Path = ({ path: { name } }) => {
  return (
    <Link style={{ textDecoration: 'none' }} to={`path/${encodeURIComponent(name)}`}>
      <Card sx={{ margin: '20px 0' }}>
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              background: '#EEE'
            }
          }}
        >
          <Avatar
            sx={{
              width: '18px',
              height: '18px',
              margin: '10px'
            }}
            src={`https://icons.duckduckgo.com/ip3/${name.split('/')[0]}.ico`}
            alt={`${name.split('/')[0]} favicon`}
            variant='rounded'
          />
          <Typography
            sx={{
              marginLeft: '10px',
              fontSize: '20px'
            }}
          >
            {name}
          </Typography>
        </CardContent>
      </Card>
    </Link>

  )
}
