const organizationRouter = require('express').Router()
const organizationController = require('../controllers/organization-controller.js')
const isAuthenticated = require('../middlewares/is-authenticated.js')
const checkPermissions = require('../middlewares/check-permissions.js')

organizationRouter.get(
  '/',
  // #swagger.description = 'login required - use /api/auth/github to create a new organization'
  // #swagger.summary = 'get all Organizations'
  // #swagger.tags = ['organizations']
  isAuthenticated,
  checkPermissions('readUser'),
  organizationController.getAllOrganizations,
)

organizationRouter.get(
  '/:id',
  /* #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID of the organization to retrieve',
    required: true,
    type: 'string'
   } */
  // #swagger.summary = 'get a single organization by id'
  // #swagger.tags = ['organizations']
  isAuthenticated,
  checkPermissions('readUser'),
  organizationController.getOrganizationById,
)

organizationRouter.post(
  '/',
  // #swagger.summary = 'Add a new Organization',
  // #swagger.tags = ['organizations'],
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/Organization'
          }
        }
      }
    } */
  /* #swagger.responses[200] = {
      description: 'Success: Organization was updated successfully.',
      schema: { $ref: '#/components/schemas/Organization' }
    } */
  // #swagger.responses[400] = { description: 'Bad request: Data to update can not be empty!' }
  // #swagger.responses[404] = { description: 'Not found: Cannot update Organization with id. Maybe Organization was not found!' }

  isAuthenticated,
  checkPermissions('updateUser'),
  (req, res, next) => {
    // console.log(req.body);
    next()
  },
  organizationController.createOrganization,
)

organizationRouter.put(
  '/:id',
  // #swagger.summary = 'update a Organization by id'
  // #swagger.tags = ['organizations']
  isAuthenticated,
  checkPermissions('updateUser', true),
  organizationController.updateOrganizationById,
)

organizationRouter.delete(
  '/:id',
  // #swagger.summary = 'delete a single Organization by id'
  // #swagger.tags = ['organizations']
  isAuthenticated,
  checkPermissions('updateUser'),
  organizationController.deleteOrganizationById,
)

organizationRouter.delete(
  '/',
  // #swagger.summary = 'delete all Organizations'
  // #swagger.tags = ['organizations']
  isAuthenticated,
  checkPermissions('updateUser'),
  organizationController.deleteAllOrganizations,
)

organizationRouter.patch(
  '/:id/toggleActiveStatus',
  // #swagger.summary = 'toggle a Organization active status by id'
  // #swagger.tags = ['organizations']
  isAuthenticated,
  checkPermissions('updateUser'),
  organizationController.toggleOrganizationActiveStatus,
)

organizationRouter.post(
  '/:organizationId/members',
  // #swagger.summary = 'Add a member to an organization'
  // #swagger.tags = ['organizations']
  isAuthenticated,
  checkPermissions('updateUser'),
  organizationController.addMemberToOrganization,
)

organizationRouter.delete(
  '/:organizationId/members/:memberId',
  // #swagger.summary = 'Remove a member from an organization'
  // #swagger.tags = ['organizations']
  isAuthenticated,
  checkPermissions('updateUser'),
  organizationController.removeMemberFromOrganization,
)

organizationRouter.put(
  '/:organizationId/owner',
  // #swagger.summary = 'Update the owner of an organization'
  // #swagger.tags = ['organizations']
  isAuthenticated,
  checkPermissions('updateUser'),
  organizationController.updateOwnerOfOrganization,
)

module.exports = organizationRouter

/* #swagger.parameters['newOrganization'] = {
    in: 'body',
    description: 'Information for the new organization.',
    required: true,
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'joelcannon'
        },
        email: {
          type: 'string',
          example: 'joelcannon@mac.com'
        }
      }
    }
  } */
