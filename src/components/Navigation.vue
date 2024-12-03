<template>
  <nav class="bg-white shadow-md">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <router-link to="/" class="flex items-center">
          <span class="text-2xl font-bold text-blue-600">CrimeNet</span>
        </router-link>
        
        <div class="flex items-center space-x-4">
          <router-link 
            to="/" 
            class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
            :class="{ 'text-blue-600': $route.path === '/' }"
          >
            Home
          </router-link>
          <router-link 
            to="/submit" 
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Report Incident
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>
