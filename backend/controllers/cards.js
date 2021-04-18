const NotFoundCardError = require('../errors/notFoundCard');
const Card = require('../models/card');
const ValidationError = require('../errors/validationError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(err));
};
module.exports.getCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundCardError())
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        const er = new ValidationError();
        next(er);
      } else {
        next(err);
      }
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        const er = new ValidationError();
        next(er);
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundCardError())
    .then((card) => {
      if (card.owner._id.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .orFail(new NotFoundCardError())
          .then((foundedCard) => res.send({ data: foundedCard }))
          .catch((err) => {
            if (err.name === 'ValidationError' || err.name === 'CastError') {
              const er = new ValidationError();
              next(er);
            } else {
              next(err);
            }
          });
      } else {
        const err = new Error('Нельзя удалять чужую карточку');
        err.statusCode = 403;
        throw err;
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        const er = new ValidationError();
        next(er);
      } else {
        next(err);
      }
    });
};

module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundCardError())
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        const er = new ValidationError();
        next(er);
      } else {
        next(err);
      }
    });
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundCardError())
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        const er = new ValidationError();
        next(er);
      } else {
        next(err);
      }
    });
};
