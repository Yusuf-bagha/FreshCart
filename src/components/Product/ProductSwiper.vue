<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { ref, computed } from 'vue'

const props = defineProps({
  product: Object
})

const currentSlide = ref(0)

const slideTo = (index) => (currentSlide.value = index)

const galleryConfig = {
  itemsToShow: 1,
  wrapAround: true,
  mouseDrag: true,
  touchDrag: true,
  height: 320,
}

const images = computed(() => {
  if (!props.product) return []

  return [
    props.product.imageCover,
    ...props.product.images
  ].map((url, index) => ({
    id: index,
    url
  }))
})
</script>

<template>
  <div class="product-images lg:w-2/5 min-w-0">
    <div class="bg-white rounded-xl shadow-sm p-4 lg:sticky lg:top-32">

      <Carousel id="gallery" v-bind="galleryConfig" v-model="currentSlide">
        <Slide v-for="image in images" :key="image.id">
          <img :src="image.url" alt="Product Image" class="gallery-image" />
        </Slide>
      </Carousel>

      <div class="thumbnails-wrapper">
        <button
          v-for="(image, index) in images"
          :key="image.id"
          type="button"
          :aria-pressed="currentSlide === index"
          :aria-label="`Go to Slide ${index + 1}`"
          :class="['thumbnail-btn', { active: currentSlide === index }]"
          @click="slideTo(index)"
        >
          <img :src="image.url" :alt="`Thumbnail ${index + 1}`" class="thumbnail-image" />
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
#gallery {
  border-radius: 12px;
  overflow: hidden;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
}

.thumbnails-wrapper {
  display: flex;
  gap: 8px;
  margin-top: 10px;
  justify-content: center;
}

.thumbnail-btn {
  flex: 1;
  max-width: 80px;
  height: 64px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: none;
  opacity: 0.6;
  transition: opacity 0.3s ease, border-color 0.3s ease;
}

.thumbnail-btn:hover {
  opacity: 1;
}

.thumbnail-btn.active {
  border-color: #4fa74f; 
  opacity: 1;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>