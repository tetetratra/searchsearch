const request = (url, method, body) => {
  console.log(process.env.REACT_APP_SERVER_URL)
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

export const api = {
  url: {
    index: path => request('/urls' + (path ? `?path=${path}` : ''), 'GET'),
    show: url => request(`/urls/${url}`, 'GET'),
    create: path => request(`/urls`, 'POST', { path })
  },
  queryString: {
    create: (urlId, key, description) => request('query_strings', 'POST', { url_id: urlId, key, description })
  }
}
