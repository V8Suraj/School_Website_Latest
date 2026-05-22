const fs = require('fs');
const path = require('path');

// Helper function to recursively find all files
function findFiles(dir, ext, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      // Skip node_modules
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist' && file !== 'build') {
        findFiles(filePath, ext, fileList);
      }
    } else if (file.endsWith(ext)) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// Convert TypeScript code to JavaScript
function convertTsToJs(content) {
  let result = content;

  // Remove import type statements
  result = result.replace(/import\s+type\s+{[^}]+}\s+from\s+['"][^'"]+['"]/g, '');
  result = result.replace(/import\s+type\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s+from\s+['"][^'"]+['"]/g, '');

  // Convert interface to empty comment (remove interface definitions)
  result = result.replace(/export\s+interface\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*{[^{}]*(?:{[^{}]*}[^{}]*)*}/g, '');
  result = result.replace(/interface\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*{[^{}]*(?:{[^{}]*}[^{}]*)*}/g, '');

  // Convert type definitions to empty comment
  result = result.replace(/export\s+type\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*=\s*[^;]+;/g, '');
  result = result.replace(/type\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*=\s*[^;]+;/g, '');

  // Remove generic type annotations from components (e.g., React.FC<Props>, forwardRef<Type, Props>)
  result = result.replace(/React\.FC<[^>]+>/g, '');
  result = result.replace(/React\.forwardRef<[^>]+>\s*\(/g, 'React.forwardRef(');
  result = result.replace(/forwardRef<[^>]+>\s*\(/g, 'forwardRef(');

  // Remove type annotations from function parameters: (param: Type) => (param) =>
  result = result.replace(/:\s*[a-zA-Z_$][a-zA-Z0-9_$|&\[\]<>.]*(?=\s*[,\)=])/g, '');

  // Remove return type annotations from functions: function foo(): Type => function foo()
  result = result.replace(/\):\s*[a-zA-Z_$][a-zA-Z0-9_$|&\[\]<>.]*\s*{/g, ') {');
  result = result.replace(/\):\s*[a-zA-Z_$][a-zA-Z0-9_$|&\[\]<>.]*\s*=>/g, ') =>');

  // Remove type annotations from variable declarations: const x: Type = => const x =
  result = result.replace(/:\s*(?:typeof\s+)?[a-zA-Z_$][a-zA-Z0-9_$|&\[\]<>.]*(?=\s*[=;])/g, '');

  // Remove React.ReactNode, React.ReactElement etc.
  result = result.replace(/React\.\w+<[^>]+>/g, 'any');
  result = result.replace(/React\.\w+/g, (match) => match);

  // Remove extends keywords in generics/interfaces
  result = result.replace(/extends\s+[a-zA-Z_$][a-zA-Z0-9_$|&\[\]<>.]*\s*{/g, '{');

  // Remove async/await type handling - keep the keywords but remove types
  // Already handled by param annotation removal

  // Remove generic brackets from JSX and components
  result = result.replace(/<\s*([A-Z][a-zA-Z0-9_$]*)\s*<[^>]+>\s*>/g, '<$1>');

  // Remove extra whitespace and blank lines
  result = result.replace(/^\s*\n/gm, '');
  result = result.replace(/\n\s*\n\s*\n/g, '\n\n');

  // Remove enum declarations
  result = result.replace(/enum\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*{[^}]+}/g, '');

  // Clean up multiple blank lines at end of file
  result = result.replace(/\n+$/, '\n');

  return result;
}

// Update imports from .tsx/.ts to .jsx/.js
function updateImports(content) {
  let result = content;
  result = result.replace(/from\s+['"]([^'"]+)\.tsx['"]/g, "from '$1.jsx'");
  result = result.replace(/from\s+['"]([^'"]+)\.ts['"]/g, "from '$1.js'");
  result = result.replace(/import\s+['"]([^'"]+)\.tsx['"]/g, "import '$1.jsx'");
  result = result.replace(/import\s+['"]([^'"]+)\.ts['"]/g, "import '$1.js'");
  return result;
}

// Main conversion process
async function convertProject() {
  console.log('Starting TypeScript to JavaScript conversion...\n');

  // Find all TypeScript files
  const tsxFiles = findFiles(path.join(__dirname, 'src'), '.tsx');
  const tsFiles = findFiles(path.join(__dirname, 'src'), '.ts');
  const allFiles = [...tsxFiles, ...tsFiles];

  console.log(`Found ${allFiles.length} TypeScript files to convert\n`);

  let convertedCount = 0;
  let skippedCount = 0;

  // Convert each file
  allFiles.forEach((filePath) => {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Skip declaration files (.d.ts)
      if (filePath.endsWith('.d.ts')) {
        console.log(`⊘ Skipped: ${path.relative(__dirname, filePath)} (declaration file)`);
        skippedCount++;
        return;
      }

      // Convert content
      let converted = convertTsToJs(content);
      converted = updateImports(converted);

      // Determine new file path
      let newPath = filePath.replace(/\.tsx$/, '.jsx').replace(/\.ts$/, '.js');

      // Write new file
      fs.writeFileSync(newPath, converted, 'utf-8');
      console.log(`✓ Converted: ${path.relative(__dirname, filePath)} -> ${path.basename(newPath)}`);
      convertedCount++;

      // Delete old file
      fs.unlinkSync(filePath);
    } catch (error) {
      console.error(`✗ Error converting ${path.relative(__dirname, filePath)}: ${error.message}`);
    }
  });

  console.log(`\n✓ Conversion complete!`);
  console.log(`  - Converted: ${convertedCount} files`);
  console.log(`  - Skipped: ${skippedCount} files`);
  console.log(`\nNext steps:`);
  console.log(`1. Remove TypeScript config files: tsconfig.json, tsconfig.app.json, tsconfig.node.json`);
  console.log(`2. Update vite.config.ts to vite.config.js if needed`);
  console.log(`3. Remove @types packages from package.json`);
  console.log(`4. Run 'npm install' or 'bun install' to clean up dependencies`);
}

convertProject().catch(console.error);
