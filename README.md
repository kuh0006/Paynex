# Paynex - Merchant Management System

This is a web application to manage merchants. It has two parts: a frontend built with Angular and a backend built with ASP.NET Core.

## What you need to install first

Before you start, make sure you have these programs on your computer:

- [.NET SDK](https://dotnet.microsoft.com/download/dotnet) - for the backend
- [Node.js](https://nodejs.org/) (version 18 or newer) - for the frontend
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) or SQL Server Express - for the database
- Entity Framework Tools - install with this command: `dotnet tool install --global dotnet-ef`
- Angular CLI - install with this command: `npm install -g @angular/cli`

## How to get the project

Download or clone this project to your computer:

```powershell
git clone [your-repository-url]
cd Paynex
```

## Project Structure

- **mm-ui/** - Frontend (Angular app with nice UI)
- **MM.Api/** - Backend (Web API that handles data)
- **MM.Entities/** - Database models and setup
- **MM.Repository/** - Data access layer
- **MM.Services/** - Business logic
- **MM.Contracts/** - Interfaces

## How to run the project

**Important:** Run all commands from the main project folder (Paynex).

### Step 1: Set up the database

First, you need to create the database:

1. Open the file `MM.Api/appsettings.json` and check the database connection. You can change it if needed:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=PaynexDB;Trusted_Connection=True"
}
```

2. Create the database by running this command:

```powershell
dotnet ef database update --project MM.Entities --startup-project MM.Api
```

### Step 2: Start the backend (API)

1. Go to the API folder:

```powershell
cd MM.Api
```

2. Build and run the API:

```powershell
dotnet restore
dotnet run
```

The API will start at https://localhost:7111 (HTTPS) and http://localhost:5290 (HTTP)

### Step 3: Start the frontend (Angular app)

1. Open a new terminal and go to the frontend folder:

```powershell
cd mm-ui
```

2. Install the required packages:

```powershell
npm install
```

3. Start the Angular app:

```powershell
npm start
```

The app will open at http://localhost:4200

## What the app can do

- See a list of all merchants
- Add new merchants
- Edit merchant information
- Delete merchants
- Check if forms are filled correctly

## API Endpoints (for developers)

- `GET /api/merchants/all` - Get all merchants
- `GET /api/merchants/{id}` - Get one merchant by ID
- `POST /api/merchants` - Add a new merchant
- `PUT /api/merchants/{id}` - Update a merchant
- `DELETE /api/merchants/{id}` - Delete a merchant

## Technologies we used

**Frontend (what users see):**

- Angular 20+ - main framework
- Angular Material - nice looking components
- TypeScript - programming language

**Backend (server side):**

- ASP.NET Core Web API - handles requests
- Entity Framework Core - works with database
- MS SQL Server - stores data

## Troubleshooting

**Problem: Database won't create**

- Make sure SQL Server is running
- Check if you have the right connection string
- Try running the database update command again

**Problem: Frontend won't start**

- Make sure Node.js is installed
- Try deleting the `node_modules` folder and run `npm install` again
- Check if you're using Node.js version 18 or newer

**Problem: API won't start**

- Make sure .NET SDK is installed
- Try running `dotnet restore` first
- Check if ports 7111 (HTTPS) or 5290 (HTTP) are already being used
