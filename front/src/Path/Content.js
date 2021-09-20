import {
  Container
} from '@mui/material';

import { QueryString } from './QueryString.js'
import { NewKey } from './NewKey.js'
import { ConstructedUrl } from './ConstructedUrl.js'
import { loaderIcon } from './../utils.js'

export const Content = ({ searchResult, setSearchResult, fetchSearchResult }) => {
  return <>
    <Container sx={{ paddingBottom: '150px' }}>
      {searchResult ? <>
        {searchResult.query_string_keys.map((qs, i) =>
          <QueryString key={i}
            queryString={qs}
            setSearchResult={setSearchResult}
            fetchSearchResult={fetchSearchResult}
          />
        )}
        <NewKey searchResult={searchResult} setSearchResult={setSearchResult} fetchSearchResult={fetchSearchResult}/>
      </> :
        loaderIcon
      }
    </Container>
    {searchResult && <ConstructedUrl searchResult={searchResult}/>}
  </>
}

