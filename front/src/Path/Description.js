import { useContext } from 'react';
import _ from 'lodash'
import { useAlert } from 'react-alert'
import { confirmAlert } from 'react-confirm-alert'
import {
  Button,
  ListItem,
  ListItemText
} from '@mui/material'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

import { requestApi } from './../api.js'
import { LoginContext } from './../App'

export const Description = ({ description, setQueryStringValue, fetchSearchResult }) => {
  const alert = useAlert()
  const user = useContext(LoginContext)

  const regexSplitByBrackets = /\[.*?\]/g
  const regexRemoveBrackets = /^\[|\]$/g

  const handleClick = str => e => {
    setQueryStringValue(str.replace(regexRemoveBrackets, ''))
  }

  const handleDelete = () => {
    confirmAlert({
      title: '投稿を削除しますか?',
      message: '',
      buttons: [
        {
          label: 'キャンセル',
          onClick: () => null
        },
        {
          label: '削除する',
          onClick: () => {
            requestApi(`/query_string_descriptions/${description.id}`, 'DELETE').then(r => {
              alert.success('削除しました')
              fetchSearchResult()
            }).catch(r => {
              alert.error(r.error)
            })
          }
        }
      ]
    })
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
          margin: '3px',
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
        margin: '10px auto',
        display: 'flex',
        flexWrap: 'wrap'
      }}
    >
      <ListItemText
        sx={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all'
        }}
        primary={formatted}
        secondary={description.user && `@${description.user.name}`}
      />
      <span style={{ margin: 'auto 7px', fontSize: '15px', color: '#555' }}>
        { description.created_at.match(/(\d{4}-\d{2}-\d{2}).+?(\d{2}:\d{2})/).slice(1).join(' ') }
      </span>
      { description.user && user.id === description.user.id && (
        <FontAwesomeIcon
          onClick={handleDelete}
          icon={faTrash}
          style={{
            width: '15px',
            height: '15px',
            color: '#999',
            cursor: 'pointer'
          }}
        />
      )}
    </ListItem>
  )
}

