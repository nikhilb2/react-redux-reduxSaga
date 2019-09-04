import { SIGNIN, SIGNUP, RESTORE_SESSION, LOGOUT, LOAD_COUNTRIES_LIST,
  LOAD_FOOD_PREF_LIST, LOAD_PROFILE, UPDATE_PROFILE, FORGOT_PASSWORD, VALIDATE_JWT, INITIATE_GOOGLE_SIGNIN } from './constants'
import request, { requestUploadImage } from '../request'
import {
  signinsuccess,
  signinfailed,
  restoreSessionSuccess,
  logoutDone,
  loadCountriesListSuccess,
  loadCountriesListFailed,
  loadFoodPrefListSuccess,
  loadFoodPrefListFailed,
  signupsuccess,
  signupfailed,
  loadProfileInfoSuccess,
  loadProfileInfoFailed,
  updateProfileSuccess,
  updateProfileFailed,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  validateJwtSuccess,
  validateJwtFailed
} from './actions'
import { all, put, call, throttle, takeLatest } from 'redux-saga/effects'
import { login, logout, currentSession} from './UserSession'
import i18n from 'i18next'

function* requestSignin(action) {
  const credentials = { email: action.email, password: action.password }
  const requestURL = '/login.php'
  const signin = yield call(request, requestURL, {
    method: 'POST',
    header: { 'Content-Type': 'application/json' },
    body: credentials
  })
  //console.log(signin)
  if (!signin.err) {
    yield call(login, {
      data: signin.data.data,
      jwt: signin.data.jwt,
      marsh: signin.data.marsh
    })
    yield put(signinsuccess(signin))
  } else {
    yield put(signinfailed(signin.err))
  }
}

function* requestSignup(action) {
  const requestURL = `/create_user.php`
  const signupRes = yield call(request, requestURL, {
    method: 'POST',
    header: { 'Content-Type': 'application/json' },
    body: {
      email: action.email,
      username: action.username,
      password: action.password,
      firstname: action.firstName,
      lastname: action.lastName,
      country: action.country,
      foodpref: action.foodpref
    }
  })
//  //console.log(signupRes)
  if (!signupRes.err && !signupRes.data.error) {
    yield put(signupsuccess(signupRes))
    yield call(requestSignin, action)
  } else {
    const error = signupRes.err || signupRes.data.error
    yield put(signupfailed(error))
  }
}

export function* requestLogout(action) {
  yield call(logout)
  yield put(logoutDone())
}

function* requestLoadCountries(action) {
  const requestURL = `/get_country.php`
  const countries = yield call(request, requestURL, {
    method: 'GET',
    header: { 'Content-Type': 'application/json' }
  })
  if (!countries.err && !countries.data.error) {
    yield put(loadCountriesListSuccess(countries))
  } else {
    yield put(loadCountriesListFailed(countries.err.message))
  }
}

function* requestLoadFoodPrefs(action) {
  const requestURL = `/get_food_pref.php?langid=${i18n.language}`
  const foodPrefs = yield call(request, requestURL, {
    method: 'GET',
    header: { 'Content-Type': 'application/json' }
  })
  //console.log(foodPrefs)
  if (!foodPrefs.err && !foodPrefs.data.error) {
    yield put(loadFoodPrefListSuccess(foodPrefs))
  } else {
    yield put(loadFoodPrefListFailed(foodPrefs.err.message))
  }
}

function* getProfile(action) {
  const requestURL = `/user_profile.php?id=${action.userId || ''}`
  const profile = yield call(request, requestURL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  },
  true)
  //console.log(profile)
  if (!profile.err && !profile.data.error) {
    yield put(loadProfileInfoSuccess(profile))
  } else {
    yield put(loadProfileInfoFailed(profile.err || profile.data.error))
    if (profile.err && profile.err.httpErrCode === 401) {
      yield call(logout)
      yield put(logoutDone())
    }
  }
}

