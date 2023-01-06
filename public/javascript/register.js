function validateForm() {
  var error1 = document.getElementById("error1");
  var error2 = document.getElementById("error2");
  var error3 = document.getElementById("error3");
  var error4 = document.getElementById("error4");
  var validRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const email = document.getElementById("email").value;
  const uname = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const cpassword = document.getElementById("cpassword").value;
  console.log(email, uname, password, cpassword);
  if (uname != "") {
    if (email != "" && email.match(validRegex)) {
      if (password != "" && password.length >= 7) {
        if (password === cpassword) {
          return true;
        } else {
          error4.innerHTML =
            "<span style='color: red;text-align: center'>" +
            "Password dosent Match</span>";
          return false;
        }
      } else {
        error3.innerHTML =
          "<span style='color: red;text-align: center'>" +
          "Password should contain atleast 7 character</span>";
        return false;
      }
    } else {
      error2.innerHTML =
        "<span style='color: red; text-align: center'>" +
        "Email Id is not valid</span>";
      return false;
    }
  } else {
    error1.innerHTML =
      "<span style='color: red;'>" + "Username should be present</span>";
    return false;
  }
}

function validate() {
  var error1 = document.getElementById("error1");
  var error2 = document.getElementById("error2");

  const uname = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (uname != "") {
    if (password != "") {
      return true;
    } else {
      error2.innerHTML =
        "<span style='color: red;text-align: center'>" +
        "Password cannot be Empty</span>";
      return false;
    }
  } else {
    error1.innerHTML =
      "<span style='color: red;'>" + "Username should be present</span>";
    return false;
  }
}
