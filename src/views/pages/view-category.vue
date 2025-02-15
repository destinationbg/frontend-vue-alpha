<script>
import { computed, defineComponent, onBeforeMount, ref } from 'vue'
import { useTitle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import places from '@/api/places'
import categories from '@/api/categories'

import countPlacesWithSubcategory from '@/helpers/countPlacesWithSubcategory'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { locale } = useI18n({ useScope: 'global' })
    const appName = computed(() => {
      if (locale.value === 'bg')
        return import.meta.env.VITE_APP_NAME_BG

      return import.meta.env.VITE_APP_NAME_EN
    })
    const category = categories.find(item => item.slug === route.params.slug)
    const loading = ref(true)

    onBeforeMount(() => {
      if (!categories.find(item => item.slug === route.params.slug))
        router.push({ name: 'Categories' })
      else
        loading.value = false
    })

    const pageTitle = computed(() => {
      return `${category.locale[locale.value].title} - ${appName.value}`
    })
    useTitle(pageTitle)

    return {
      loading,
      locale,
      route,
      category,
      categories,
      places,
      countPlacesWithSubcategory,
    }
  },
})
</script>

<template>
  <div v-if="!loading">
    <section class="top-section">
      <div class="page-content">
        <div class="title">
          <div class="subtitle">
            {{ $t('page.category.subtitle') }}
          </div>
          <h1>{{ category.locale[$i18n.locale].title }}</h1>
          <p>{{ category.locale[$i18n.locale].description }}</p>
        </div>
      </div>
    </section>

    <section class="categories-list">
      <div class="page-content">
        <div class="page-container">
          <h2>{{ $t('general.navigation.subcategories', { count: category.subcategories.length }) }}</h2>
          <ul>
            <li v-for="subcategory in category.subcategories" :key="subcategory">
              <router-link :to="{ name: 'Places', query: { category: route.params.slug, subcategory: subcategory.slug } }">
                {{ subcategory.locale[$i18n.locale] }}
                <span v-if="countPlacesWithSubcategory(places, subcategory.slug)">
                  {{ countPlacesWithSubcategory(places, subcategory.slug) }}
                </span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
  <div v-else>
    <section class="top-section">
      <div class="page-content">
        <div class="title">
          <h1>{{ $t('page.category.title') }}</h1>
        </div>
      </div>
    </section>

    <section class="categories-list">
      <div class="page-content">
        <div class="page-container">
          <div class="container-content padding">
            {{ $t('general.loading') }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
