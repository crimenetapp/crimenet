<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 class="text-3xl font-bold mb-8">Report an Incident</h1>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Date of Incident
          </label>
          <input 
            type="date" 
            v-model="formData.date"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            ZIP Code
          </label>
          <input 
            type="text" 
            v-model="formData.zipCode"
            pattern="[0-9]{5}"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter 5-digit ZIP code"
            required
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea 
            v-model="formData.description"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the incident in detail..."
            required
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Upload Photos/Videos
          </label>
          <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div class="space-y-1 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div class="flex text-sm text-gray-600">
                <label class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Upload files</span>
                  <input type="file" class="sr-only" multiple @change="handleFileUpload" accept="image/*,video/*">
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs text-gray-500">
                PNG, JPG, MP4 up to 10MB
              </p>
            </div>
          </div>
          <!-- Preview uploaded files -->
          <div v-if="formData.files.length > 0" class="mt-4 grid grid-cols-2 gap-4">
            <div v-for="(file, index) in formData.files" :key="index" class="relative">
              <img 
                v-if="file.type.startsWith('image/')"
                :src="URL.createObjectURL(file)"
                class="h-24 w-full object-cover rounded"
                alt="Preview"
              >
              <video 
                v-else-if="file.type.startsWith('video/')"
                :src="URL.createObjectURL(file)"
                class="h-24 w-full object-cover rounded"
                controls
              ></video>
              <button 
                @click="removeFile(index)"
                class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2"
                type="button"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <!-- Status Messages -->
        <div v-if="status.message" :class="[
          'p-4 rounded-md',
          status.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        ]">
          {{ status.message }}
        </div>

        <div class="flex items-center justify-between">
          <router-link 
            to="/" 
            class="text-gray-600 hover:text-gray-800"
          >
            Cancel
          </router-link>
          <button 
            type="submit"
            class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Submitting...' : 'Submit Report' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import socialMediaService from '../services/social-media.service';

export default {
  name: 'Submit',
  data() {
    return {
      formData: {
        date: '',
        zipCode: '',
        description: '',
        files: []
      },
      isSubmitting: false,
      status: {
        message: '',
        type: 'success'
      }
    }
  },
  methods: {
    handleFileUpload(event) {
      const newFiles = Array.from(event.target.files);
      
      // Validate file size and type
      const validFiles = newFiles.filter(file => {
        const isValidType = file.type.startsWith('image/') || file.type.startsWith('video/');
        const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
        return isValidType && isValidSize;
      });

      this.formData.files = [...this.formData.files, ...validFiles];
    },

    removeFile(index) {
      this.formData.files.splice(index, 1);
    },

    async uploadFiles() {
      // TODO: Implement file upload to server/cloud storage
      // For now, return mock URLs
      return this.formData.files.map((file, index) => 
        `https://example.com/media/${index}-${file.name}`
      );
    },

    async handleSubmit() {
      try {
        this.isSubmitting = true;
        this.status.message = '';

        // Upload files first
        const mediaUrls = await this.uploadFiles();

        // Prepare incident data
        const incident = {
          description: this.formData.description,
          zipCode: this.formData.zipCode,
          date: this.formData.date,
          mediaUrls
        };

        // Validate incident data
        socialMediaService.validateIncident(incident);

        // Post to social media
        const results = await socialMediaService.postIncident(incident);

        // Handle results
        if (results.errors.length > 0) {
          const platforms = results.errors.map(e => e.platform).join(', ');
          this.status.message = `Report submitted, but failed to post to: ${platforms}`;
          this.status.type = 'error';
        } else {
          this.status.message = 'Report submitted successfully!';
          this.status.type = 'success';
          
          // Navigate back to home after a short delay
          setTimeout(() => {
            this.$router.push('/');
          }, 2000);
        }
      } catch (error) {
        console.error('Error submitting report:', error);
        this.status.message = error.message || 'Error submitting report';
        this.status.type = 'error';
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
</script>
