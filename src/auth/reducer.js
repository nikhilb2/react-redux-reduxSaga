import * as actions from './constants'

const initialState = {
  authorized: false,
  signinin: false,
  signinError: null,
  signinup: false,
  signupError: null,
  user: null,
  marsh: null,
  loadingCountries: false,
  loadingCountriesError: null,
  countries: null,
  loadingFoodPrefs: false,
  loadingFoodPrefsError: null,
  foodPrefs: null,
  updatingProfile: false,
  updateProfileError: null,
  forgotpassword: false,
  forgotpasswordError: null,
  forgotpasswordResult: null,
  googleSignInResult: null,
  googleSigninInitiated: false,
  googleSigninError: null,
}

const signinReducer = (state = initialState, action) => {
//  //console.log(action);
  switch (action.type) {
    case actions.LOGOUT_DONE:
      return Object.assign({}, state, {
        authorized: false,
        user: null,
        marsh: null
      })
    case actions.SIGNIN:
      return Object.assign({}, state, {
        signinin: true,
        signinError: null
      })
    case actions.SIGNIN_SUCCESS:
      return Object.assign({}, state, {
        signinin: false,
        signinError: null,
        user: action.result.data.data,
        marsh: action.result.data.marsh,
        authorized: true
      })
    case actions.SIGNIN_FAILED:
      return Object.assign({}, state, {
        signinin: false,
        signinError: action.error,
        authorized: false
      })

    case actions.SIGNUP:
      return Object.assign({}, state, {
        signinup: true,
        signupError: null
      })
    case actions.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        signinup: false,
        signupError: null
      })
    case actions.SIGNUP_FAILED:
      return Object.assign({}, state, {
        signinup: false,
        signupError: action.error
      })

    case actions.RESTORE_SESSION_SUCCESS:
      return Object.assign({}, state, {
        user: action.session ? action.session.data : null,
        marsh: action.session ? action.session.marsh : null,
        authorized: !!action.session
      })

    case actions.LOAD_COUNTRIES_LIST:
      return Object.assign({}, state, {
        loadingCountriesError: false,
        loadingCountries: true
      })
    case actions.LOAD_COUNTRIES_LIST_SUCCESS:
      return Object.assign({}, state, {
        loadingCountries: false,
        countries: action.data.data.results
      })
    case actions.LOAD_COUNTRIES_LIST_FAILED:
      return Object.assign({}, state, {
        loadingCountries: false,
        loadingCountriesError: action.error
      })

    case actions.LOAD_FOOD_PREF_LIST:
      return Object.assign({}, state, {
        loadingFoodPrefs: true,
        loadingFoodPrefsError: false
      })
    case actions.LOAD_FOOD_PREF_LIST_SUCCESS:
      return Object.assign({}, state, {
        loadingFoodPrefs: false,
        foodPrefs: action.data.data.results
      })
    case actions.LOAD_FOOD_PREF_LIST_FAILED:
      return Object.assign({}, state, {
        loadingFoodPrefs: false,
        loadingFoodPrefsError: action.error
      })

    // get profile
    case actions.LOAD_PROFILE:
      return Object.assign({}, state, {
        loadingProfileInfo: true
      })
    case actions.LOAD_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        loadingProfileInfo: false,
        user: action.result.data.data
      })
    case actions.LOAD_PROFILE_FAILED:
      return Object.assign({}, state, {
        loadingProfileInfo: false,
        failError: 'Load profile failed'
      })

    // update profile
    case actions.UPDATE_PROFILE:
      return Object.assign({}, state, {
        updatingProfile: true,
        updateProfileError: null
      })
    case actions.UPDATE_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        updatingProfile: false,
        user: action.result.data.data
      })
    case actions.UPDATE_PROFILE_FAILED:
      return Object.assign({}, state, {
        updatingProfile: false,
        updateProfileError: action.error
      })

      case actions.FORGOT_PASSWORD:
        return Object.assign({}, state, {
          forgotpasswordBool: true,
          forgotpasswordError: null
        })
      case actions.FORGOT_PASSWORD_SUCCESS:
        return Object.assign({}, state, {
          forgotpasswordBool: false,
          forgotpasswordError: null,
          forgotpasswordResult: action.result.data.message
        })
      case actions.FORGOT_PASSWORD_FAILED:
        return Object.assign({}, state, {
          forgotpasswordBool: false,
          forgotpasswordError: action.result.data.error
        })
      case actions.VALIDATE_JWT:
        return Object.assign({}, state, {
          validatingJwt: true,
          validateJwtError: null
        })
      case actions.VALIDATE_JWT_SUCCESS:
        return Object.assign({}, state, {
          validatingJwt: false,
          validateJwtError: null,
          validateJwtResult: action.result.status
        })
      case actions.VALIDATE_JWT_FAILED:
        return Object.assign({}, state, {
          validatingJwt: false,
          validateJwtError: "something went wrong"
        })
      case actions.INITIATE_GOOGLE_SIGNIN:
        return Object.assign({}, state, {
          googleSigninInitiated: true,
          googleSigninError: null
        })
      case actions.GOOGLE_SIGNIN_SUCCESS:
        return Object.assign({}, state, {
          googleSigninInitiated: false,
          googleSigninError: null,
          googleSignInResult: action.result
        })
      case actions.VALIDATE_JWT_FAILED:
        return Object.assign({}, state, {
          googleSigninInitiated: false,
          googleSignInResult: action.error
        })
    default:
      return state
  }
}

export default signinReducer
