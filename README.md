# Food Finder

## Overview

Food Finder is a full-stack application that allows users to:

- Search for nearby restaurants using the Google Places API.
- Generate restaurant orders using the OpenAI API.
- Log and view analytics in a MongoDB database.

The backend is built with Node.js, Express, and Mongoose, and the frontend is built with React.

## Features

- **Restaurant Search**: Fetch nearby restaurants based on user location.
- **Order Generation**: Generate restaurant orders via OpenAI.
- **Analytics Logging**: Store order queries and results along with user location.
- **Responsive UI**: Modern React interface for a great user experience.

## Prerequisites

- Node.js and npm installed.
- MongoDB Atlas account (or local MongoDB instance).
- Valid API keys for:
  - Google Places API
  - OpenAI API

## Setup

### frontend (Client)

**Navigate to the client directory:**

```bash
cd "/Users/nicholaschen/food finder/client"
npm start
```

### Backend (Server)

**Navigate to the server directory:**

```bash
cd "/Users/nicholaschen/food finder/server"
npm start
 ```

**Install dependencies:**

 install in client directory

 ```bash
 cd "/Users/nicholaschen/food finder/client"
 npm install
 ```
 install in server directory

 ```bash
 cd "/Users/nicholaschen/food finder/server"
 npm install
 ```

**Create a `.env` file in the root directory:**
  
  create in server directory

 ```bash
 cd "/Users/nicholaschen/food finder/server"
 touch .env
 ```
  create in client directory

 ```bash
 cd "/Users/nicholaschen/food finder/client"
 touch .env
 ```
**Add the following environment variables to the `.env` file:**

  server directory
 ```bash
 GOOGLE__API_KEY=<YOUR_GOOGLE_API_KEY>
 OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
 DATABASE_URL=<YOUR_MONGODB_URI>
 ```

  client directory
 ```bash 
 REACT_APP_API_URL=http://localhost:3000
 ```
