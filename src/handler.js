const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    nama, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const id = nanoid(16);
  let finished = null;
  if (pageCount === readPage) {
    finished = true;
  } else {
    finished = false;
  }

  const insertAt = new Date().toISOString();
  const updateAt = insertAt;

  const newBook = {
    nama,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    id,
    finished,
    insertAt,
    updateAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;
  const nullName = books.filter((book) => book.nama == null);
  let overRead = 0;
  if (readPage > pageCount) {
    overRead = 1;
  }

  if (nullName) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (overRead) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

console.log(addBookHandler());
module.exports = { addBookHandler };
