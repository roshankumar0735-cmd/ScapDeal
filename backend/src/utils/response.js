const success = (res, { message = 'Success', data = null, statusCode = 200 } = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const failure = (res, { message = 'Something went wrong', errors = null, statusCode = 500 } = {}) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

module.exports = { success, failure };
