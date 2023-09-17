export const uploadError = {
    firstName: {
      required: "First name is required",
      minLength: 3,
      pattern: {
        value: /^[a-zA-Z\u00C0-\u017F]+(?:\s[a-zA-Z\u00C0-\u017F]+)*$/,
        message: "Invalid character!!",
      },
    },
    lastName: {
      required: "Last name is required",
      minLength: 3,
      pattern: {
        value: /^[a-zA-Z\u00C0-\u017F]+(?:\s[a-zA-Z\u00C0-\u017F]+)*$/,
        message: "Invalid character!!",
      },
    },
    phoneNumber: {
        required: "Phone number is required",
        maxLength: 8,
        minLength: 8,
      },
      emailAddress: {
        required: "Email address is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address",
        },
      },
      password: {
        required: "Password is required",
        pattern : {
            value:  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
            message: "Minimum eight characters, at least one letter, one number and one special character"
        }
      },
      loginpassword: {
        required: "Password is required",
      },
      fullName: {
        required: "Password is required",
      },
      username : {
        required: "Username is required",
      },
      title: {
        required: "Title is required",
      },
      body : {
        required: "Body is required",
      },
     description : {
        required: "Body is required",
      },
  };


//  { message for Password regex = Min 1 uppercase letter.
//   Min 1 lowercase letter.
//   Min 1 special character.
//   Min 1 number.
//   Min 8 characters.
//   Max 30 characters.

// }