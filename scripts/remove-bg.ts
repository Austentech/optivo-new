import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function main() {
  const zai = await ZAI.create();
  
  const imageBuffer = fs.readFileSync('/home/z/my-project/upload/IMG_7019.PNG');
  const base64 = imageBuffer.toString('base64');
  const dataUrl = `data:image/png;base64,${base64}`;
  
  console.log('Processing logo with AI background removal...');
  
  const response = await zai.images.generations.edit({
    prompt: "Remove the background completely and make it fully transparent. Keep only the logo design elements - the 'OPTIVO' text and any graphic/icon elements. Do not alter the logo colors, shapes, or text. The output should be the logo on a clean transparent background with no artifacts.",
    images: [{ url: dataUrl }],
    size: '1440x720'
  });
  
  const imageBase64 = response.data[0].base64;
  const buffer = Buffer.from(imageBase64, 'base64');
  fs.writeFileSync('/home/z/my-project/public/optivo-logo-transparent.png', buffer);
  
  console.log('Logo with transparent background saved!');
  console.log('File size:', buffer.length, 'bytes');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});