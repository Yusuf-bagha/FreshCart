import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { NetworkFirst, NetworkOnly, StaleWhileRevalidate, CacheFirst } from 'workbox-strategies'
import { BackgroundSyncPlugin } from 'workbox-background-sync'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

precacheAndRoute(self.__WB_MANIFEST)

const handler = createHandlerBoundToURL('/index.html')
const navigationRoute = new NavigationRoute(handler, {
  denylist: [/^\/api\//]
})
registerRoute(navigationRoute)

const BASE = 'https://ecommerce.routemisr.com/api'

function notifyClients(queueName, success) {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => client.postMessage({ type: 'SYNC_COMPLETE', queue: queueName, success }))
  })
}

function syncPlugin(name) {
  return new BackgroundSyncPlugin(name, {
    maxRetentionTime: 24 * 60,
    onSync: async ({ queue }) => {
  let entry
  let allSucceeded = true
  while ((entry = await queue.shiftRequest())) {
    try {
      const response = await fetch(entry.request.clone())
      if (!response.ok) {
        allSucceeded = false
        break
      }
    } catch (err) {
      allSucceeded = false
      await queue.unshiftRequest(entry)
      break
    }
  }
  notifyClients(name, allSucceeded)
}
  })
}

registerRoute(new RegExp(`^${BASE}/v1/categories`), new StaleWhileRevalidate({ cacheName: 'categories-cache' }), 'GET')
registerRoute(new RegExp(`^${BASE}/v1/brands`), new StaleWhileRevalidate({ cacheName: 'brands-cache' }), 'GET')

registerRoute(
  new RegExp(`^${BASE}/v1/products`),
  new NetworkFirst({
    cacheName: 'products-cache',
    networkTimeoutSeconds: 5,
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] }), new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 86400 })]
  }),
  'GET'
)

registerRoute(new RegExp(`^${BASE}/v2/cart$`), new NetworkFirst({ cacheName: 'cart-get-cache' }), 'GET')
registerRoute(new RegExp(`^${BASE}/v2/cart$`), new NetworkOnly({ plugins: [syncPlugin('cart-add-queue')] }), 'POST')
registerRoute(new RegExp(`^${BASE}/v2/cart/[^/]+$`), new NetworkOnly({ plugins: [syncPlugin('cart-update-queue')] }), 'PUT')
registerRoute(new RegExp(`^${BASE}/v2/cart/[^/]+$`), new NetworkOnly({ plugins: [syncPlugin('cart-delete-queue')] }), 'DELETE')
registerRoute(new RegExp(`^${BASE}/v2/cart$`), new NetworkOnly({ plugins: [syncPlugin('cart-clear-queue')] }), 'DELETE')

registerRoute(new RegExp(`^${BASE}/v1/wishlist$`), new NetworkFirst({ cacheName: 'wishlist-get-cache' }), 'GET')
registerRoute(new RegExp(`^${BASE}/v1/wishlist$`), new NetworkOnly({ plugins: [syncPlugin('wishlist-add-queue')] }), 'POST')
registerRoute(new RegExp(`^${BASE}/v1/wishlist/[^/]+$`), new NetworkOnly({ plugins: [syncPlugin('wishlist-delete-queue')] }), 'DELETE')

registerRoute(new RegExp(`^${BASE}/v1/auth/`), new NetworkOnly())
registerRoute(new RegExp(`^${BASE}/v1/users/`), new NetworkOnly())

registerRoute(new RegExp(`^${BASE}/v2/orders/`), new NetworkOnly(), 'POST')
registerRoute(new RegExp(`^${BASE}/v1/orders/checkout-session/`), new NetworkOnly(), 'POST')
registerRoute(new RegExp(`^${BASE}/v1/orders/user/`), new NetworkFirst({ cacheName: 'orders-cache' }), 'GET')

registerRoute(
  /\.(?:png|jpg|jpeg|webp|svg)$/,
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      {
        cacheWillUpdate: async ({ response }) =>
          response.headers.get('content-type')?.startsWith('image/') ? response : null,
      },
      new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 2592000 })
    ]
  })
)