const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' })

const doc = {
  info: {
    title: 'grid-guardian-api',
    description:
      'BYUI CSE341 Week 3: API Documentation for grid-guardian project',
    version: '1.0.0',
  },
  servers: [
    // Used in place of 'schemes', 'basePath', etc.
    // Look into documentation on their GitHub repo's.
    {
      // The first url set will be your default.
      url: 'http://localhost:8080',
      description: 'local dev URL',
    },
    {
      // This is another option that can be selected to connect through.
      url: 'https://cse341-w4-h46g.onrender.com',
      description: 'production Render URL',
    },
  ],
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        // name the security scheme
        type: 'apiKey',
        in: 'header', // API key is passed in the header
        name: 'apiKey', // name of the header, parameter or cookie
      },
      OAuth2: {
        type: 'oauth2',
        flows: {
          authorizationCode: {
            authorizationUrl: 'https://github.com/login/oauth/authorize',
            tokenUrl: 'https://github.com/login/oauth/access_token',
            scopes: {
              'read:user': 'Read user data',
            },
          },
        },
      },
    },
  },
  security: [
    {
      ApiKeyAuth: [],
    },
    { OAuth2: ['read:user'] },
  ],
}

const outputFile = './docs/openapi.json'
const endpointsFiles = [
  './routes/index.js',
  './routes/status.js',
  './models/*.js',
] // Include all files in these models

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

console.log('Running swagger script...')
swaggerAutogen(outputFile, endpointsFiles, doc)
