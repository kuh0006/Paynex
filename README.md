# Paynex - Merchant Management System

A full-stack application for managing merchants using Angular frontend and ASP.NET Core Web API backend.

## Project Structure

- **Frontend**: Angular 20+ with Angular Material UI
- **Backend**: ASP.NET Core Web API
- **Database**: MS SQL Server with Entity Framework Core

## Setup Instructions

### Backend (ASP.NET Core Web API)

1. Update the connection string in `appsettings.json` if necessary:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=PaynexDB;Trusted_Connection=True;MultipleActiveResultSets=true"
}
```

2. Run the EF Core migrations to create the database:

```powershell
dotnet ef database update --project MM.Entities --startup-project MM.Api
```

3. Start the API:

```powershell
cd MM.Api
dotnet run
```

The API will be available at http://localhost:5000

### Frontend (Angular)

1. Navigate to the UI project:

```powershell
cd mm-ui
```

2. Install dependencies:

```powershell
npm install
```

3. Start the Angular application:

```powershell
npm start
```

The application will be available at http://localhost:4200

## Features

- View a list of all merchants
- Add new merchants
- Edit existing merchants
- Delete merchants
- Form validation for merchant fields
- Responsive UI using Angular Material

## API Endpoints

- `GET /api/merchants/all` - Get all merchants
- `GET /api/merchants/{id}` - Get merchant by id
- `POST /api/merchants` - Create a new merchant
- `PUT /api/merchants/{id}` - Update an existing merchant
- `DELETE /api/merchants/{id}` - Delete a merchant

## Technologies Used

- **Frontend**: 
  - Angular 20+
  - Angular Material
  - RxJS
  - TypeScript
  
- **Backend**:
  - ASP.NET Core Web API
  - Entity Framework Core
  - MS SQL Server

## Assumptions and Decisions

1. Used Angular Material for a modern and responsive UI
2. Implemented a repository pattern and service layer in the backend
3. Added custom validation for merchant categories
4. Included delete functionality as a bonus feature
5. Added error handling and loading states for better UX

## Future Enhancements

- Add filtering by category 
- Add search by merchant name
- Implement pagination for large datasets
- Add unit tests for frontend and backend
- Implement soft delete functionality
