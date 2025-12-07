import { formatFiles, joinPathFragments } from '@nx/devkit';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function (tree, schema) {
  const { year, day } = schema;

  // Pad the day with leading zero if needed (e.g., 1 -> 01, 12 -> 12)
  const dayPadded = String(day);

  // Target directory: <year>/day<day>/
  const targetDir = joinPathFragments(`${year}`, `day${day}`);

  // Read template files
  const filesDir = path.join(__dirname, 'files');
  const jsTemplate = fs.readFileSync(path.join(filesDir, 'day-template.js'), 'utf-8');

  // Create files with proper naming
  tree.write(
    joinPathFragments(targetDir, `day-${dayPadded}-1.js`),
    jsTemplate
  );

  tree.write(
    joinPathFragments(targetDir, `day-${dayPadded}-2.js`),
    jsTemplate
  );

  tree.write(
    joinPathFragments(targetDir, 'input.txt'),
    ''
  );

  tree.write(
    joinPathFragments(targetDir, 'example.txt'),
    ''
  );

  await formatFiles(tree);

  console.log(`✅ Created Advent of Code files for ${year}/day${day}`);
  console.log(`   - ${targetDir}/day-${dayPadded}-1.js`);
  console.log(`   - ${targetDir}/day-${dayPadded}-2.js`);
  console.log(`   - ${targetDir}/input.txt`);
  console.log(`   - ${targetDir}/example.txt`);
}

