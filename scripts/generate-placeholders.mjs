import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', 'src', 'img');

const MINIMAL_JPG = Buffer.from(
  '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=',
  'base64'
);

const MINIMAL_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

const files = [
  ['hero/hero-mob-1x.jpg', MINIMAL_JPG],
  ['hero/hero-mob-2x.jpg', MINIMAL_JPG],
  ['hero/hero-tab-1x.jpg', MINIMAL_JPG],
  ['hero/hero-tab-2x.jpg', MINIMAL_JPG],
  ['hero/hero-desk-1x.jpg', MINIMAL_JPG],
  ['hero/hero-desk-2x.jpg', MINIMAL_JPG],
  ...['beginner', 'beginner2x', 'beginner-tab', 'beginner-tab2x', 'beginner-desk', 'beginner-desk2x'].map(
    n => [`classes/${n}.png`, MINIMAL_PNG]
  ),
  ...['vinyasa', 'vinyasa2x', 'vinyasa-tab', 'vinyasa-tab2x', 'vinyasa-desk', 'vinyasa-desk2x'].map(
    n => [`classes/${n}.png`, MINIMAL_PNG]
  ),
  ...['restorative', 'restorative2x', 'restorative-tab', 'restorative-tab2x', 'restorative-desk', 'restorative-desk2x'].map(
    n => [`classes/${n}.png`, MINIMAL_PNG]
  ),
  ...Array.from({ length: 6 }, (_, i) => {
    const n = i + 1;
    return [
      [`team/t-${n}-mob-1x.png`, MINIMAL_PNG],
      [`team/t-${n}-mob-2x.png`, MINIMAL_PNG],
      [`team/t-${n}-tab-1x.png`, MINIMAL_PNG],
      [`team/t-${n}-tab-2x.png`, MINIMAL_PNG],
      [`team/t-${n}-desk-1x.png`, MINIMAL_PNG],
      [`team/t-${n}-desk-2x.png`, MINIMAL_PNG],
    ];
  }).flat(),
  ...Array.from({ length: 6 }, (_, i) => {
    const n = i + 1;
    return [
      [`gallery-photo${n}.jpg`, MINIMAL_JPG],
      [`gallery-photo${n}@2x.jpg`, MINIMAL_JPG],
    ];
  }).flat(),
  ...Array.from({ length: 4 }, (_, i) => {
    const n = i + 1;
    return [
      [`Testimonial/Testimonial-${n}.png`, MINIMAL_PNG],
      [`Testimonial/Testimonial-${n}@2x.png`, MINIMAL_PNG],
      [`Testimonial/Testimonial-${n}@3x.png`, MINIMAL_PNG],
    ];
  }).flat(),
];

for (const [relativePath, buffer] of files) {
  const fullPath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, buffer);
    console.log(`created ${relativePath}`);
  }
}

const faviconPath = path.join(__dirname, '..', 'src', 'favicon.ico');
if (!fs.existsSync(faviconPath)) {
  fs.writeFileSync(faviconPath, MINIMAL_PNG);
  console.log('created favicon.ico');
}

console.log('Done.');
