const successResponse = (data) => ({
  error: false,
  data,
});

const errorResponse = (data) => ({
  error: true,
  data,
});

module.exports = {
  successResponse,
  errorResponse,
};
