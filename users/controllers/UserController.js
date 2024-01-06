const UserModel = require("./../../common/models/User");
const Token = require("./../../common/models/Token")
const crypto = require("crypto");
const { sendingMail } = require("./../../nodemailer/mailing")

module.exports = {
  createUser: async(req, res) => {
    try {
      const { username, email, pasword, age, role, firstName, lastName, verified, token } = req.body;
      const data = {
        username, email, pasword, age, role, firstName, lastName, verified, token
      };
      
      const user = UserModel.create(data);
      
      if (user) {
        let setToken = new Token({
          userId: user._id,
          token: crypto.randomBytes(16).toString("hex"),
        });

        setToken.save()

        if (setToken) {
          sendingMail({
            from: "no-reply@example.com",
          to: `${email}`,
          subject: "Account Verification Link",
          text: `Hello, ${username} Please verify your email by
                clicking this link :
                http://localhost:3000/verify-email/${user.id}/${setToken.token} `,

          });

        }else {
          return res.status(400).send("token not created");
        }
          return res.status(201).send(user);
      } else {
        return res.status(409).send("Details are not correct");
      }
    } catch (error) {
      console.log(error);
    }
  },

   verifyEmail: async (req, res) => {
    try {
      const token = req.params.token;

      const userToken = await Token.findOne({
        token,
        where: {
          userId: req.params.id,
        },
      })

      console.log(userToken);

      if(!userToken){
        return res.status(400).send({
          msg: "Your verification link may have expired. Please click on resend"
        });

      } else {
        const user = await UserModel.findOne({ where: { id: req.params.id } });
        if (!user) {
          console.log(user);

          return res.status(401).send({
            msg: "We were unable to find a user for this verification. Please signUp!",
          });

        } else if (user.verified) {
          return res
            .status(200)
            .send("User is verified already. Please login");
        } else {
          const updated = await User.update(
            { verified: true },
            {
              where: {
                id: userToken.userId,
              },
            }
          );
          console.log(updated);

          if(!updated) {
            return res.status(500).send({ msg: err.message });
          } else {
            return res 
              .status(200)
              .send("Your account has been successfully verified");
          }
        }
      }
      
    } catch (error) {
      console.log(error)
    }
  },

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