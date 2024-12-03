# CrimeNet

CrimeNet is a community-driven web application that helps communities defend and deter common crimes in their neighborhood using AI and social media integration.

## Features

- Submit incident reports with photos and videos
- AI-powered analysis using Google Cloud Vision API:
  - License plate detection and recognition
  - Person detection with estimated attributes:
    - Age range estimation
    - Height approximation
    - Detection confidence scoring
- Automated social media posting to X (Twitter) and Reddit
- Location-based incident mapping
- Community comment system
- Mobile-responsive design

## Tech Stack

- Vue.js 3 - Frontend framework
- Tailwind CSS - Styling
- Vite - Build tool
- Google Cloud Vision API - Image analysis
- Twitter API v2 - Social media integration
- Reddit API - Social media integration
- SQLite - Database (to be implemented)

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Google Cloud Platform account with Vision API enabled
- Twitter Developer Account with API access
- Reddit Account with API access

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

3. Configure environment variables:
```bash
cp .env.example .env
```
Edit the `.env` file with your API credentials:
- Google Cloud Vision API credentials
- Twitter API credentials
- Reddit API credentials
- Application configuration

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## AI Vision Integration

### Google Cloud Vision API Setup
1. Create a Google Cloud Platform account
2. Enable the Cloud Vision API
3. Create a service account and download the credentials JSON file
4. Add the path to your credentials file in the `.env`:
   ```
   GOOGLE_CLOUD_VISION_KEYFILE=path/to/your/credentials.json
   ```

### Vision Analysis Features
- **License Plate Detection**:
  - Automatically detects and extracts license plate numbers from images
  - High accuracy text recognition optimized for license plates
  - Confidence scoring for detected plates

- **Person Analysis**:
  - Detects persons in images
  - Estimates age ranges
  - Approximates height
  - Provides confidence scores for detections

## Social Media Integration

### Twitter Configuration
1. Create a Twitter Developer account at https://developer.twitter.com
2. Create a new project and app
3. Generate API keys and access tokens
4. Add the credentials to your `.env` file:
   - TWITTER_API_KEY
   - TWITTER_API_SECRET
   - TWITTER_ACCESS_TOKEN
   - TWITTER_ACCESS_SECRET

### Reddit Configuration
1. Create a Reddit account if you don't have one
2. Go to https://www.reddit.com/prefs/apps
3. Create a new application
4. Add the credentials to your `.env` file:
   - REDDIT_CLIENT_ID
   - REDDIT_CLIENT_SECRET
   - REDDIT_USERNAME
   - REDDIT_PASSWORD
   - REDDIT_SUBREDDIT

## Project Structure

```
crimenet-app/
├── src/
│   ├── components/    # Reusable Vue components
│   │   └── VisionAnalysisPreview.vue
│   ├── views/         # Page components
│   ├── router/        # Vue Router configuration
│   ├── services/      # API and service integrations
│   │   ├── vision.service.js
│   │   ├── twitter.service.js
│   │   ├── reddit.service.js
│   │   └── social-media.service.js
│   ├── assets/        # Static assets
│   ├── App.vue        # Root component
│   └── main.js        # Application entry point
├── public/            # Public static assets
└── index.html         # HTML entry point
```

## Development

The application is structured around three main views:
- Home: Displays recent incidents
- Submit: Form for reporting new incidents with AI analysis and social media integration
- IncidentDetail: Detailed view of specific incidents with AI analysis results

### Vision Analysis Process
When images are uploaded:
1. Files are validated for size and type
2. Images are processed through Google Cloud Vision API
3. License plates and persons are detected
4. Analysis results are displayed in real-time
5. Results are included with the incident report

### Social Media Posting
When a new incident is reported:
1. The application validates the incident data
2. Files are uploaded and processed
3. Vision analysis results are attached
4. The incident is posted to Twitter with media attachments
5. The incident is posted to Reddit with formatted content
6. Any posting errors are handled and displayed to the user

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.
