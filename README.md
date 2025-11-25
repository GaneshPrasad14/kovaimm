# Kovai Marriages Backend

Backend API for the Kovai Marriages Bloom matrimonial website built with Node.js, Express, and MongoDB.

## Features

- **Profile Management**: CRUD operations for bride and groom profiles
- **Admin Authentication**: JWT-based authentication for admin users
- **Search & Filter**: Advanced search functionality for profiles
- **Image Upload**: Images stored as Base64 in MongoDB (persistent storage)
- **CORS Enabled**: Configured for frontend integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **CORS**: Enabled for cross-origin requests

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your MongoDB connection string and other configurations.

5. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/kovai-marriages` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key` |
| `ADMIN_USERNAME` | Admin username | `admin` |
| `ADMIN_PASSWORD` | Admin password | `admin123` |
| `PORT` | Server port | `5000` |

## Image Storage

Images are stored directly in MongoDB as Base64-encoded strings. This ensures:
- **Persistence**: Images persist across server restarts and deployments
- **No file system dependency**: Works on ephemeral file systems (Render, Heroku, etc.)
- **No external service needed**: Uses your existing MongoDB Atlas database
- **Automatic backup**: Images are backed up with your database

**Note**: Each image is limited to 5MB. Images are automatically converted to Base64 format when uploaded

## API Endpoints

### Admin Routes
- `POST /api/admin/login` - Admin login
- `GET /api/admin/verify` - Verify admin token

### Profile Routes
- `GET /api/profiles/:type` - Get all profiles by type (bride/groom)
- `GET /api/profiles/profile/:id` - Get single profile
- `GET /api/profiles/search/:type` - Search profiles with filters
- `POST /api/profiles` - Create new profile (Admin only)
- `PUT /api/profiles/:id` - Update profile (Admin only)
- `DELETE /api/profiles/:id` - Delete profile (Admin only)

### Health Check
- `GET /api/health` - Server health check

## Usage

### Admin Login
```javascript
const response = await fetch('http://localhost:5000/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'admin', password: 'admin123' })
});
```

### Create Profile
```javascript
const response = await fetch('http://localhost:5000/api/profiles', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(profileData)
});
```

### Get Profiles
```javascript
const response = await fetch('http://localhost:5000/api/profiles/groom');
const profiles = await response.json();
```

## Profile Schema

```javascript
{
  name: String (required),
  dateOfBirth: Date (required),
  birthTime: String,
  job: String,
  company: String,
  salary: String,
  familyIncome: String,
  gender: String (required, enum: ['male', 'female']),
  horoscope: String,
  image: String, // Base64 encoded data URI
  otherDetails: String,
  type: String (required, enum: ['bride', 'groom']),
  age: Number (auto-calculated),
  profession: String,
  location: String,
  education: String
}
```

## Development

- Use `npm run dev` for development with nodemon
- Use `npm start` for production
- MongoDB should be running locally or provide a cloud MongoDB URI

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
