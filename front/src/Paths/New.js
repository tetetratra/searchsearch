import { useAlert } from 'react-alert'
import {
  Avatar,
  Typography,
  Card,
  CardContent,
} from '@mui/material'

import { requestApi } from './../api.js'
import { formatPath } from './../utils.js'

export const New = ({ searchParams, setSearchParams, searchResults }) => {
  const alert = useAlert()

  const formattedUrl = formatPath(searchParams.q)

  const handleClick = () => {
    const body = { name: formattedUrl }
    requestApi('/paths', 'POST', body).then(r => {
      alert.success('作成しました')
      setSearchParams(prevSearchParams => ({
        ...prevSearchParams,
        q: formattedUrl
      }))
    }).catch(r => {
      alert.error(r.error)
    })
  }

  const alreadyExists = searchResults?.some(sr => sr.name === formattedUrl)

  return formattedUrl && !alreadyExists && (
    <Card sx={{ margin: '20px 0' }}>
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          background: '#DEF',
          cursor: 'pointer',
          '&:hover': {
            background: '#CDE'
          }
        }}
        onClick={handleClick}
      >
        <Avatar
          sx={{
            width: '18px',
            height: '18px',
            margin: '10px'
          }}
          src={`https://icons.duckduckgo.com/ip3/${formattedUrl.split('/')[0]}.ico`}
          alt={`${formattedUrl.split('/')[0]} favicon`}
          variant='rounded'
        />
        <Typography
          sx={{
            marginLeft: '10px',
            fontSize: '20px'
          }}
        >
          {formattedUrl} を追加
        </Typography>
      </CardContent>
    </Card>
  )
}
