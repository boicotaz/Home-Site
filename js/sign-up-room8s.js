function validationSUForm() {
  //Receive the inputs
  var firstName = document.getElementById("firstName").value;
  var firstNameBor = document.getElementById("firstName");

  var lastName = document.getElementById("lastName").value;
  var lastNameBor = document.getElementById("lastName");

  var email = document.getElementById("email").value;
  var emailBor = document.getElementById("email");

  var password = document.getElementById("password").value;
  var passwordBor = document.getElementById("password");

  var confirmPassword = document.getElementById("confirmPassword").value;
  var confirmpasswordBor = document.getElementById("confirmPassword");

  //validation for the Name input

  //Name should not be empty. (Name REQ#1)
  if (firstName == null || firstName == "") {
    document.getElementById("firstNameWarning").innerHTML =
      "Please insert a name.";
    firstNameBor.style.borderWidth = "2px";
    firstNameBor.style.borderColor = "red";
    return false;
  }

  //Name should not contain any numbers or special characters. (Name REQ#2)

  let comboRegex = /^[a-zA-Z]+$ /g;
  let comboResult = comboRegex.test(firstName);

  if (!comboResult) {
    document.getElementById("firstNameWarning").innerHTML =
      "Name should not contain any numbers or special characters.";
    firstNameBor.style.borderWidth = "2px";
    firstNameBor.style.borderColor = "red";
    return false;
  }

  // No spaces allowed for Name. (Name REQ#3)
  if (firstName.match(/\s/g)) {
    document.getElementById("firstNameWarning").style.wordWrap = "normal";
    document.getElementById("firstNameWarning").innerHTML =
      "Spaces are not allowed.";
    firstNameBor.style.borderWidth = "2px";
    firstNameBor.style.borderColor = "red";
    document.getElementById("firstNameWarning").style.marginTop = "1px";

    return false;
  }

  //validation for the Lastname input

  //Surname should not be empty. (Last name REQ#1)
  if (lastName == null || lastName == "") {
    document.getElementById("lastNameWarning").innerHTML =
      "Please insert a last name.";
    lastNameBor.style.borderWidth = "2px";
    lastNameBor.style.borderColor = "red";
    document.getElementById("lastNameWarning").style.paddingBottom = "10px";
    return false;
  }

  //Surname should not contain any numbers or special characters. (Last name REQ#2)
  let comboRegex = /^[a-zA-Z]+$ /g;
  let comboResult = comboRegex.test(lastName);

  if (!comboResult) {
    document.getElementById("lastNameWarning").innerHTML =
      "Name should not contain any numbers or special characters.";
    lastNameBor.style.borderWidth = "2px";
    lastNameBor.style.borderColor = "red";
    return false;
  }

  // No spaces allowed for Last name (Last name REQ#3)
  if (lastName.match(/\s/g)) {
    document.getElementById("lastNameWarning").innerHTML =
      "Spaces are not allowed.";
    lastNameBor.style.borderWidth = "2px";
    lastNameBor.style.borderColor = "red";
    return false;
  }

  // //Validation for the Email input.

  // //Email should not be empty. (Email REQ#1)
  if (email == null || email == "") {
    document.getElementById("emailWarning").innerHTML =
      "Please fill in your e-mail.";
    emailBor.style.borderWidth = "2px";
    emailBor.style.borderColor = "red";
    return false;
  }

  // //Email should not contain any special characters. (Email REQ#2)
  var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (email.match(emailFormat)) {
    return true;
  } else {
    document.getElementById("emailWarning").innerHTML =
      "Please insert a valid e-mail.";
    emailBor.style.borderWidth = "2px";
    emailBor.style.borderColor = "red";
    return false;
  }

  //validation for the Password input

  //Password should not be empty. (Password REQ#1)
  if (password == null || password == "") {
    document.getElementById("passwordWarning").innerHTML =
      "Please fill in a password.";
    passwordBor.style.borderWidth = "2px";
    passwordBor.style.borderColor = "red";
    return false;
  }

  //Password should be at least six characters long. (Password REQ#2)
  if (password.length < 6) {
    document.getElementById("passwordWarning").innerHTML =
      "Password must be at least six characters long.";
    passwordBor.style.borderWidth = "2px";
    passwordBor.style.borderColor = "red";
    return false;
  }

  // No spaces allowed for Password. (Password REQ#3)
  if (password.match(/\s/g)) {
    document.getElementById("passwordWarning").innerHTML =
      "Spaces are not allowed.";
    passwordBor.style.borderWidth = "2px";
    passwordBor.style.borderColor = "red";
    return false;
  }

  //Confirm Password should match with Password. (Confirm Password REQ#1)

  if (password != confirmPassword || confirmPassword == null) {
    document.getElementById("confirmPasswordWarning").innerHTML =
      "Password does not match.";
    confirmpasswordBor.style.borderWidth = "2px";
    confirmpasswordBor.style.borderColor = "red";
    return false;
  }
}
$("#sign-up-form").submit(event => {
  alert("Handler for .submit() called.");
  event.preventDefault();
});
