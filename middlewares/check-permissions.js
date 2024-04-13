const { ROLE_PERMISSIONS } = require("../models/roles-model");

function checkPermissions(requiredPermission, selfAllowed) {
  return function (req, res, next) {
    const user = req.user;
    const userRole = user.role;
    const userPermissions = ROLE_PERMISSIONS[userRole];

    // console.log(requiredPermission, user.username, userRole);

    if (!userPermissions) {
      return res.status(403).send("Forbidden: Unrecognized User Role");
    }

    if (userPermissions.includes(requiredPermission) && req.user.isActive) {
      next();
    } else if (
      selfAllowed &&
      req.params.id === user.id &&
      userPermissions.includes("updateSelf")
    ) {
      next();
    } else {
      res.status(403).send("Forbidden: Permission denied");
    }
  };
}

module.exports = checkPermissions;
