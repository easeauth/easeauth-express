# @easeauth/express

This repository contains an npm package designed to enhance Express.js applications by providing authentication middleware to protect API routes and ensure secure access. The package includes tools for route protection using JWT and customizable middleware for efficient API management.

## Features

- **Route Protection**: Easily secure your Express routes with authentication middleware.
- **JWT Integration**: Simple JWT integration for token-based authentication.


## Installation

To install `@easeauth/express`, run the following command:

```bash
npm install @easeauth/express
```

## Usage

### Route Protection:

To use the `withAuth` middleware for protecting routes, follow these steps:


```ts
import express, { Request, Response } from "express";
import { withAuth, globalErrorHandler } from "@easeauth/express";

const app = express();
const PORT = process.env.PORT || 3000;

// NOTE: Ensure the authentication middleware is registered before other middleware or routes. This guarantees that all incoming requests are processed by the authentication logic first.
app.use(withAuth({
    include: ["/admin"],            // Specify paths that require authentication
    exclude: ["/admin/dashboard"],  // Specify paths to exclude from authentication
    config: {
        JWT_SECRET_KEY: "your_secret_key"  // Replace with your actual JWT secret key
    }
}));
app.use(globalErrorHandler);

// Example protected route
app.get("/admin/settings", (req: Request, res: Response) => {
    res.send("Welcome to the admin settings!");
});

// Example exclude route
app.get("/admin/dashboard", (req: Request, res: Response) => {
    res.send("Welcome to the admin dashboard!");
});

// Example unprotected route
app.get("/public", (req: Request, res: Response) => {
    res.send("This is a public route.");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

## Configuration Options
- **include**: An array of paths to include in authentication checks.
- **exclude**: An array of paths to exclude from authentication checks.
- **config.JWT_SECRET_KEY**: Your JWT secret key for token validation.


## Contributing

If you want to contribute to this project, feel free to fork the repository, make changes, and submit a pull request. Please make sure to review the [Contribution Guidelines](CONTRIBUTING.md) before contributing.
