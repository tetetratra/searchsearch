export const requestApi = (url, method, body) => {
  return fetch(new URL(url, process.env.REACT_APP_SERVER_URL), {
    method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  }).catch(r => {
    throw { error: 'ネットワークエラー' }
  }).then(r =>
    r.ok ? r.json() : r.json().then(json => { throw json })
  )
}
