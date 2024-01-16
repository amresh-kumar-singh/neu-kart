# NEU KART

> This application provides users with an excellent shopping experience, permitting them to browse a wide range of products, add items to their shopping cart, and easily complete the checkout process. Administrators have access to tools for managing discount codes as well as evaluating key data on sales.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [License](#license)
- [Documentation](#documentation)

## Installation

Clone the Git repository, navigate to the root directory, install dependencies, and initiate the application by running the appropriate start command.

```bash
git clone https://github.com/amresh-kumar-singh/neu-kart
```

```bash
cd neu-kart
```

```bash
yarn install
```

## Usage

- Start the application: `yarn start` or `yarn devStart`
- Access the app in your browser at [http://localhost:5173/](http://localhost:5173/)

## Configuration

- An administrator user is automatically generated upon installation. To access the administrative functionalities, log in using the username "Admin" and password "admin".
- The default configuration for discounts is set to apply to every 2nd order. This setting can be found in the file located at /server/info/discountAfterNOrder.js.

## License

This project is licensed under the MIT.

## Documentation

All API endpoints, along with sample request, are documented in the REST client file located at /server/.rest."
