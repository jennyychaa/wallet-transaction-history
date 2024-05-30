# Wallet Transaction History Application

This user-friendly proof-of-concept application is designed for novice cryptocurrency enthusiasts (e.g., an elderly family member) to understand their transaction history on Ethereum effortlessly. The application should present the transaction history associated with a given wallet address straightforwardly and intuitively, akin to traditional bank transaction records. Despite the abundance of blockchain explorers available, their tendency to overwhelm users with excessive data often complicates understanding transactions. This project aims to harness available data sources and services to craft a more accessible and engaging user experience for a blockchain-novice audience.

## Prerequistes

Before getting started, make sure you'll need to install the following items on your development machine: 

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/getting-started/install)

## Getting Started

### Moralis API 

This application fetches the transaction history using [Moralis Wallet API](https://moralis.io/api/wallet/). To successfully run the server, you must [create an account](https://admin.moralis.io/login) and obtain an API key. Once you've generated an API key, create a `.env` file in the root of the server project and add the following line: 

```.env
API_KEY=INSERT_YOUR_API_KEY_HERE
```
### Running Your Application!

1. Let's first run the server by running the following commands in your terminal:

```
$ cd server
$ yarn install
$ yarn start
```

2. You are all set 🥳 🎉 To start your local environment, run:

```
$ cd app
$ yarn install
$ yarn dev
```
You can view the application by navigating to http://localhost:5173/.

<div align="center">
  <img src="https://github.com/jennyychaa/wallet-transaction-history/assets/16579792/60f6e145-3b84-4104-87f8-e1694dfbc4ed" alt="Screenshot of Wallet Transaction History Application" />
</div>
