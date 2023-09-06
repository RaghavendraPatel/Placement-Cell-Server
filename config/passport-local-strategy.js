const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const Employee = require("../models/employee");
//authentyication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      //find employee and establish identity
      Employee.findOne({ email: email })
        .then((employee) => {
          if (!employee || employee.password != password) {
            return done(null, false);
          }
          return done(null, employee);
        })
        .catch((error) => {
          console.log("Error in finding employee");
          return done(error);
        });
    }
  )
);

//serializing the employee to decide which key is to be kept in the cookies
passport.serializeUser(function (employee, done) {
  done(null, employee.id);
});

//deserializing the employee from the key in the cookies
passport.deserializeUser(function (id, done) {
  Employee.findById(id)
    .then((employee) => {
      return done(null, employee);
    })
    .catch((error) => {
      console.log("Error in finding employee");
      return done(error);
    });
});

passport.checkAuthentication = function (req, res, next) {
  //if employee is signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }
  // if employee is not signed in
  return res.status(401).json({
    message: "Unauthorized",
    success: false,
  });
};

passport.setAuthenticatedEmployee = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.employee contains the current signed in employee from the session cookie and we are just sending this to the locals for the views
    res.locals.employee = req.employee;
  }
  next();
};
module.exports = passport;
