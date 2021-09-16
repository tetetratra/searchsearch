import _ from 'lodash'
import { Icon } from '@iconify/react'
import { sentenceCase } from 'change-case'
import { useState, useEffect, useRef } from 'react'
import InfiniteScroll  from 'react-infinite-scroller'
import plusFill from '@iconify/icons-eva/plus-fill'
import { useLocation, Link as RouterLink, Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core'

import Page from '../components/Page'
import Label from '../components/Label'
import Scrollbar from '../components/Scrollbar'
import SearchNotFound from '../components/SearchNotFound'
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user'

import { requestApi } from './../api'
import style from './Search.module.css'
import { LoginContext } from './../App'

export default function Search() {
  const [searchParams, setSearchParams] = useState({
    path: '' // パーセントエンコーディング前のURL
  })
  const [searchResults, setSearchResults] = useState([])
  const [hasMore, setHasMore] = useState(true)

  // let scroll = useRef({})

  const location = useLocation()

  const loadMore = page => {
    const paramsStr = Object.entries({ ..._.pickBy(searchParams), page: page }).map(e => e.join('=')).join("&")
    requestApi('/paths?' + paramsStr, 'GET').then(r => {
      setSearchResults(prevSearchResults => [...prevSearchResults, ...r])
      if(r.length === 0) {
        setHasMore(false)
      }
    })
  }

  const navigate = useNavigate()
  // useEffect(() => {
  //   const paramsStr = Object.entries({ ..._.pickBy(searchParams) }).map(e => e.join('=')).join("&")
  //   scroll.pageLoaded = 0
  //   // navigate(`/search?${paramsStr}`)
  // }, [searchParams])

  const loaderIcon = <FontAwesomeIcon key={'loaderIcon'} className={style.loading} icon={faSpinner}/>

  const parseUrl = input => {
    try {
      const url = new URL(input)
      if (!url.origin.match(/https?:/)) {
        return null
      }
      return url
    } catch {
      return null
    }
  }
  const url = parseUrl(searchParams.path)

  return (
    <Page>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            パス検索
          </Typography>

          <Button
            disabled={!url}
            variant="contained"
            onClick={() => null}
            startIcon={<Icon icon={plusFill} />}
            style={{textTransform: 'none'}}
          >
            {url && `${url.hostname}${url.pathname} を` }登録
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            filterName={searchParams.path}
            onFilterName={e => setSearchParams(prevSearchParams => ({ ...prevSearchParams, path: e.target.value }))}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <InfiniteScroll
                key={searchParams.path}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={loaderIcon}
              >
                <Table>
                  <TableBody>
                    {searchResults.map((searchResult, i) =>
                      <Path key={i} path={searchResult} />
                    )}
                    {!hasMore && (
                      <TableRow key={'TableRow'} style={{ height: 53 * 1 }}>
                        <TableCell colSpan={1} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </InfiniteScroll>
            </TableContainer>
          </Scrollbar>

        </Card>
      </Container>
    </Page>
  )
}

const Path = ({ path: { name } }) => {
  return (
    <TableRow
      hover
      tabIndex={-1}
    >
      <TableCell component="td" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={name} src={null} />
          <Typography variant="subtitle2" noWrap>
            <Link to={`/path/${encodeURIComponent(name)}`}>{name}</Link>
          </Typography>
        </Stack>
      </TableCell>
    </TableRow>
  )
}
