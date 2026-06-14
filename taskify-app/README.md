# Taskify - Task Manager App

A simple, elegant task manager built with Express.js and vanilla JavaScript.

## Features
- ✅ Add, complete, and delete tasks
- 📝 Clean and intuitive UI
- 💾 Tasks persist in a JSON file
- 🌐 Full-stack JavaScript application

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Running Locally

```bash
npm start
```

Then open `http://localhost:3000` in your browser.

## Deployment

This app is ready to deploy to any Node.js hosting platform:

### Heroku
```bash
heroku create your-app-name
git push heroku main
```

### Other Platforms (Render, Railway, DigitalOcean, etc.)
- Set `PORT` environment variable (the app uses `process.env.PORT`)
- Run `npm install` on the server
- Start with `npm start`

## File Structure
```
taskify-app/
├── public/
│   └── index.html       # Frontend UI
├── server.js            # Express backend
├── tasks.json           # Task storage
├── package.json         # Dependencies
└── Procfile            # Heroku deployment config
```

## Environment Variables

The app uses these environment variables:
- `PORT` - Port to run the server on (default: 3000)
- `NODE_ENV` - Environment mode (default: development)

## Technology Stack
- **Backend**: Express.js (Node.js)
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Database**: JSON file storage
- **CORS**: Enabled for cross-origin requests

## License
ISC
