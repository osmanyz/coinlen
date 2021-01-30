// middleware for doing role-based permissions
module.exports = function (...allowed) {
  const isAllowed = role => allowed.indexOf(role) > -1;

  return (request, response, next) => {
    if (request.user && isAllowed(request.user.role)) {
      next(); // role is allowed, so continue on the next middleware
    } else {
      response.status(403).json({
        statusCode: 403,
        status: false,
        name: "AuthenticationError",
        message: "Forbidden"
      });
    }
  }
};
