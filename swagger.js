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
      description: 'localhost:8080',
    },
    {
      // This is another option that can be selected to connect through.
      url: 'https://grid-guardian-api.onrender.com/',
      description: 'Render URL',
    },
  ],
}

const outputFile = './swagger-output.json'
const routes = ['./routes/index.js']

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

// swaggerAutogen(outputFile, routes, doc)
console.log('Running swagger script...')
swaggerAutogen(outputFile, routes, doc)
