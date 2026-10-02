import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
import publicClient from '@/api/publicClient'

const norm = (value) =>
  String(value ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')

export const useSearchStore = defineStore('search', () => {
  const allProducts = shallowRef([])
  const isLoaded = shallowRef(false)
  let inflight = null


  async function fetchEverything() {
    const first = await publicClient.get('/v1/products', { params: { limit: 100, page: 1 } })
    let items = first.data.data
    const meta = first.data.metadata ?? {}

    if (meta.numberOfPages > 1) {
      const rest = await Promise.all(
        Array.from({ length: meta.numberOfPages - 1 }, (_, i) =>
          publicClient.get('/v1/products', { params: { limit: meta.limit ?? 100, page: i + 2 } })
        )
      )
      items = items.concat(...rest.map((res) => res.data.data))
    }
    return items
  }

  async function loadAll() {
    if (isLoaded.value) return
    if (!inflight) {
      inflight = fetchEverything()
        .then((items) => {
          allProducts.value = items
          isLoaded.value = true
        })
        .finally(() => {
          inflight = null 
        })
    }
    return inflight
  }

 
  function search(query) {
    const tokens = norm(query).split(/\s+/).filter(Boolean)
    if (!tokens.length) return []

    const matches = []
    for (const product of allProducts.value) {
      const title = norm(product.title)
      const haystack = [
        title,
        norm(product.category?.name),
        norm(product.brand?.name),
        ...(product.subcategory ?? []).map((s) => norm(s.name)),
      ].join(' ')

      if (!tokens.every((t) => haystack.includes(t))) continue

      const score =
        title === norm(query).trim() ? -1                       
        : title.startsWith(tokens[0]) ? 0
        : tokens.every((t) => title.includes(t)) ? 1
        : 2
      matches.push({ product, score })
    }

    return matches.sort((a, b) => a.score - b.score).map((m) => m.product)
  }

  return { allProducts, isLoaded, loadAll, search }
})