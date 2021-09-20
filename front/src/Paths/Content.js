import { forwardRef } from 'react';
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import InfiniteScroll  from 'react-infinite-scroller'
import 'react-confirm-alert/src/react-confirm-alert.css'
import {
  Avatar,
  Typography,
  Card,
  CardContent,
} from '@mui/material'

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
