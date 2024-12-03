import { TwitterApi } from 'twitter-api-v2';

class TwitterService {
  constructor() {
    // Initialize Twitter client with environment variables
    this.client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET,
    });
  }

  async postIncident(incident) {
    try {
      const { description, zipCode, mediaUrls } = incident;
      
      // Create tweet text
      const tweetText = this.formatTweetText(description, zipCode);
      
      // Post tweet with media if available
      if (mediaUrls && mediaUrls.length > 0) {
        // Upload media first
        const mediaIds = await Promise.all(
          mediaUrls.slice(0, 4).map(url => this.client.v1.uploadMedia(url))
        );
        
        // Post tweet with media
        return await this.client.v2.tweet({
          text: tweetText,
          media: { media_ids: mediaIds }
        });
      } else {
        // Post text-only tweet
        return await this.client.v2.tweet({ text: tweetText });
      }
    } catch (error) {
      console.error('Error posting to Twitter:', error);
      throw error;
    }
  }

  formatTweetText(description, zipCode) {
    // Truncate description to fit tweet length
    const maxLength = 250; // Leave room for ZIP code and hashtags
    const truncatedDesc = description.length > maxLength 
      ? `${description.substring(0, maxLength - 3)}...` 
      : description;

    return `${truncatedDesc}\n\nLocation: ${zipCode}\n#CrimeNet #CommunityAlert`;
  }
}

export default new TwitterService();
