# CrimeNet

CrimeNet is a community-driven web application that helps communities defend and deter common crimes in their neighborhood using AI and social media integration.

## Features

- Submit incident reports with photos and videos
- AI-powered analysis of media for license plate detection and person identification
- Location-based incident mapping
- Community comment system
- Social media integration (X/Twitter and Reddit posting)
- Mobile-responsive design

## Tech Stack

- Vue.js 3 - Frontend framework
- Tailwind CSS - Styling
- Vite - Build tool
- Google Gemini AI - Media analysis (to be implemented)
- SQLite - Database (to be implemented)

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Setup and Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd crimenet-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
crimenet-app/
├── src/
│   ├── components/    # Reusable Vue components
│   ├── views/         # Page components
│   ├── router/        # Vue Router configuration
│   ├── assets/        # Static assets
│   ├── App.vue        # Root component
│   └── main.js        # Application entry point
├── public/            # Public static assets
└── index.html         # HTML entry point
```

## Development

The application is structured around three main views:
- Home: Displays recent incidents
- Submit: Form for reporting new incidents
- IncidentDetail: Detailed view of specific incidents with AI analysis

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.
