import sharp from 'sharp';
import fs from 'fs';

async function main() {
  const input = '/home/z/my-project/upload/IMG_7019.PNG';
  
  // Create header logo - small, clean, maintain aspect ratio
  // Original is 1672x941, so ratio is ~1.78:1
  // For header: height ~40px → width ~71px. Let's do 160x90
  await sharp(input)
    .resize(160, 90, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('/home/z/my-project/public/optivo-logo-header.png');
  console.log('Header logo: 160x90, transparent PNG');

  // Create favicon 32x32
  await sharp(input)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('/home/z/my-project/public/favicon-32.png');
  console.log('Favicon 32x32');

  // Create apple touch icon 180x180
  await sharp(input)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('/home/z/my-project/public/apple-touch-icon.png');
  console.log('Apple touch icon 180x180');

  // Create favicon.ico (use 32x32 PNG as ICO - browsers accept this)
  const faviconBuf = await sharp(input)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync('/home/z/my-project/public/favicon.ico', faviconBuf);
  console.log('Favicon.ico');

  // Verify
  const meta = await sharp('/home/z/my-project/public/optivo-logo-header.png').metadata();
  console.log('Header logo verified:', meta.format, 'hasAlpha:', meta.hasAlpha, meta.width + 'x' + meta.height);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});