// Convert from PHP getImagePath and generatePlaceholder functions
export function getImagePath(filename?: string, type: 'berita' | 'artikel' | 'galeri' = 'berita', title: string = ''): string {
  if (!filename) {
    return generatePlaceholder(type, title);
  }
  
  // For Next.js, we'll use /uploads directory in public folder
  const path = `/uploads/${type}/${filename}`;
  
  // In browser environment, we can't check file existence directly
  // We'll handle missing images in the Image component with onError
  return path;
}

export function generatePlaceholder(type: 'berita' | 'artikel' | 'galeri' = 'berita', title: string = ''): string {
  const colors = {
    berita: { bg: '#1a5f3f', text: '#ffffff' },
    artikel: { bg: '#d4af37', text: '#ffffff' },
    galeri: { bg: '#2d8659', text: '#ffffff' }
  };
  
  const color = colors[type];
  const initial = title.trim() ? title.trim().charAt(0).toUpperCase() : 
    (type === 'artikel' ? '📄' : type === 'galeri' ? '📸' : '📰');
  
  const svg = `
    <svg width="400" height="250" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color.bg};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color.bg}80;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill="url(#grad1)"/>
      <text x="200" y="125" text-anchor="middle" dominant-baseline="middle" 
            fill="${color.text}" font-family="Arial" font-size="60" font-weight="bold">
            ${initial}
      </text>
      <text x="200" y="170" text-anchor="middle" fill="${color.text}" 
            font-family="Arial" font-size="14" opacity="0.8">
            ${type.toUpperCase()}
      </text>
    </svg>`;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export function createImagePlaceholder(width: number = 400, height: number = 250, text: string = '', bgColor: string = '#1a5f3f'): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${bgColor}"/>
      <text x="${width/2}" y="${height/2}" text-anchor="middle" dominant-baseline="middle" 
            fill="white" font-family="Arial" font-size="24" font-weight="bold">
            ${text || '?'}
      </text>
    </svg>`;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}