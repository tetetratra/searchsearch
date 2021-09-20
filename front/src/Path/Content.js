import { useState, useContext } from 'react';
import { useAlert } from 'react-alert'
import moment from 'moment'
import _ from 'lodash'
import InfiniteScroll  from 'react-infinite-scroller'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import {
  Container,
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button
} from '@mui/material';


import style from './Content.module.css'

import { LoginContext } from './../App.js'
import { requestApi } from './../api.js'
import { loaderIcon } from './../utils.js'

export const Content = ({ searchResult, setSearchResult, fetchSearchResult }) => {
  return (
    <Container sx={{ paddingBottom: '300px' }}>
      {searchResult ? <>
        {searchResult.query_string_keys.map((qs, i) =>
          <QueryString key={i}
            queryString={qs}
            setSearchResult={setSearchResult}
            fetchSearchResult={fetchSearchResult}
          />
        )}

        <NewKey searchResult={searchResult} setSearchResult={setSearchResult} fetchSearchResult={fetchSearchResult}/>

        <ConstructedUrl searchResult={searchResult}/>
      </> :
        loaderIcon
      }
    </Container>
  )
}

const QueryString = ({ queryString, setSearchResult, fetchSearchResult }) => {
  const setQueryStringValue = value => {
    setSearchResult(prevSearchResult => ({
      ...prevSearchResult,
      query_string_keys: prevSearchResult.query_string_keys.map(qsk => (
        { ...qsk, ...(qsk.key === queryString.key ? { value } : {}) }
      ))
    }))
  }

  return (
    <Card
      sx={{
        margin: '20px 0'
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            margin: '15px 0'
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              margin: '0 10px 0 0'
            }}
          >
            {`${queryString.key} = `}
          </Typography>
          <TextField
            size='small'
            sx={{
              background: queryString.value ? '#F0F6FF' : '#FFF'
            }}
            value={queryString.value}
            onChange={e => setQueryStringValue(e.target.value)}
          />
        </Box>

        <Divider />

        <List>
          {queryString.query_string_descriptions.map((d, i) =>
            <Description
              key={i}
              description={d}
              setQueryStringValue={setQueryStringValue}
            />
          )}
          <NewComment
            queryString={queryString}
            fetchSearchResult={fetchSearchResult}
          />
        </List>
      </CardContent>
    </Card>
  )
}

const Description = ({ description, setQueryStringValue }) => {
  const regexSplitByBrackets = /\[.*?\]/g
  const regexRemoveBrackets = /^\[|\]$/g

  const handleClick = str => e => {
    setQueryStringValue(str.replace(regexRemoveBrackets, ''))
  }

  const formatted = _.zip(
    Array.from(description.description.split(regexSplitByBrackets)),
    Array.from(description.description.matchAll(regexSplitByBrackets)).map(x => x[0])
  ).flat().filter(_.identity).map((str, i) => (
    str.match(regexSplitByBrackets) ? (
      <Button
        key={i}
        onClick={handleClick(str)}
        variant="outlined"
        size="small"
        disableElevation
        sx={{
          margin: 'auto 3px',
          textTransform: 'none'
        }}
      >
        {str.replace(regexRemoveBrackets, '')}
      </Button>
    ) : (
      str
    )
  ))

  return (
    <ListItem
      sx={{
        borderLeft: '1px solid #CCC',
        margin: '10px auto'
      }}
    >
      <ListItemText
        sx={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all'
        }}
        primary={formatted}
        secondary={`@${description.user?.name || '-'}`}
      />
    </ListItem>
  )
}

const ConstructedUrl = ({ searchResult }) => {
  const filteredQueryStringKeys = searchResult.query_string_keys.filter(qsk => qsk.value)
  const constructedHref = `https://${searchResult.name}?` +
    filteredQueryStringKeys.map(qsk => `${encodeURIComponent(qsk.key)}=${encodeURIComponent(qsk.value)}`).join('&')
  const constructedUrl = `https://${searchResult.name}?` +
    filteredQueryStringKeys.map(qsk => `${qsk.key}=${qsk.value.replace(/\+/g, '%2B').replace(/\s/g, '+')}`).join('&')
  return (
    <div>
      <a target='_blank' href={constructedHref}>{constructedUrl}</a>
    </div>
  )
}

const NewKey = ({ searchResult, setSearchResult, fetchSearchResult }) => {
  const alert = useAlert()
  const [show, setShow] = useState(false)
  const [key, setKey] = useState("")

  const handleSubmit = () => {
    const body = { path_id: searchResult.id, key }
    requestApi('/query_string_keys', 'POST', body).then(r => {
      alert.success('作成しました')
      setKey('')
      setShow(false)
      fetchSearchResult()
    }).catch(r => {
      alert.error(r.error)
    })
  }

  return (
    <Card
      sx={{
        margin: '20px 0',
        background: '#F6FBFF'
      }}
    >
      <CardContent>
        { show && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '10px'
            }}
          >
            <TextField
              value={key}
              label='key'
              onChange={e => setKey(e.target.value)}
              sx={{
                margin: 'auto 12px',
              }}
            />
            =
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {show && <Button
            onClick={handleSubmit}
            variant="outlined"
            sx={{
              margin: 'auto 10px',
              textTransform: 'none'
            }}
          >
            追加
          </Button>}

          <Button
            onClick={() => setShow(p => !p)}
            variant="outlined"
            color={ show ? 'inherit' : 'primary' }
            sx={{
              margin: 'auto 10px',
              textTransform: 'none'
            }}
          >
            { show ? '閉じる' : 'キーを追加' }
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

const NewComment = ({ queryString, fetchSearchResult }) => {
  const alert = useAlert()

  const [show, setShow] = useState(false)
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    const body = { query_string_key_id: queryString.id, description }
    requestApi('/query_string_descriptions', 'POST', body).then(r => {
      alert.success('投稿しました')
      setDescription('')
      setShow(false)
      fetchSearchResult()
    }).catch(r => {
      alert.error(r.error)
    })
  }

  return (
    <ListItem
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      { show && <>
        <TextField
          fullWidth
          multiline
          minRows={3}
          value={description}
          onChange={e => setDescription(e.target.value)}
          sx={{ margin: '5px' }}
          placeholder={'[角括弧]でボタン化'}
        />
        <Button
          variant="outlined"
          onClick={handleSubmit}
          sx={{
            margin: '5px',
            textTransform: 'none'
          }}
        >
          投稿
        </Button>
      </>}
      <Button
        variant="outlined"
        onClick={() => setShow(p => !p)}
        color={ show ? 'inherit' : 'primary' }
        sx={{
          margin: '5px',
          textTransform: 'none'
        }}
      >
        { show ? '閉じる' : 'コメントする' }
      </Button>
    </ListItem>
  )
}
