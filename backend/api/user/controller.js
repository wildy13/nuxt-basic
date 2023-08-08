const User = require('./model')

const getUser = async (req, res) => {
    try {
        const user = await User.findAll({
            attributes: ['username', 'createdAt', 'id', 'address', 'email']
        });
        res.status(200).json(user)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getMe = async (req, res) => {
    try {
        const user = await User.findOne({
            attributes: [
                'id',
                'username',
            ],
            where : { username : req.auth.username } 
        });
        res.status(200).json({ user })
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const createUser = async (req,res) => {
    const {
        username,
        password,
        confPassword
    } = req.body;
    
    try {
        const newUser = new User ({
            username,
            password,
            confPassword
        });
        const user = await newUser.save();
        res.status(200).json(user)
    } catch (error) {
         if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).send(error.errors[0].message);
          } else {
            res.status(500).send(error);
          }
    }
}

const editUsers = async (req, res) => {
    const user = await User.findOne({
      attributes: [
        'id',
        'address',
        'username',
        'email',
      ],
      where: {
        id: req.params.id,
      },
    });
    user.username = req.body.username;
    user.address = req.body.address;
    user.email = req.body.email;
    const save = await user.save();
    res.status(200).json(save);
  };

  const deleteUsers = async (req, res) => {
    await Promise.all(
      req.body.map(async (payload) => {
        await User.destroy({
          where: { id: payload.id },
        });
      }),
    );
    return res.json(req.body);
  };
  
  const changePassword = async (req, res) => {
    const { oldPass, newPass } = req.body;
  
    const user = await User.findOne({
      attributes: [
        'id',
        'password',
      ],
      where: {
        id: req.params.id,
      },
    });
  
    const checkPassword = await user.authenticate(oldPass);
  
    if (checkPassword) {
      user.password = newPass;
      await user.save();
  
      res.status(200).json(user);
    } else {
      res.status(400).send('Your old password in invalid, please try again');
    }
  };





module.exports = { getUser, getMe, createUser, editUsers, changePassword, deleteUsers }