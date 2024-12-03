<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Recent Incidents</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Placeholder for incident cards -->
      <div v-for="i in 3" :key="i" class="bg-white rounded-lg shadow-md p-6">
        <div class="mb-4">
          <span class="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Incident #{{ i }}</span>
          <span class="ml-2 text-gray-500 text-sm">78701</span>
        </div>
        <p class="text-gray-700 mb-4">Sample incident description. This is a placeholder for actual incident reports.</p>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-500">{{ new Date().toLocaleDateString() }}</span>
          <router-link :to="'/incident/' + i" class="text-blue-600 hover:text-blue-800">View Details →</router-link>
        </div>
      </div>
    </div>
    <div class="mt-8 text-center">
      <router-link 
        to="/submit" 
        class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Report New Incident
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
