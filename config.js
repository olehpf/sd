export default {
  source: ['tokens/**/*.json'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/',
      files: [
        {
          destination: 'colors.scss',
          format: 'scss/variables',
          filter: (token) => token.filePath.includes('colors.json')
        },
        {
          destination: 'typography.scss',
          format: 'scss/variables',
          filter: (token) => token.filePath.includes('typography.json')
        },
        
        // Add more files here as you create more token files
        // {
        //   destination: 'typography.scss',
        //   format: 'scss/variables',
        //   filter: (token) => token.filePath.includes('typography.json')
        // }
      ]
    },
    css: {
      transformGroup: 'css',
      buildPath: 'dist/',
      files: [
        {
          destination: 'colors.css',
          format: 'css/variables',
          filter: (token) => token.filePath.includes('colors.json')
        },
        {
          destination: 'typography.css',
          format: 'css/variables',
          filter: (token) => token.filePath.includes('typography.json')
        },
        // Add more files here as you create more token files
        // {
        //   destination: 'typography.css',
        //   format: 'css/variables',
        //   filter: (token) => token.filePath.includes('typography.json')
        // }
      ]
    }
  }
};