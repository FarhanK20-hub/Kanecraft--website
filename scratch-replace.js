const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else if (dirFile.endsWith('.tsx')) {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

const files = walkSync('./src/components');

const replacements = [
  { search: /bg-\[var\(--color-brand-cream\)\](?![^"']*dark:)/g, replace: 'bg-[var(--color-brand-cream)] dark:bg-[#121212]' },
  { search: /bg-white(?![^"']*dark:)/g, replace: 'bg-white dark:bg-[#1A1A1A]' },
  { search: /text-\[var\(--color-brand-black\)\](?![^"']*dark:)/g, replace: 'text-[var(--color-brand-black)] dark:text-white' },
  { search: /text-gray-600(?![^"']*dark:)/g, replace: 'text-gray-600 dark:text-gray-300' },
  { search: /text-gray-700(?![^"']*dark:)/g, replace: 'text-gray-700 dark:text-gray-300' },
  { search: /bg-gray-100(?![^"']*dark:)/g, replace: 'bg-gray-100 dark:bg-gray-800' },
  { search: /bg-gray-50(?![^"']*dark:)/g, replace: 'bg-gray-50 dark:bg-gray-800/50' },
  { search: /border-gray-200(?![^"']*dark:)/g, replace: 'border-gray-200 dark:border-gray-800' },
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  replacements.forEach(({ search, replace }) => {
    content = content.replace(search, replace);
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
});
