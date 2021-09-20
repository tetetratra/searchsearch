import {
  Container
} from '@mui/material';

export const ConstructedUrl = ({ searchResult }) => {
  const filteredQueryStringKeys = searchResult.query_string_keys.filter(qsk => qsk.value)
  const constructedHref = `https://${searchResult.name}?` +
    filteredQueryStringKeys.map(qsk => `${encodeURIComponent(qsk.key)}=${encodeURIComponent(qsk.value)}`).join('&')
  const constructedUrl = `https://${searchResult.name}?` +
    filteredQueryStringKeys.map(qsk => `${qsk.key}=${qsk.value.replace(/\+/g, '%2B').replace(/\s/g, '+')}`).join('&')
  return (
    <a target='_blank' href={constructedHref}>
      <Container
        sx={{
          position: 'fixed',
          background: '#EEEEEEE0',
          width: '96%',
          height: 'auto',
          padding: '3px',
          minHeight: '60px',
          maxWidth: '800px',
          bottom: '40px',
          right: '2%',
          left: '2%',
          borderRadius: '10px',

          display: 'flex',
          alignItems: 'center',
          '&:hover': {
            background: '#E8E8E8E0'
          }
        }}
      >
        <span
          style={{
            fontSize: '24px',
            textDecoration: 'none',
            color: '#555',
          }}
        >
          {constructedUrl}
        </span>
      </Container>
    </a>
  )
}

