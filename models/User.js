class User {
  #email;
  #password;
  #firstName;
  #lastName;
  constructor(email, password, firstName, lastName) {
    this.#email = email;
    this.#password = email;
    this.#firstName = firstName;
    this.#lastName = lastName;
  }

  getEmail = () => {
    return this.#email;
  };

  getPassword = () => {
    return this.#password;
  };
}

module.exports = User;
