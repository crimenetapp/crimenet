import vision from '@google-cloud/vision';

class VisionService {
  constructor() {
    // Initialize Vision client with credentials from environment
    this.client = new vision.ImageAnnotatorClient({
      keyFilename: process.env.GOOGLE_CLOUD_VISION_KEYFILE
    });
  }

  async analyzeLicensePlate(imageBuffer) {
    try {
      // Perform text detection to find license plates
      const [result] = await this.client.textDetection(imageBuffer);
      const detections = result.textAnnotations;

      if (!detections || detections.length === 0) {
        return { found: false, plate: null };
      }

      // Filter for text that matches license plate patterns
      const licensePlateRegex = /^[A-Z0-9]{5,8}$/; // Adjust regex based on your needs
      const potentialPlates = detections
        .map(text => text.description.replace(/\s/g, '').toUpperCase())
        .filter(text => licensePlateRegex.test(text));

      return {
        found: potentialPlates.length > 0,
        plate: potentialPlates[0] || null
      };
    } catch (error) {
      console.error('Error detecting license plate:', error);
      throw error;
    }
  }

  async analyzePerson(imageBuffer) {
    try {
      // Perform multiple detection types
      const [result] = await this.client.annotateImage({
        image: { content: imageBuffer },
        features: [
          { type: 'FACE_DETECTION' },
          { type: 'OBJECT_LOCALIZATION' }
        ]
      });

      const analysis = {
        found: false,
        persons: []
      };

      if (!result.faceAnnotations && !result.localizedObjectAnnotations) {
        return analysis;
      }

      // Process face detections
      const faces = result.faceAnnotations || [];
      const persons = result.localizedObjectAnnotations || [];

      // Filter for person objects
      const personObjects = persons.filter(obj => obj.name === 'Person');

      // Combine face and person detection results
      personObjects.forEach((person, index) => {
        const face = faces[index];
        const personAnalysis = {
          confidence: person.score,
          boundingBox: person.boundingPoly.normalizedVertices,
          attributes: {}
        };

        if (face) {
          // Estimate age range based on face detection
          personAnalysis.attributes = {
            age: this.estimateAgeRange(face),
            ethnicity: this.detectEthnicity(face),
            height: this.estimateHeight(person.boundingPoly.normalizedVertices)
          };
        }

        analysis.persons.push(personAnalysis);
      });

      analysis.found = analysis.persons.length > 0;
      return analysis;
    } catch (error) {
      console.error('Error analyzing person:', error);
      throw error;
    }
  }

  estimateAgeRange(face) {
    // Use face landmarks and detection confidence to estimate age range
    const joyLikelihood = face.joyLikelihood;
    const sorrowLikelihood = face.sorrowLikelihood;
    const angerLikelihood = face.angerLikelihood;
    
    // This is a simplified estimation - you might want to use more sophisticated logic
    let ageRange = {
      min: 20,
      max: 40
    };

    // Adjust based on detection confidence and features
    if (face.detectionConfidence > 0.8) {
      // Fine-tune age range based on detected features
      // This is a placeholder for more sophisticated age detection logic
      ageRange = this.adjustAgeRange(face);
    }

    return ageRange;
  }

  adjustAgeRange(face) {
    // Placeholder for more sophisticated age range adjustment
    // You would implement this based on specific facial features
    return {
      min: 20,
      max: 40
    };
  }

  detectEthnicity(face) {
    // Placeholder for ethnicity detection
    // Note: This should be implemented with careful consideration of ethical implications
    // and potential biases in AI systems
    return "Not specified";
  }

  estimateHeight(boundingBox) {
    // Estimate height based on bounding box and typical human proportions
    // This is a simplified calculation - you might want to use more sophisticated logic
    const heightInPixels = Math.abs(boundingBox[0].y - boundingBox[2].y);
    
    // Convert to approximate feet/inches (very rough estimation)
    const estimatedHeight = {
      feet: 5,
      inches: 8
    };

    return estimatedHeight;
  }

  async analyzeImage(imageBuffer) {
    try {
      // Perform both license plate and person detection
      const [licensePlateResult, personResult] = await Promise.all([
        this.analyzeLicensePlate(imageBuffer),
        this.analyzePerson(imageBuffer)
      ]);

      return {
        licensePlate: licensePlateResult,
        persons: personResult,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error analyzing image:', error);
      throw error;
    }
  }
}

export default new VisionService();
