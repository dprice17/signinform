
import { loginFormConfigurations, userLoginInfo } from './signinFormConfiguration.js';

const getElement = (id) => document.getElementById(id);

const formElements = {
  loginFormContainer: getElement('login-form-container'),
  formContainer: getElement('form-container'),
  headerLogoContainer: getElement('header-logo-container'),
  headerH1: getElement('header-h1'),
  headerTagline: getElement('header-tagline'),
  signInMessage: getElement('sign-in-message'),
  userNameEmailInputField: getElement('username-email-input'),
  passwordInputField: getElement('password-input'),
  signinBtn: getElement('login-button')
}


const configureForm = () => {
  const {
      formBackgroundColor, 
      logo, 
      companyName, 
      tagline, 
      buttonColor,
      buttonTextColor,
      inputFieldColor,
      signInCallToAction,
      buttonTxt,
      loginSuccessText,
      loginLoadingScreenSVG
      } = loginFormConfigurations
      
  const {
        loginFormContainer,
        formContainer, 
        headerLogoContainer, 
        headerH1, 
        headerTagline, 
        signinBtn,
        userNameEmailInputField,
        passwordInputField,
        signInMessage
    }  = formElements
  
  headerLogoContainer.innerHTML = `<img class="header-logo" src="${logo}"/>`
  headerH1.textContent = companyName
  headerTagline.textContent = tagline
  signInMessage.textContent = signInCallToAction
  signinBtn.textContent = buttonTxt
  
  loginFormContainer.style.backgroundColor = formBackgroundColor
  signinBtn.style.backgroundColor = buttonColor
  signinBtn.style.color = buttonTextColor
  userNameEmailInputField.style.backgroundColor = inputFieldColor
  passwordInputField.style.backgroundColor = inputFieldColor
}

const renderSignInForm = () => {
    configureForm()
}

 let userLogin = {
     enteredUserName: '',
     enteredPassWord: ''
 }
    

const handleUserInput = (event) => {
    const { id, value } = event.target
    
    if(id === 'username-email-input'){
        userLogin.enteredUserName = value
        
    } else if(id === 'password-input'){
         userLogin.enteredPassWord = value
    }
    
}

const verifyLoginCredentials = (event) => {
    event.preventDefault()
    
    const { enteredUserName,enteredPassWord } = userLogin
    const { storedUserName, storedPassword } = userLoginInfo
    
    const verifiedUserName = enteredUserName === storedUserName;
    const verifiedPassWord = enteredPassWord === storedPassword;
    
    const { userNameEmailInputField, passwordInputField } = formElements
    
    if(verifiedUserName && verifiedPassWord){
        renderSignedInPage(true)
        
    } else {
        userNameEmailInputField.value = ''
        passwordInputField.value = ''
        renderSignedInPage(false)  
    }
}


const renderSignedInPage = (boolean) => {
    const { 
            loginSuccessText, 
            incorrectUserNamePasswordTxt, 
            incorrectUserNamePasswordTxtColor,
            loginLoadingScreenSVG 
        } = loginFormConfigurations
    
    const { loginFormContainer, signInMessage } = formElements
    
   
    if(boolean){
         loginFormContainer.innerHTML = `
            <div class="login-success-page">
                <h3 class="logging-in-message">Logging in.....</h3>
                <img 
                    id="login-loading-svg"
                    class="login-loading-svg" 
                    src=${loginLoadingScreenSVG} 
                />
            </div>
        `
      
        setTimeout(() => {
            loginFormContainer.innerHTML = `
            <div class="login-success-page">
                <h3>${loginSuccessText}</h3>
            </div>
           `  
        }, 3000)
        
    } else {
        signInMessage.textContent = incorrectUserNamePasswordTxt
        signInMessage.style.color = incorrectUserNamePasswordTxtColor
    }
}

formElements.userNameEmailInputField.addEventListener('change', handleUserInput)
formElements.passwordInputField.addEventListener('change', handleUserInput)
formElements.formContainer.addEventListener('submit', verifyLoginCredentials)

renderSignInForm()


