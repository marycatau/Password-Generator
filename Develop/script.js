// Assignment code here


var pwlength, lowercase, uppercase, numberic, specialchar;

//hide the criteria section initally
function init(){
  hideElement('step2');
  hideElement('step3');
  hideElement('step4');
}


function step2ft () {
  showElement('step2');
}

function step3ft () {
  showElement('step3');

}

function step4ft () {
  pwlength = document.getElementById("pwlength").value;
  console.log (pwlength);
  
  //check if the length of password matches criteria or not
  if (pwlength<8 || pwlength>128)
  {
    alert("Incorrect password length")
    return;
  }
  else {
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
  console.log(lowercase.checked);
  console.log(uppercase.checked); 
  console.log (numberic.checked); 
  console.log(specialchar.checked);

  //double-check if the length of password matches criteria or not
  pwlength = document.getElementById("pwlength").value;
  console.log (pwlength);
  if (pwlength<8 || pwlength>128){
    alert("Incorrect password length")
    return;
  }

  var x = lowercase.checked + uppercase.checked + numberic.check + specialchar.checked;
  console.log(x);

  //check if the character type selected or not
  if (lowercase.checked || uppercase.checked || numberic.checked ||specialchar.checked) {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");
    passwordText.value = password;

    hideElement('step2');
    hideElement('step3');
    hideElement('step4');
   }
  else {
    alert ("At least one type of character must be selected")
    return;
  }

}



function generatePassword () {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*_-+=";

  //define the char string
  charset = "" ;     
  if (lowercase.checked === true) {
    charset += lower;
  }
  if (uppercase.checked === true) {
    charset += upper;
  }
  if (numberic.checked === true) {
    charset += numbers;
  }
  if (specialchar.checked === true) {
    charset += symbols;
  }

  // random to generate the password
  var pw="";
  for (var i = 0, n = charset.length; i < pwlength; ++i) {
    pw += charset.charAt(Math.floor(Math.random() * n));
  }
  return pw;
}


// Add event listener to buttons

generateBtn.addEventListener("click", step2ft);
NextCriteriaBtn.addEventListener("click", step3ft);
NextLengthBtn.addEventListener("click", step4ft);
SubmitBtn.addEventListener("click", writePassword);
init();