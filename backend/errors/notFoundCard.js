class NotFoundCardError extends Error {
  constructor() {
    super('Карточка не найдена');
    this.statusCode = 404;
  }
}

module.exports = NotFoundCardError;
