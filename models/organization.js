const mongoose = require('mongoose')

module.exports = (mongoose) => {
  const OrganizationSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      apiKey: {
        type: String,
        required: true,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
      members: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      address: String,
      website: String,
      phone: String,
      description: String,
    },
    {
      timestamps: true, // This will automatically add createdAt and updatedAt fields
      collection: 'organizations', // explicitly set the collection name
    },
  )

  return mongoose.model('Organization', OrganizationSchema)
}
/**
 * @swagger
 * components:
 *   schemas:
 *     Organization:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the organization.
 *         apiKey:
 *           type: string
 *           description: The API key of the organization.
 *         isActive:
 *           type: boolean
 *           description: Indicates if the organization is active.
 *         members:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *           description: The members of the organization.
 *         owner:
 *           $ref: '#/components/schemas/User'
 *           description: The owner of the organization.
 *         address:
 *           type: string
 *           description: The address of the organization.
 *         website:
 *           type: string
 *           description: The website of the organization.
 *         phone:
 *           type: string
 *           description: The phone number of the organization.
 *         description:
 *           type: string
 *           description: The description of the organization.
 *       required:
 *         - name
 *         - apiKey
 */
