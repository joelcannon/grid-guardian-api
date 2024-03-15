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

const Organization = mongoose.model('Organization', OrganizationSchema)
return Organization
