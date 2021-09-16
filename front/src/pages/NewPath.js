import _ from 'lodash'
import { Icon } from '@iconify/react'
import { sentenceCase } from 'change-case'
import { useState, useEffect } from 'react'
import InfiniteScroll  from 'react-infinite-scroller'
import plusFill from '@iconify/icons-eva/plus-fill'
import { useLocation, Link as RouterLink, Link } from "react-router-dom"
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
  TablePagination,
  TextField
} from '@material-ui/core'

import Page from '../components/Page'
import Label from '../components/Label'
import Scrollbar from '../components/Scrollbar'
import SearchNotFound from '../components/SearchNotFound'
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user'

import { requestApi } from './../api'
import style from './Search.module.css'
import { LoginContext } from './../App'

export default function NewPath() {
  const [searchParams, setSearchParams] = useState({
    sort: null
  })
  const [searchResult, setSearchResult] = useState(null)

  const location = useLocation()
  const encodedPath = location.pathname.replace(/^\/path\//, '')
  const decodedPath = decodeURIComponent(encodedPath)

  useEffect(() => {
    const paramsStr = Object.entries(_.pickBy(searchParams)).map(e => e.join('=')).join("&")
    requestApi(`/paths/${encodedPath}?` + paramsStr, 'GET').then(r => {
      const formattedSearchResult = {
        ...r,
        query_string_keys: r.query_string_keys.map(qsk => ({
          ...qsk,
          value: ''
        }))
      }
      setSearchResult(formattedSearchResult)
    })
  }, [])

  return (
    <Page>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            新規追加
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableBody>
                  {
                    searchResult?.query_string_keys.map((queryStringKey, i) =>
                      <QueryString key={i} queryStringKey={queryStringKey} setSearchResult={setSearchResult}/>
                    )
                  }
                  <TableRow style={{ height: 53 * 1 }}>
                    <TableCell colSpan={3} />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

        </Card>
      </Container>
    </Page>
  )
}

const QueryString = ({ queryStringKey, setSearchResult }) => {

  const handleValue = ({ target: { value } }) => {
    setSearchResult(prevSearchResult => ({
      ...prevSearchResult,
      query_string_keys: prevSearchResult.query_string_keys.map(qsk => ({
        ...qsk,
        ...(qsk.key == queryStringKey.key ? { value } : {})
      }))
    }))
  }

  return (
    <TableRow
      hover
      tabIndex={-1}
    >
      <TableCell component="td" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle2" noWrap>
            {queryStringKey.key}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell component="td" scope="row" padding="none">
        <TextField value={queryStringKey.value} onChange={handleValue} variant="outlined" />
      </TableCell>

      <TableCell component="td" scope="row" padding="none">
        {queryStringKey.query_string_descriptions.map((qsd, i) => <Description key={i} description={qsd} />)}
      </TableCell>
    </TableRow>
  )
}

const Description = ({ description }) => {
  return (
    <p>{description.description}</p>
  )
}

