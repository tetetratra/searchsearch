import {
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  Divider,
  List,
} from '@mui/material';

import { Description } from './Description.js'
import { NewComment } from './NewComment.js'

export const QueryString = ({ queryString, setSearchResult, fetchSearchResult }) => {
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
