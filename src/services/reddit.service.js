import axios from 'axios';

class RedditService {
  constructor() {
    this.client = axios.create({
      baseURL: 'https://oauth.reddit.com/api',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'CrimeNet/1.0.0'
      }
    });

    // Initialize authentication
    this.initializeAuth();
  }

  async initializeAuth() {
    try {
      const auth = Buffer.from(
        `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`
      ).toString('base64');

      const response = await axios.post(
        'https://www.reddit.com/api/v1/access_token',
        'grant_type=password&username=' + 
        process.env.REDDIT_USERNAME + 
        '&password=' + 
        process.env.REDDIT_PASSWORD,
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      this.client.defaults.headers.common['Authorization'] = 
        `Bearer ${response.data.access_token}`;
    } catch (error) {
      console.error('Error authenticating with Reddit:', error);
      throw error;
    }
  }

  async postIncident(incident) {
    try {
      const { description, zipCode, mediaUrls } = incident;
      
      // Format post content
      const postContent = this.formatPostContent(description, zipCode, mediaUrls);
      
      // Submit post to appropriate subreddit
      const subreddit = process.env.REDDIT_SUBREDDIT || 'crimenetatx';
      
      const response = await this.client.post('/submit', {
        sr: subreddit,
        kind: 'self', // Text post
        title: `Incident Report: ${zipCode}`,
        text: postContent
      });

      return response.data;
    } catch (error) {
      console.error('Error posting to Reddit:', error);
      throw error;
    }
  }

  formatPostContent(description, zipCode, mediaUrls) {
    let content = `# CrimeNet Incident Report\n\n`;
    content += `## Location\nZIP Code: ${zipCode}\n\n`;
    content += `## Description\n${description}\n\n`;

    if (mediaUrls && mediaUrls.length > 0) {
      content += `## Evidence\n`;
      mediaUrls.forEach(url => {
        content += `- [Media](${url})\n`;
      });
    }

    content += `\n---\n*Posted by CrimeNet - Community Crime Awareness Network*`;
    return content;
  }
}

export default new RedditService();
