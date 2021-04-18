const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundUserError = require('../errors/notFoundUser');
const InvalidMailError = require('../errors/invalidMail');
const ValidationError = require('../errors/validationError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.getCurrentUser = (req, res) => {
  req.params.id = req.user._id;
  this.getUser(req, res);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new NotFoundUserError())
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        const er = new ValidationError();
        next(er);
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      data: {
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      },
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        const er = new Error('E-mail занят. Попробуйте другой.');
        er.statusCode = 409;
        next(er);
      } else if (err.name === 'ValidationError') {
        const er = new ValidationError();
        next(er);
      } else {
        next(err);
      }
    });
};

module.exports.patchUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundUserError())
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        const er = new ValidationError();
        next(er);
      } else {
        next(err);
      }
    });
};

module.exports.patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundUserError())
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        const er = new ValidationError();
        next(er);
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new InvalidMailError();
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new InvalidMailError();
        }
        // пароль верный
        const token = jwt.sign(
          { _id: user._id },
          '5cdd183194489560b0e6bfaf8a81541e',
          { expiresIn: '7d' }, // токен будет просрочен через неделю после создания
        );
        res.cookie('jwt', token, {
          // token - наш JWT токен, который мы отправляем
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        });
        res.send({ message: 'Авторизация успешна' });
      });
    })
    .catch((err) => next(err));
};
