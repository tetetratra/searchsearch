import _ from 'lodash'
import {
  Button,
  ListItem,
  ListItemText
} from '@mui/material';

export const Description = ({ description, setQueryStringValue }) => {
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

