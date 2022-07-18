// Assignment code here
var pwlength, lowercase, uppercase, numberic, specialchar;
var isTesting = true;
const lower = "abcdefghijklmnopqrstuvwxyz";
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*_-+=";

//hide the criteria section initally
function init(){
  hideElement('step2');
  hideElement('step3');
  hideElement('step4');
}


function step2ft () {
  hideElement('step1');
  showElement('step2');
}

function step3ft () {
  hideElement('step2');
  showElement('step3');

}

function step4ft () {
  pwlength = document.getElementById("pwlength").value;
  console.debug(pwlength);
  
  //check if the length of password matches criteria or not
  if (pwlength<8 || pwlength>128)
  {
    alert("Incorrect password length")
    return;
  }
  else {
    hideElement('step3');
    showElement('step4');
  }
}


//hide element
function hideElement(elementId){
  document.getElementById(elementId).style.display = 'none';
}

//show element
function showElement(elementId){
  document.getElementById(elementId).style.display = 'block';
}

// Get references to button element
var generateBtn = document.querySelector("#generate");
var NextCriteriaBtn = document.querySelector("#NextCriteria");
var NextLengthBtn = document.querySelector("#NextLength");
var SubmitBtn = document.querySelector("#Submit");


// Write password to the #password input
function writePassword() {
  lowercase = document.getElementById("Lowercase");
  uppercase = document.getElementById("Uppercase");
  numberic = document.getElementById("Numberic");
  specialchar = document.getElementById("SpecialChar");
  console.debug(lowercase.checked);
  console.debug(uppercase.checked); 
  console.debug (numberic.checked); 
  console.debug(specialchar.checked);

  var x = lowercase.checked + uppercase.checked + numberic.check + specialchar.checked;
  console.log(x);

  //check if the character type selected or not
  if (lowercase.checked || uppercase.checked || numberic.checked ||specialchar.checked) {
    var password = generatePassword(lowercase.checked, uppercase.checked, numberic.checked, specialchar.checked, pwlength);
    var passwordText = document.querySelector("#password");
    passwordText.value = password;

    hideElement('step2');
    hideElement('step3');
    hideElement('step4');
    showElement('step1');
   }
  else {
    alert ("At least one type of character must be selected")
    return;
  }

}

function generatePassword (hasLowercase, hasUppercase, hasNumber, hasSymbol, passwordLength) {
  var tempPassword = [];

  //define the char string
  charset = "" ;     
  if (hasLowercase === true) {
    charset += lower;
    tempPassword.push(lower.charAt(Math.floor(Math.random() * lower.length)));
  }
  if (hasUppercase === true) {
    charset += upper;
    tempPassword.push(upper.charAt(Math.floor(Math.random() * upper.length)));
  }
  if (hasNumber === true) {
    charset += numbers;
    tempPassword.push(numbers.charAt(Math.floor(Math.random() * numbers.length)));
  }
  if (hasSymbol === true) {
    charset += symbols;
    tempPassword.push(symbols.charAt(Math.floor(Math.random() * symbols.length)));
  }

  // random to generate the charactor to array
  for (var i = tempPassword.length; i < passwordLength; i++) {
    tempPassword.push(charset.charAt(Math.floor(Math.random() * charset.length)));
  }

  //rearrange the character of the password to make it real random
  var pw = '';
  for (var i = 0; i < passwordLength; i++) {
    var charIndex = Math.floor(Math.random() * tempPassword.length);
    pw += tempPassword[charIndex];
    tempPassword.splice(charIndex, 1);
  }
  return pw;
}

// for validate the password matches criteria or not
function validatePasswordMatchedRules(password, hasLowercase, hasUppercase, hasNumber, hasSymbol, passwordLength){
  var result = true;

  if(password.length != passwordLength){
    result = false;
    console.log('The password length is incorrect.');    
  }

  if(hasLowercase){
    var foundLowercase = false;
    for(var i=0; i<lower.length; i++){
      if(password.includes(lower.charAt(i))){
        foundLowercase = true;
        break;
      }        
    }
    if(!foundLowercase){
      result = false;
      console.log('The password is missing lowercase character.');
    }
  }

  if(hasUppercase){
    var foundUppercase = false;
    for(var i=0; i<upper.length; i++){
      if(password.includes(upper.charAt(i))){
        foundUppercase = true;
        break;
      }        
    }
    if(!foundUppercase){
      result = false;
      console.log('The password is missing uppercase character.');
    }
  }

  if(result)
    console.log('The password is passed the validation.');

  return result;
}

function unitTests(){
  if(!isTesting) return;

  //test has lowercase only
  var pw1 = generatePassword(true, false, false, false, 8);
  console.log('Test only lowercase password: ' + pw1);
  validatePasswordMatchedRules(pw1, true, false, false, false, 8);

  //test has uppercase only
  var pw2 = generatePassword(false, true, false, false, 8);
  console.log('Test only uppercase password: ' + pw2);
  validatePasswordMatchedRules(pw2, false, true, false, false, 8);

  //test has number only
  var pw3 = generatePassword(false, false, true, false, 8);
  console.log('Test only number password: ' + pw3);
  validatePasswordMatchedRules(pw3, false, false, true, false, 8);
  
  //test has symbols only
  var pw4 = generatePassword(false, false, false, true, 8);
  console.log('Test only symbol password: ' + pw4);
  validatePasswordMatchedRules(pw2, false, false, false, true, 8);

  //test normal password
  var pw5 = generatePassword(true, true, true, true, 8);
  console.log('Test normal password: ' + pw5);
  validatePasswordMatchedRules(pw5, true, true, true, true, 8);

  //test long password only
  var pw6 = generatePassword(true, true, true, true, 128);
  console.log('Test long password: ' + pw6);
  validatePasswordMatchedRules(pw6, true, true, true, true, 128);
  
}

// Add event listener to buttons
generateBtn.addEventListener("click", step2ft);
NextCriteriaBtn.addEventListener("click", step3ft);
NextLengthBtn.addEventListener("click", step4ft);
SubmitBtn.addEventListener("click", writePassword);
init();
unitTests();