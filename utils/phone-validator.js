const { accountSid, authToken } = require('../config/twilio.config')
const client = require('twilio')(accountSid, authToken)

async function isPhoneNumberValid(phoneNumber) {
  try {
    const data = await client.lookups
      .phoneNumbers(phoneNumber)
      .fetch({ type: 'carrier' })
    return data.carrier.type === 'mobile'
  } catch (error) {
    console.error(error)
    return false
  }
}
