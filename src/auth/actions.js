import * as actions from './constants'

export const restoreSession = () => ({
  type: actions.RESTORE_SESSION
})

export const restoreSessionSuccess = session => ({
  type: actions.RESTORE_SESSION_SUCCESS,
  session
})

export const signin = (email, password) => ({
  type: actions.SIGNIN,
  email,
  password
})

export const signinsuccess = result => ({
  type: actions.SIGNIN_SUCCESS,
  result
})

export const signinfailed = error => ({
  type: actions.SIGNIN_FAILED,
  error
})
export const forgotPassword = (email) => ({
  type: actions.FORGOT_PASSWORD,
  email
})

export const forgotPasswordSuccess = result => ({
  type: actions.FORGOT_PASSWORD_SUCCESS,
  result
})

export const forgotPasswordFailed = error => ({
  type: actions.FORGOT_PASSWORD_FAILED,
  error
})


export const signup = (email, password, username, firstName, lastName, country, foodpref) => ({
  type: actions.SIGNUP,
  email,
  password,
  username,
  firstName,
  lastName,
  country,
  foodpref
})

export const signupsuccess = result => ({
  type: actions.SIGNUP_SUCCESS,
  result
})

export const signupfailed = error => ({
  type: actions.SIGNUP_FAILED,
  error
})

export const logout = () => ({
  type: actions.LOGOUT
})

export const logoutDone = () => ({
  type: actions.LOGOUT_DONE
})




export const loadCountriesList = () => ({
  type: actions.LOAD_COUNTRIES_LIST
})

export const loadCountriesListSuccess = data => ({
  type: actions.LOAD_COUNTRIES_LIST_SUCCESS,
  data
})

export const loadCountriesListFailed = error => ({
  type: actions.LOAD_COUNTRIES_LIST_FAILED,
  error
})


export const loadFoodPrefList = () => ({
  type: actions.LOAD_FOOD_PREF_LIST
})

export const loadFoodPrefListSuccess = data => ({
  type: actions.LOAD_FOOD_PREF_LIST_SUCCESS,
  data
})

export const loadFoodPrefListFailed = error => ({
  type: actions.LOAD_FOOD_PREF_LIST_FAILED,
  error
})

// get profile
export const loadProfileInfo = userId => ({
  type: actions.LOAD_PROFILE,
  userId
})

export const loadProfileInfoSuccess = result => ({
  type: actions.LOAD_PROFILE_SUCCESS,
  result
})

export const loadProfileInfoFailed = error => ({
  type: actions.LOAD_PROFILE_FAILED,
  error
})

// update profile
export const updateProfile = newData => ({
  type: actions.UPDATE_PROFILE,
  newData
})

export const updateProfileSuccess = result => ({
  type: actions.UPDATE_PROFILE_SUCCESS,
  result
})

export const updateProfileFailed = error => ({
  type: actions.UPDATE_PROFILE_FAILED,
  error
})

// validate jwt
export const validateJwt = () => ({
  type: actions.VALIDATE_JWT,
})

export const validateJwtSuccess = result => ({
  type: actions.VALIDATE_JWT_SUCCESS,
  result
})

export const validateJwtFailed = error => ({
  type: actions.VALIDATE_JWT_FAILED,
  error
})

// google signin
export const initiateGoogleSigin = () => ({
  type: actions.INITIATE_GOOGLE_SIGNIN,
})

export const googleSigninSuccess = result => ({
  type: actions.GOOGLE_SIGNIN_SUCCESS,
  result
})

export const googleSigninFailed = error => ({
  type: actions.GOOGLE_SIGNIN_FAILED,
  error
})
