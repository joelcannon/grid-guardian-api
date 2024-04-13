const { OrganizationModel } = require("../models/organization-model");

function findOrganizationById(id) {
  // console.log("findOrganizationById", id);
  // console.log('Organization', Organization)
  return OrganizationModel.findById(id).populate("members").populate("owner");
}

async function findOrganizationByName(name) {
  return OrganizationModel.findOne({ name: name })
    .populate("members")
    .populate("owner");
}

async function createOrganization(organizationData) {
  const organization = new Organization(organizationData);
  return await organization.save();
}

async function findOrCreateOrganization(profile) {
  const organization = await OrganizationModel.findOrCreate(
    { name: profile.name },
    {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
      website: profile.website,
      description: profile.description,
      isActive: profile.isActive,
    }
  );
  return organization;
}

module.exports = {
  findOrganizationById,
  findOrganizationByName,
  createOrganization,
  findOrCreateOrganization,
};
