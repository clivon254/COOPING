

// tailwind.config.mjs
export default {
    content: [
      './src/**/*.{js,jsx}', // Adjust this path based on your project structure
      'node_modules/flowbite-react/**/*.{js,jsx}', // Include Flowbite React components
    ],
    plugins: [
      require('flowbite/plugin'), // Add Flowbite plugin
    ],
  };