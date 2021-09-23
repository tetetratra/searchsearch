import { useAlert } from 'react-alert'
import { useState } from 'react'
import {
  ListItem,
  TextField,
  Button,
  Tooltip
} from '@mui/material';

import { requestApi } from './../api.js'

export const NewComment = ({ queryString, fetchSearchResult }) => {
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

  const handleClipBoardCopy = () => {
    navigator.clipboard.readText().then(text => {
      const match = text.match(new RegExp(`${queryString.key}=([^&]+)`))
      if (match) {
        setDescription(p => `${p}[${match[1]}]`)
      }
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
        <Tooltip title={`クリップボードのURLから ${queryString.key}= の値を取得します`} arrow>
          <Button
            variant="outlined"
            onClick={handleClipBoardCopy}
            sx={{
              margin: '5px',
              textTransform: 'none'
            }}
          >
            クリップボードから値を取得
          </Button>
        </Tooltip>
      </>}
      <Button
        variant="outlined"
        onClick={() => setShow(p => !p)}
        color={ show ? 'inherit' : 'success' }
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
