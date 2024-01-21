const UserModel = require("./../../common/models/User");
const Token = require("./../../common/models/Token")
const crypto = require("crypto");
const { sendingMail } = require("./../../nodemailer/mailing")

module.exports = {
   createUser : async (req, res) => {
    try {
      const { username, email, password, age, role, firstName, lastName } = req.body;
  
      const data = {
        username,
        email,
        password, // Corrected typo in the variable name
        age,
        role,
        firstName,
        lastName,
        verified: false, // Set initial verification status to false
      };
  
      const user = await UserModel.create(data);
      return user;
  
      // if (user) {
      //   const setToken = new Token({
      //     userId: user._id, // Assuming _id is the correct property for the user ID
      //     token: crypto.randomBytes(16).toString("hex"),
      //   });
  
      //   await setToken.save(); // Corrected to use async/await for save()
  
      //   if (setToken) {
      //     await sendingMail({
      //       from: "no-reply@example.com",
      //       to: email,
      //       subject: "Account Verification Link",
      //       text: `Hello, ${username} Please verify your email by clicking this link: http://localhost:3000/verify-email/${user._id}/${setToken.token}`,
      //     });
      //     return res.status(201).send(user);
      //   } else {
      //     return res.status(400).send("Token not created");
      //   }
      // } else {
      //   return res.status(409).send("Details are not correct");
      // }
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  },
  
  //  verifyEmail : async (req, res) => {
  //   try {
  //     const token = req.params.token;
  
  //     const userToken = await Token.findOne({
  //       token,
  //       userId: req.params.id, // Corrected the where condition
  //     });
  
  //     if (!userToken) {
  //       return res.status(400).send({
  //         msg: "Your verification link may have expired. Please click on resend",
  //       });
  //     } else {
  //       const user = await UserModel.findById(req.params.id); // Corrected to use findById
  //       if (!user) {
  //         return res.status(401).send({
  //           msg: "We were unable to find a user for this verification. Please sign up!",
  //         });
  //       } else if (user.verified) {
  //         return res.status(200).send("User is verified already. Please login");
  //       } else {
  //         await UserModel.findByIdAndUpdate(
  //           userToken.userId,
  //           { verified: true },
  //           { new: true }
  //         );
  //         return res.status(200).send("Your account has been successfully verified");
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).send("Internal Server Error");
  //   }
  // }
  // ,

  getUser: (req, res) => {
    const {
      user: { userId },
    } = req;

    UserModel.findUser({ _id: userId })
      .then((user) => {
        return res.status(200).json({
          status: true,
          data: user.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  updateUser: (req, res) => {
    const {
      user: { userId },
      body: payload,
    } = req;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the user.",
        },
      });
    }

    UserModel.updateUser({ _id: userId }, payload)
      .then(() => {
        return UserModel.findUser({ _id: userId });
      })
      .then((user) => {
        return res.status(200).json({
          status: true,
          data: user.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteUser: (req, res) => {
    const {
      params: { userId },
    } = req;

    UserModel.deleteUser({ _id: userId })
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfUsersDeleted: numberOfEntriesDeleted
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getAllUsers: (req, res) => {
    UserModel.findAllUsers(req.query)
      .then((users) => {
        return res.status(200).json({
          status: true,
          data: users,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  changeRole: (req, res) => {
    const {
      params: { userId },
      body: { role },
    } = req;

    UserModel.updateUser({ _id: userId }, { role })
      .then(() => {
        return UserModel.findUser({ _id: userId });
      })
      .then((user) => {
        return res.status(200).json({
          status: true,
          data: user.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
};