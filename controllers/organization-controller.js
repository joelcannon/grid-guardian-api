require('dotenv').config()
const { OrganizationModel } = require('../models/organization-model')
const {
  findOrganizationById,
  createOrganization,
} = require('../services/organization-services')
const validateOrganization = require('../middlewares/validate-organization')
const validateOrganizationUpdate = require('../middlewares/validate-organization-update')

exports.createOrganization = [
  validateOrganization,
  async (req, res, next) => {
    // #swagger.responses[500] = { description: 'Internal server error' }
    if (!req.body.name) {
      return res.status(400).json({ message: 'Content can not be empty!' })
    }

    const organization = new OrganizationModel({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      website: req.body.website,
      description: req.body.description,
      isActive: req.body.isActive,
    })

    try {
      const data = await createOrganization(organization)
      res.json(data)
    } catch (err) {
      next(err)
    }
  },
]

exports.getAllOrganizations = async (req, res, next) => {
  // #swagger.responses[200] = { description: 'Success' }
  // #swagger.responses[500] = { description: 'Internal server error' }
  try {
    const data = await OrganizationModel.find()
      .populate('members')
      .populate('owner')
    res.json(data)
  } catch (err) {
    next(err)
  }
}

exports.getOrganizationById = async (req, res, next) => {
  // #swagger.parameters['id'] = { description: 'Organization ID' }
  // #swagger.responses[200] = { description: 'Success' }
  // #swagger.responses[404] = { description: 'Not found: Organization with id' }
  // #swagger.responses[500] = { description: 'Internal server error' }
  const id = req.params.id

  try {
    const data = await findOrganizationById(id)

    if (!data) {
      return res
        .status(404)
        .json({ message: 'Not found Organization with id ' + id })
    }

    res.json(data)
  } catch (err) {
    next(err)
  }
}

exports.updateOrganizationById = [
  validateOrganizationUpdate,
  // #swagger.parameters['id'] = { description: 'Organization ID' }
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
  // #swagger.responses[500] = { description: 'Internal server error' }
  async (req, res, next) => {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: 'Data to update can not be empty!' })
    }

    const id = req.params.id

    try {
      const data = await OrganizationModel.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false,
        new: true,
      })

      if (!data) {
        return res.status(404).json({
          message: `Cannot update Organization with id=${id}. Maybe Organization was not found!`,
        })
      } else {
        res.status(200).json({
          message: 'Organization was updated successfully.',
          organization: data,
        })
      }
    } catch (err) {
      next(err)
    }
  },
]

exports.deleteOrganizationById = [
  async (req, res, next) => {
    // #swagger.parameters['id'] = { description: 'Organization ID' }
    // #swagger.responses[204] = { description: 'Success: Organization was deleted successfully!' }
    // #swagger.responses[404] = { description: 'Not found: Cannot delete Organization with id. Maybe Organization was not found!' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    const id = req.params.id

    try {
      const data = await OrganizationModel.findByIdAndRemove(id)

      if (!data) {
        return res.status(404).json({
          message: `Cannot delete Organization with id=${id}. Maybe Organization was not found!`,
        })
      } else {
        res
          .status(204)
          .json({ message: 'Organization was deleted successfully!' })
      }
    } catch (err) {
      next(err)
    }
  },
]

exports.deleteAllOrganizations = [
  async (req, res, next) => {
    // #swagger.responses[204] = { description: 'Success: Organizations were deleted successfully!' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    try {
      const data = await OrganizationModel.deleteMany({})
      res.status(204).json({
        message: `${data.deletedCount} Organizations were deleted successfully!`,
      })
    } catch (err) {
      next(err)
    }
  },
]

exports.toggleOrganizationActiveStatus = [
  async (req, res, next) => {
    // #swagger.parameters['id'] = { description: 'Organization ID' }
    /* #swagger.responses[200] = {
      description: 'Success: Organization active status was toggled successfully.',
      schema: { $ref: '#/components/schemas/Organization' }
    } */
    // #swagger.responses[400] = { description: 'Bad request: Data to update can not be empty!' }
    // #swagger.responses[404] = { description: 'Not found: Cannot toggle Organization active status with id. Maybe Organization was not found!' }
    // #swagger.responses[500] = { description: 'Internal server error' }

    if (!req.body) {
      return res
        .status(400)
        .json({ message: 'Data to update can not be empty!' })
    }

    try {
      const id = req.params.id
      const organization = await OrganizationModel.findById(id)
      if (!organization) {
        return res.status(404).json({
          message: `Cannot toggle Organization active status with id=${id}. Maybe Organization was not found!`,
        })
      } else {
        organization.isActive = !organization.isActive
        const data = await organization.save()
        res.status(200).json({
          message: `Organization active status was toggled successfully. Current status is ${organization.isActive ? 'active' : 'inactive'}.`,
          organization: data,
        })
      }
    } catch (err) {
      next(err)
    }
  },
]

exports.addMemberToOrganization = async (req, res, next) => {
  // #swagger.responses[500] = { description: 'Internal server error' }
  const { memberId } = req.body
  const { organizationId } = req.params

  if (!memberId) {
    return res.status(400).send({ message: 'Member ID is required.' })
  }

  try {
    const organization = await OrganizationModel.findById(organizationId)

    if (!organization) {
      return res.status(404).send({ message: 'Organization not found.' })
    }

    // Check if the member is already part of the organization
    if (organization.members.includes(memberId)) {
      return res
        .status(400)
        .send({ message: 'Member is already part of the organization.' })
    }

    organization.members.push(memberId)
    await organization.save()

    res
      .status(200)
      .send({ message: 'Member added to organization successfully.' })
  } catch (err) {
    next(err)
  }
}

exports.removeMemberFromOrganization = async (req, res, next) => {
  // #swagger.responses[500] = { description: 'Internal server error' }
  const { organizationId, memberId } = req.params

  try {
    const organization = await OrganizationModel.findById(organizationId)

    if (!organization) {
      return res.status(404).send({ message: 'Organization not found.' })
    }

    // Check if the member is part of the organization
    const memberIndex = organization.members.indexOf(memberId)
    if (memberIndex === -1) {
      return res
        .status(400)
        .send({ message: 'Member is not part of the organization.' })
    }

    organization.members.splice(memberIndex, 1)
    await organization.save()

    res
      .status(200)
      .send({ message: 'Member removed from organization successfully.' })
  } catch (err) {
    next(err)
  }
}

exports.updateOwnerOfOrganization = async (req, res, next) => {
  // #swagger.responses[500] = { description: 'Internal server error' }
  const { organizationId } = req.params
  const { ownerId } = req.body

  if (!ownerId) {
    return res.status(400).send({ message: 'Owner ID is required.' })
  }

  try {
    const organization = await OrganizationModel.findById(organizationId)

    if (!organization) {
      return res.status(404).send({ message: 'Organization not found.' })
    }

    organization.owner = ownerId
    await organization.save()

    res
      .status(200)
      .send({ message: 'Owner of organization updated successfully.' })
  } catch (err) {
    next(err)
  }
}
