import { currentSession } from './auth/UserSession'

const API_ROOT = 'http://zefiri.com/api'
export const IMAGE_API_ROOT = 'http://zefiri.com/api'
const IMAGE_UPLOAD_API_ROOT = `http://zefiri.com/api/upload.php`
const dev = true;
function parseJSON(response) {
  //console.log(response);
  return response.json().catch(ex => {
    const error = new Error(ex)
    error.response = response
    error.jsonFailed = true
    throw error
  })
}

function checkStatus(response) {
  //console.log(response);
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  error.httpErrCode = response.status
  throw error
}

export default function request(url, options, addauth, addSign = '&') {
  const decoratedOptions = Object.assign({}, options)


  let decoratedUrl = url
  if (dev) {
    if (decoratedUrl.includes('?')) {
      decoratedUrl = decoratedUrl+'&dev=true'
    } else {
      decoratedUrl = decoratedUrl+'?dev=true'
    }
  }

  console.log(decoratedUrl);
  if (addauth && currentSession && currentSession.jwt) {
    decoratedOptions.headers = decoratedOptions.headers || {};
    decoratedOptions.headers.jwt = currentSession.jwt;
    if (decoratedOptions.method === 'POST') {
      decoratedOptions.body = decoratedOptions.body || {}
    }
  }
  console.log(decoratedOptions);

  if (decoratedOptions.body) {
    decoratedOptions.body = JSON.stringify(decoratedOptions.body)
  }


  //console.log(`${API_ROOT}${decoratedUrl}`)
  return fetch(`${API_ROOT}${decoratedUrl}`, decoratedOptions) // eslint-disable-line
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }))
}

export function requestUploadImage(formData) {
  if (currentSession && currentSession.jwt) {
    //formData.append('jwt', currentSession.jwt)
  }
   //console.log(formData)
  const options = {
    method: 'POST',
    body: formData,
    header: {
      //'Content-Type': 'application/json'
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  }
  return fetch(IMAGE_UPLOAD_API_ROOT, options) // eslint-disable-line
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }))
}
