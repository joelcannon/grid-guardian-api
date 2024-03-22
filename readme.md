# How to run it

Run pnpm install and npm dev from root in the terminal

Test the endpoints in the routes.rest file with Rest Client or another similar tool.

GitHub - https://github.com/joelcannon/grid-guardian-api
Render - https://grid-guardian-api.onrender.com
Swagger API Docs - https://grid-guardian-api.onrender.com/api-docs/
Demo - https://somup.com/cZeb1DC1HH

## Development

This project uses [pnpm](https://pnpm.io/) for managing dependencies. `pnpm` is a fast, disk space efficient package manager.

To install `pnpm`, you can use `npm`:

```bash
npm install -g pnpm
```

To install the project dependencies, navigate to the project directory and run:

```bash
pnpm install
```

To run the project:

```bash
pnpm run start
```

When adding new dependencies to the project, make sure to use pnpm:

```bash
pnpm add [package-name]
```

By using pnpm, we ensure that everyone is using the same package manager, leading to more consistent installations and fewer 'it works on my machine' issues.

Remember to replace [package-name] with the actual name of the package you want to add.
