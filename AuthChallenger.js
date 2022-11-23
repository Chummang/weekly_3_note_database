// Declare the function Auth Challenger that takes in one parameter, the users

const AuthChallenger = (knex) => {
  // This will return True or False
  return async (username, password, cb) => {
    // This is the password and username that we receive when prompted by our HTML file.
    const data = await knex("users")
      .where({ username, password }) // []
      .first(); // undefined
    console.log("data", data);
    // if (data !== undefined) {
    //   return true;
    // } else {
    //   return false;
    // }
    return data ? cb(null, true) : cb(null, false);
  };
};
// This code exports the function we hae just defined.
module.exports = AuthChallenger;
