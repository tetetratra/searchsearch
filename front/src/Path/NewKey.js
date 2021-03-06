import { useAlert } from 'react-alert'
import { useState } from 'react';
import { requestApi } from './../api.js'
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  Button,
  Tooltip
} from '@mui/material';

export const NewKey = ({ searchResult, setSearchResult, fetchSearchResult }) => {
  const alert = useAlert()
  const [show, setShow] = useState(false)
  const [key, setKey] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    const body = { path_id: searchResult.id, key, description }
    requestApi('/query_string_keys', 'POST', body).then(r => {
      alert.success('作成しました')
      setKey('')
      setDescription('')
      setShow(false)
      fetchSearchResult()
    }).catch(r => {
      alert.error(r.error)
    })
  }

  const handleClipBoardCopy = () => {
    navigator.clipboard.readText().then(text => {
      const match = text.match(new RegExp(`${key}=([^&]+)`))
      if (match) {
        setDescription(p => `${p}[${match[1]}]`)
      }
    })
  }

  return (
    <Card
      sx={{
        margin: '20px 0',
        background: '#F6FBFF',
        '&:hover': {
          ...(!show && { background: '#F1F6FF' })
        }
      }}
    >
      <CardContent
        {...( !show && {
          onClick: () => setShow(true),
          sx: {
            cursor: 'pointer'
          }
        })}
      >
        {show ? <>
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '10px'
            }}
          >
            <TextField
              fullWidth
              multiline
              minRows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              label='コメント'
              placeholder={'[角括弧]でボタン化'}
              sx={{ margin: '5px' }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Button
              onClick={handleSubmit}
              variant="outlined"
              sx={{
                margin: 'auto 10px',
                textTransform: 'none'
              }}
            >
              追加
            </Button>

            <Tooltip title={`クリップボードのURLから ${key}= の値を取得します`} arrow>
              <Button
                variant="outlined"
                disabled={!key}
                onClick={handleClipBoardCopy}
                sx={{
                  margin: '5px',
                  textTransform: 'none'
                }}
              >
                クリップボードから値を取得
              </Button>
            </Tooltip>
            <Button
              onClick={() => setShow(p => !p)}
              variant="outlined"
              color={'inherit'}
              sx={{
                margin: 'auto 10px',
                textTransform: 'none'
              }}
            >
              閉じる
            </Button>
          </Box>
        </> : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography
              sx={{
                fontSize: '20px'
              }}
            >
              キーを追加
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
