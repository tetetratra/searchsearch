export const requestApi = (url, method, body) => {
  const csrf = localStorage.getItem('csrf-token')

  return fetch(new URL('/api' + url, process.env.REACT_APP_SERVER_URL), {
    method,
    headers: {
      "content-type": "application/json",
      ...(csrf && { "x-csrf-token": csrf })
    },
    body: JSON.stringify(body)
  }).catch(r => {
    throw { error: 'ネットワークエラー' }
  }).then(r => {
    const csrf = r.headers.get('x-csrf-token')
    if (csrf) {
      localStorage.setItem('csrf-token', csrf)
    }
    return r
  }).then(r =>
    r.ok ? r.json() : r.json().then(json => { throw json })
  )
}
