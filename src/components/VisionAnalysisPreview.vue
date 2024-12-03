<template>
  <div class="bg-white rounded-lg shadow p-4 mt-4">
    <h3 class="text-lg font-semibold mb-4">AI Analysis Results</h3>
    
    <!-- Loading State -->
    <div v-if="isAnalyzing" class="flex items-center justify-center py-4">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span class="ml-2 text-gray-600">Analyzing media...</span>
    </div>

    <!-- Results -->
    <div v-else-if="analysis" class="space-y-4">
      <!-- License Plate Detection -->
      <div v-if="analysis.licensePlate" class="border-l-4 border-blue-500 pl-4">
        <h4 class="font-medium text-gray-900">License Plate Detection</h4>
        <p v-if="analysis.licensePlate.found" class="text-gray-700">
          Detected plate: <span class="font-mono bg-gray-100 px-2 py-1 rounded">{{ analysis.licensePlate.plate }}</span>
        </p>
        <p v-else class="text-gray-500">No license plates detected</p>
      </div>

      <!-- Person Analysis -->
      <div v-if="analysis.persons" class="border-l-4 border-green-500 pl-4">
        <h4 class="font-medium text-gray-900">Person Analysis</h4>
        <div v-if="analysis.persons.found">
          <div v-for="(person, index) in analysis.persons.persons" :key="index" class="mt-2">
            <p class="text-gray-700">Person {{ index + 1 }}:</p>
            <ul class="list-disc list-inside ml-4 text-gray-600">
              <li>
                Estimated Age: {{ person.attributes.age.min }}-{{ person.attributes.age.max }} years
              </li>
              <li>
                Estimated Height: {{ person.attributes.height.feet }}'{{ person.attributes.height.inches }}"
              </li>
              <li>
                Confidence: {{ Math.round(person.confidence * 100) }}%
              </li>
            </ul>
          </div>
        </div>
        <p v-else class="text-gray-500">No persons detected</p>
      </div>

      <!-- Timestamp -->
      <div class="text-xs text-gray-500 mt-2">
        Analysis completed: {{ new Date(analysis.timestamp).toLocaleString() }}
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-red-600 bg-red-50 p-4 rounded">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VisionAnalysisPreview',
  props: {
    analysis: {
      type: Object,
      default: null
    },
    isAnalyzing: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    }
  }
}
</script>
