/* ------------- CHECK username ---------- */
const checkUsername = function() {
  const fieldUsername = document.getElementById("username");
  const fieldUsernameError = document.getElementById("username-error");

  const xhr = new XMLHttpRequest();
  const targetUrl = `${URL_BASE_PUBLIC}register/checkusername/${fieldUsername.value}`;

  xhr.onreadystatechange = function() {
    if (this.status == 400) {
      fieldUsername.style.borderColor = "red";
      fieldUsernameError.style.color = "red";
      fieldUsernameError.innerHTML = `Username ${fieldUsername.value} is taken.`;
      return false;
    }
    fieldUsername.style.borderColor = "green";
    fieldUsernameError.style.color = "green";
    fieldUsernameError.innerHTML = "You can use this username";
    return true;
  };

  xhr.open("GET", targetUrl, true);
  xhr.send();
};

/* ------------- CHECK email ---------- */
const checkEmail = function() {
  const fieldEmail = document.getElementById("email");
  const fieldEmailError = document.getElementById("email-error");

  if (validateEmail(fieldEmail.value)) {
    fieldEmail.style.borderColor = "green";
    fieldEmailError.style.color = "green";
    fieldEmailError.innerHTML = "Email is valid";
    return true;
  }
  fieldEmail.style.borderColor = "red";
  fieldEmailError.style.color = "red";
  fieldEmailError.innerHTML = "Please enter a valid email";
  return false;
};

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/* ------------- CHECK PHONE ---------- */
const checkPhone = function() {
  const fieldPhone = document.getElementById("phone");
  const fieldPhoneError = document.getElementById("phone-error");

  if (validatePhone(fieldPhone.value)) {
    fieldPhone.style.borderColor = "green";
    fieldPhoneError.style.color = "green";
    fieldPhoneError.innerHTML = "Phone is valid.";
    return true;
  }
  fieldPhone.style.borderColor = "red";
  fieldPhoneError.style.color = "red";
  fieldPhoneError.innerHTML = "Phone is not valid, number must be 9 to 12.";
  return false;
};

function validatePhone(phone) {
  const re = /\(?(?:\+62|62|0)(?:\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}/;
  return re.test(String(phone).toLowerCase());
}

/* ------------- CHECK PASSWORD ---------- */
const checkPassword = function() {
  const fieldPassword = document.getElementById("password");
  const fieldConfirmPassword = document.getElementById("confirmPassword");

  const fieldPasswordError = document.getElementById("password-error");
  const fieldConfirmPasswordError = document.getElementById("confirm-error");

  if (fieldPassword.value.length > 8) {
    if (fieldPassword.value == fieldConfirmPassword.value) {
      fieldPasswordError.style.color = "green";
      fieldPasswordError.innerHTML = "Password is matching";

      fieldConfirmPasswordError.style.color = "green";
      fieldConfirmPasswordError.innerHTML = "Password is matching";

      fieldPassword.style.borderColor = "green";
      fieldConfirmPassword.style.borderColor = "green";
      return true;
    }
    fieldPasswordError.style.color = "red";
    fieldPasswordError.innerHTML = "Password is not match";

    fieldConfirmPasswordError.style.color = "red";
    fieldConfirmPasswordError.innerHTML = "Password is not match";

    fieldPassword.style.borderColor = "red";
    fieldConfirmPassword.style.borderColor = "red";

    return false;
  }
  fieldPasswordError.style.color = "red";
  fieldPasswordError.innerHTML = "Password should be more than 8 characters";

  fieldConfirmPasswordError.style.color = "red";
  fieldConfirmPasswordError.innerHTML =
    "Password should be more than 8 characters";

  fieldPassword.style.borderColor = "red";
  fieldConfirmPassword.style.borderColor = "red";

  return false;
};
