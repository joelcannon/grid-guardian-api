exports.errorHandler = (err, req, res, next) => {
  console.log('error: ', err)

  let message = err
  let errors
  let statusCode = 500

  if (err instanceof Error) {
    message = err.message || 'An unexpected error occurred.'
    errors = err.errors
    statusCode = err.statusCode || 500
  }

  if (err.name === 'ValidationError') {
    statusCode = 400
  }

  res.status(statusCode).json({
    message,
    errors,
  })
}