function* requestUpdateProfile(action) {
  let imageResult = { data: { images: []} }
  //console.log(action)
  if (action.newData.avatarUri) {
    const formData = new FormData()
    const fileNamePos = action.newData.avatarUri.lastIndexOf('/')
    const fileName = fileNamePos !== -1
      ? action.newData.avatarUri.slice(fileNamePos + 1)
      : null
    if (fileName) {
      formData.append(`fileToUpload[0]`, { uri: action.newData.avatarUri, type: 'image/*', name: fileName })
      imageResult = yield call(requestUploadImage, formData)
    }
  }
  //console.log(imageResult)
  let imageUrl
  if (!imageResult.err && !imageResult.data.error && imageResult.data.images.length > 0) {
    imageUrl = imageResult.data.images[0]
  }

  const requestURL = '/update_profile.php'
  const params = {}
  if (action.newData.firstname) { params.firstname = action.newData.firstname }
  if (action.newData.lastname) { params.lastname = action.newData.lastname }
  if (action.newData.country) { params.country = action.newData.country.id }
  if (action.newData.foodpref) { params.foodpref = action.newData.foodpref.id }
  if (imageUrl) { params.photo = imageUrl }
  console.log(params);
  const result = yield call(request, requestURL, {
    method: 'POST',
    header: { 'Content-Type': 'application/json' },
    body: params
  }, true)
  console.log(result)
  if (!result.err && !result.data.error) {
    yield put(updateProfileSuccess(result))
  } else {
    yield put(updateProfileFailed(result.err || result.data.error))
  }
}

function* forgotPassword(action) {
  const requestURL = `/get_password_reset_mail.php?email=${action.email}`
  const getEmail = yield call(request, requestURL, {
    method: 'GET',
    header: { 'Content-Type': 'application/json' }
  })
  //console.log(getEmail)
  if (!getEmail.err && !getEmail.data.error) {
    yield put(forgotPasswordSuccess(getEmail))
  } else {
    yield put(forgotPasswordFailed(getEmail.err.message))
  }
}

function* validateJwt() {
  const requestURL = `/validate_token.php`
  const validate = yield call(request, requestURL, {
    method: 'GET',
    header: { 'Content-Type': 'application/json' }
  }, true)
  if (!validate.err) {
    yield put(validateJwtSuccess(validate))
    if (!validate.data.status) {
      yield call(logout)
      yield put(logoutDone())
    }
  } else {
    yield put(validateJwtFailed(validate.err.message))
  }
}


function* requestRestoreSession(action) {
  const session = yield call(currentSession)
  yield put(restoreSessionSuccess(session))
}

function* resoreSessionSaga () {
  yield takeLatest(RESTORE_SESSION, requestRestoreSession)
}

function* signinSaga () {
  yield takeLatest(SIGNIN, requestSignin)
}

function* signupSaga () {
  yield takeLatest(SIGNUP, requestSignup)
}

function* logoutSaga () {
  yield takeLatest(LOGOUT, requestLogout)
}

function* loadCountriesSaga () {
  yield takeLatest(LOAD_COUNTRIES_LIST, requestLoadCountries)
}

function* loadFoodPrefsSaga () {
  yield takeLatest(LOAD_FOOD_PREF_LIST, requestLoadFoodPrefs)
}

export function* loadProfileSaga () {
  yield takeLatest(LOAD_PROFILE, getProfile)
}

export function* updateProfileSaga () {
  yield takeLatest(UPDATE_PROFILE, requestUpdateProfile)
}
function* forgotPasswordSaga () {
  yield takeLatest(FORGOT_PASSWORD, forgotPassword)
}
function* validateJwtSaga () {
  yield takeLatest(VALIDATE_JWT, validateJwt)
}

function* mainSaga() {
  yield all([
    call(signinSaga),
    call(signupSaga),
    call(resoreSessionSaga),
    call(logoutSaga),
    call(loadCountriesSaga),
    call(loadFoodPrefsSaga),
    call(loadProfileSaga),
    call(updateProfileSaga),
    call(forgotPasswordSaga),
    call(validateJwtSaga)
  ])
}

export default mainSaga
