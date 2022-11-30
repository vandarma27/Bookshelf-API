const addBookHandler = (request, h) => {
  const { nama, year, author, summary, publisher, pageCount, readPage, raeding } = request.payload;

};

module.exports = { addBookHandler };
