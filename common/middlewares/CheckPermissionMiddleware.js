const UserModel = require("../models/User");
// const { user } = require("./IsAuthenticatedMiddleware")



module.exports = {
  has:  (role) => {
    return (req, res, next) => {
      const {
        user: { userId }
      } = req;
      // user: { userId}
      //  console.log(UserModel.findUser({ id: userId}))

      async function hashedUser(uId){
        const user = await UserModel.findUser({ _id: uId})
        console.log(user)
        return user
      }
      hashedUser(userId).then((user) => {
        // console.log(user)
        
        // IF user does not exist in our database, means something is fishy
        // THEN we will return forbidden error and ask user to login again
        if (!user) {
          return res.status(403).json({
            status: false,
            error: "Invalid access token provided,",
          });
        }

        const userRole = user.role;

        // IF user does not possess the required role
        // THEN return forbidden error
        if (userRole !== role) {
          return res.status(403).json({
            status: false,
            error: `You need to be a ${role} to access this endpoint.`,
          });
        }

        next();
      });
    };
  },
};