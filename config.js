import StyleDictionary from 'style-dictionary';

// Custom format to output all mode variations with clean naming for CSS
StyleDictionary.registerFormat({
  name: 'css/variables-multimode',
  format: function(dictionary) {
    let output = ':root {\n';
    
    dictionary.allTokens.forEach(token => {
      if (token.$variable_metadata && token.$variable_metadata.modes) {
        // Create a variable for each mode
        Object.entries(token.$variable_metadata.modes).forEach(([mode, value]) => {
          // Clean up the path: remove @ symbols and $ symbols, convert to kebab-case
          const cleanPath = token.path
            .map(segment => segment.replace(/[@$]/g, '').replace(/_/g, '-'))
            .filter(segment => segment.length > 0)
            .join('-');
          
          const name = `--${cleanPath}-${mode}`;
          let finalValue = value;
          
          // Handle references - resolve them or keep as references
          if (typeof value === 'string' && value.includes('{') && value.includes('}')) {
            finalValue = value; // Keep references as-is for now
          } else if (typeof value === 'number') {
            // Add px for dimension values
            if (token.path.join('').includes('width') || 
                token.path.join('').includes('height') || 
                token.path.join('').includes('margin') || 
                token.path.join('').includes('gap')) {
              finalValue = `${value}px`;
            } else {
              finalValue = value;
            }
          }
          
          output += `  ${name}: ${finalValue};\n`;
        });
      } else {
        // Regular token
        const cleanPath = token.path
          .map(segment => segment.replace(/[@$]/g, '').replace(/_/g, '-'))
          .filter(segment => segment.length > 0)
          .join('-');
          
        const name = `--${cleanPath}`;
        let value = token.value;
        if (typeof value === 'number' && 
            (token.path.join('').includes('width') || 
             token.path.join('').includes('height') || 
             token.path.join('').includes('margin') || 
             token.path.join('').includes('gap'))) {
          value = `${value}px`;
        }
        output += `  ${name}: ${value};\n`;
      }
    });
    
    output += '}\n';
    return output;
  }
});

// Custom format to output all mode variations with clean naming for SCSS
StyleDictionary.registerFormat({
  name: 'scss/variables-multimode',
  format: function(dictionary) {
    let output = '// Do not edit directly, this file was auto-generated.\n\n';
    
    dictionary.allTokens.forEach(token => {
      if (token.$variable_metadata && token.$variable_metadata.modes) {
        // Create a variable for each mode
        Object.entries(token.$variable_metadata.modes).forEach(([mode, value]) => {
          // Clean up the path: remove @ symbols and $ symbols, convert to kebab-case
          const cleanPath = token.path
            .map(segment => segment.replace(/[@$]/g, '').replace(/_/g, '-'))
            .filter(segment => segment.length > 0)
            .join('-');
          
          const name = `$${cleanPath}-${mode}`;
          let finalValue = value;
          
          // Handle references - resolve them or keep as references
          if (typeof value === 'string' && value.includes('{') && value.includes('}')) {
            finalValue = value; // Keep references as-is for now
          } else if (typeof value === 'number') {
            // Add px for dimension values
            if (token.path.join('').includes('width') || 
                token.path.join('').includes('height') || 
                token.path.join('').includes('margin') || 
                token.path.join('').includes('gap')) {
              finalValue = `${value}px`;
            } else {
              finalValue = value;
            }
          }
          
          output += `${name}: ${finalValue};\n`;
        });
      } else {
        // Regular token
        const cleanPath = token.path
          .map(segment => segment.replace(/[@$]/g, '').replace(/_/g, '-'))
          .filter(segment => segment.length > 0)
          .join('-');
          
        const name = `$${cleanPath}`;
        let value = token.value;
        if (typeof value === 'number' && 
            (token.path.join('').includes('width') || 
             token.path.join('').includes('height') || 
             token.path.join('').includes('margin') || 
             token.path.join('').includes('gap'))) {
          value = `${value}px`;
        }
        output += `${name}: ${value};\n`;
      }
    });
    
    return output;
  }
});

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
        {
          destination: 'border-radius.scss',
          format: 'scss/variables',
          filter: (token) => token.filePath.includes('border-radius.json')
        },
        {
          destination: 'spacing.scss',
          format: 'scss/variables',
          filter: (token) => token.filePath.includes('spacing.json')
        },
        {
          destination: 'opacity.scss',
          format: 'scss/variables',
          filter: (token) => token.filePath.includes('opacity.json')
        },
        {
          destination: 'icon.scss',
          format: 'scss/variables',
          filter: (token) => token.filePath.includes('icon.json')
        },
        {
          destination: 'text.scss',
          format: 'scss/variables',
          filter: (token) => token.filePath.includes('text.json')
        },
        {
          destination: 'screens.scss',
          format: 'scss/variables-multimode',
          filter: (token) => token.filePath.includes('screens.json')
        }
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
        {
          destination: 'border-radius.css',
          format: 'css/variables',
          filter: (token) => token.filePath.includes('border-radius.json')
        },
        {
          destination: 'spacing.css',
          format: 'css/variables',
          filter: (token) => token.filePath.includes('spacing.json')
        },
        {
          destination: 'opacity.css',
          format: 'css/variables',
          filter: (token) => token.filePath.includes('opacity.json')
        },
        {
          destination: 'icon.css',
          format: 'css/variables',
          filter: (token) => token.filePath.includes('icon.json')
        },
        {
          destination: 'text.css',
          format: 'css/variables',
          filter: (token) => token.filePath.includes('text.json')
        },
        {
          destination: 'screens.css',
          format: 'css/variables-multimode',
          filter: (token) => token.filePath.includes('screens.json')
        }
      ]
    }
  }
};