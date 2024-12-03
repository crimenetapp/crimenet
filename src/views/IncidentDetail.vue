<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h1 class="text-2xl font-bold mb-2">Incident #{{ $route.params.id }}</h1>
            <div class="flex items-center gap-4">
              <span class="text-gray-500">{{ new Date().toLocaleDateString() }}</span>
              <span class="text-gray-500">ZIP: 78701</span>
            </div>
          </div>
          <router-link 
            to="/" 
            class="text-gray-600 hover:text-gray-800"
          >
            ← Back to List
          </router-link>
        </div>
        <p class="text-gray-700">
          This is a sample incident description. The actual description will be loaded from the database.
          AI analysis will provide additional details about suspects and vehicles identified in the uploaded media.
        </p>
      </div>

      <!-- Media Gallery -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-bold mb-4">Evidence & Media</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div class="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg">
            <div class="flex items-center justify-center">
              <span class="text-gray-400">Media placeholder</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Map -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-bold mb-4">Location</h2>
        <div class="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg">
          <div class="flex items-center justify-center">
            <span class="text-gray-400">Map placeholder</span>
          </div>
        </div>
      </div>

      <!-- AI Analysis -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-bold mb-4">AI Analysis</h2>
        <div class="space-y-4">
          <div class="border-l-4 border-blue-500 pl-4">
            <h3 class="font-medium">License Plate Detection</h3>
            <p class="text-gray-600">No license plates detected in uploaded media</p>
          </div>
          <div class="border-l-4 border-green-500 pl-4">
            <h3 class="font-medium">Person Analysis</h3>
            <p class="text-gray-600">Pending AI analysis of uploaded media</p>
          </div>
        </div>
      </div>

      <!-- Comments -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold mb-4">Community Comments</h2>
        
        <!-- Comment Form -->
        <form @submit.prevent="addComment" class="mb-6">
          <textarea 
            v-model="newComment"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a comment..."
          ></textarea>
          <div class="mt-2 flex justify-end">
            <button 
              type="submit"
              class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Post Comment
            </button>
          </div>
        </form>

        <!-- Comments List -->
        <div class="space-y-4">
          <div v-for="i in 2" :key="i" class="border-b border-gray-200 pb-4">
            <div class="flex justify-between items-start mb-2">
              <span class="font-medium">Community Member</span>
              <span class="text-sm text-gray-500">{{ new Date().toLocaleDateString() }}</span>
            </div>
            <p class="text-gray-700">This is a sample comment. The actual comments will be loaded from the database.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IncidentDetail',
  data() {
    return {
      newComment: ''
    }
  },
  methods: {
    addComment() {
      if (this.newComment.trim()) {
        // TODO: Implement comment submission logic
        console.log('New comment:', this.newComment)
        this.newComment = ''
      }
    }
  }
}
</script>
