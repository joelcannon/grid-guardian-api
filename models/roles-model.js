const ROLES = {
  VIEWER: "Viewer",
  EDITOR: "Editor",
  ADMIN: "Admin",
};

const ROLE_PERMISSIONS = {
  Viewer: ["readDoc"],
  Editor: ["readDoc", "updateDoc", "readUser", "updateSelf"],
  Admin: ["readDoc", "updateDoc", "readUser", "updateUser"],
};

module.exports = { ROLES, ROLE_PERMISSIONS };
