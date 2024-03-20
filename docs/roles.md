# Roles

- **Viewer:** Has read-only access and can view but not edit or manage data.
- **Operator:** Can perform specific operations or tasks within the system, such as adding new data or performing routine tasks.
- **Manager:** Has a higher level of authority and can oversee operations, manage users (including operators), and make decisions within their area of responsibility.
- **Admin:** Has the highest level of authority within their organization and can manage all aspects of the system, including users, permissions, and configuration. Admins can add or remove managers within their organization.
- **Super Admin:** Has elevated privileges beyond that of a regular admin. Super admins can create new organizations, add admins to organizations, and have overall control over the system.

```js
const Roles = {
  VIEWER: 'Viewer',
  OPERATOR: 'Operator',
  MANAGER: 'Manager',
  ADMIN: 'Admin',
  SUPER_ADMIN: 'Super Admin',
}
```
