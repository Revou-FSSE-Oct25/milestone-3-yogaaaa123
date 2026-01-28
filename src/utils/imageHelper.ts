export function getCleanImageUrl(images: string[]): string {
  if (!images || images.length === 0) {
    return 'https://i.imgur.com/6q7d4lt.jpeg'; // Fallback image
  }

  let imageUrl = images[0];

  if (imageUrl.startsWith('["')) {
    try {
        imageUrl = imageUrl.replace(/^\["/, '').replace(/"\]$/, '');
    } catch {

    }
  }
  
  if (imageUrl.startsWith('"') && imageUrl.endsWith('"')) {
      imageUrl = imageUrl.substring(1, imageUrl.length - 1);
  }

  return imageUrl;
}
