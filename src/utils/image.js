
const PROXY = 'https://images.weserv.nl/'

/**
 * @param {string} url    
 * @param {number} width  
 */
export function optimizeImage(url, width = 400) {
  if (!url || !/^https?:\/\//.test(url)) return url        
  const withoutProtocol = url.replace(/^https?:\/\//, '')
  return `${PROXY}?url=${encodeURIComponent(withoutProtocol)}&w=${width}&output=webp&q=75`
}


export function fallbackToOriginal(event, originalUrl) {
  const img = event.target
  if (img.dataset.fallback) return
  img.dataset.fallback = '1'
  img.src = originalUrl
}