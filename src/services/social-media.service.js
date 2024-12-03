import twitterService from './twitter.service';
import redditService from './reddit.service';

class SocialMediaService {
  async postIncident(incident) {
    const results = {
      twitter: null,
      reddit: null,
      errors: []
    };

    try {
      // Post to Twitter
      results.twitter = await twitterService.postIncident(incident);
    } catch (error) {
      console.error('Twitter posting failed:', error);
      results.errors.push({
        platform: 'twitter',
        error: error.message
      });
    }

    try {
      // Post to Reddit
      results.reddit = await redditService.postIncident(incident);
    } catch (error) {
      console.error('Reddit posting failed:', error);
      results.errors.push({
        platform: 'reddit',
        error: error.message
      });
    }

    // Return results even if some platforms failed
    return results;
  }

  // Validate incident data before posting
  validateIncident(incident) {
    const requiredFields = ['description', 'zipCode', 'date'];
    const missingFields = requiredFields.filter(field => !incident[field]);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Validate ZIP code format
    const zipCodeRegex = /^\d{5}$/;
    if (!zipCodeRegex.test(incident.zipCode)) {
      throw new Error('Invalid ZIP code format');
    }

    // Validate media URLs if present
    if (incident.mediaUrls) {
      if (!Array.isArray(incident.mediaUrls)) {
        throw new Error('mediaUrls must be an array');
      }
      
      // Check if URLs are valid
      incident.mediaUrls.forEach(url => {
        try {
          new URL(url);
        } catch {
          throw new Error(`Invalid media URL: ${url}`);
        }
      });
    }

    return true;
  }

  // Format incident data for social media
  formatIncident(incident) {
    return {
      ...incident,
      description: this.sanitizeText(incident.description),
      mediaUrls: incident.mediaUrls?.map(url => this.sanitizeUrl(url)) || []
    };
  }

  // Sanitize text content
  sanitizeText(text) {
    // Remove any HTML tags
    text = text.replace(/<[^>]*>/g, '');
    // Remove multiple spaces
    text = text.replace(/\s+/g, ' ');
    // Trim whitespace
    return text.trim();
  }

  // Sanitize URLs
  sanitizeUrl(url) {
    try {
      const parsed = new URL(url);
      // Only allow http and https protocols
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        throw new Error('Invalid protocol');
      }
      return parsed.toString();
    } catch {
      throw new Error(`Invalid URL: ${url}`);
    }
  }
}

export default new SocialMediaService();
