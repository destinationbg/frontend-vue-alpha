<script>
import { computed, defineComponent, onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { useRoute } from 'vue-router'

import pageTitle from '@/utils/pageTitle'

import { useFinderStore } from '@/stores/Finder'

import addItemsByQuery from '@/helpers/addItemsByQuery'
import MapboxMap from '@/components/MapboxMap.vue'

export default defineComponent({
  components: {
    MapboxMap,
  },
  setup() {
    const route = useRoute()
    const finder = useFinderStore()
    const mapboxAccessToken = import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN

    const productsPerPage = 5
    const resultsMap = ref(false)

    pageTitle('page.places.title')

    onBeforeMount(() => {
      finder.truncate()

      addItemsByQuery(route.query)
    })

    onBeforeUnmount(() => {
      finder.truncate()
    })

    const places = computed(() => {
      return finder.list.data
    })

    const placesLoading = computed(() => {
      return finder.loadings.list
    })

    const toggleModal = (type) => {
      finder.modals[type].shown = true
      finder.modals[type].state = 1
    }

    const clearSelections = (type) => {
      finder.truncateByType(type)
    }

    function numberOfPages() {
      return Math.ceil(places.value.length / productsPerPage)
    }

    function placesList() {
      const start = (finder.list.pagination.currentPage - 1) * productsPerPage
      const end = start + productsPerPage

      return places.value.slice(start, end)
    }

    function previousPage() {
      if (finder.list.pagination.currentPage > 1)
        finder.list.pagination.currentPage--
    }

    function nextPage() {
      if (finder.list.pagination.currentPage < numberOfPages())
        finder.list.pagination.currentPage++
    }

    function changePage(page) {
      finder.list.pagination.currentPage = page
    }

    const toggleResultsMap = () => {
      resultsMap.value = !resultsMap.value
    }

    return {
      mapboxAccessToken,
      places,
      placesLoading,
      finder,
      resultsMap,
      toggleResultsMap,
      toggleModal,
      clearSelections,
      numberOfPages,
      previousPage,
      nextPage,
      changePage,
      placesList,
    }
  },
})
</script>

<template>
  <section class="top-section">
    <div class="page-content">
      <div class="title">
        <div class="subtitle">
          {{ $t('page.places.subtitle') }}
        </div>
        <h1>{{ $t('page.places.title') }}</h1>
        <p>{{ $t('page.places.description') }}</p>
      </div>

      <div class="filters">
        <div class="filter-text">
          {{ $t('general.filters.filterBy') }}
        </div>
        <div class="holder">
          <ul>
            <li>
              <div class="filter" :class="[Number(finder.selections.category.length + finder.selections.subcategory.length) ? 'contains-selections' : null]">
                <span
                  v-if="!Number(finder.selections.category.length + finder.selections.subcategory.length)"
                  class="name"
                  @click="toggleModal('category')"
                >
                  {{ $t('general.filters.categories') }}
                </span>
                <span v-else class="name" @click="toggleModal('category')">
                  {{
                    $t(
                      'general.filters.categoriesCounter',
                      Number(finder.selections.category.length + finder.selections.subcategory.length),
                    )
                  }}
                </span>
                <div
                  v-if="Number(finder.selections.category.length + finder.selections.subcategory.length)"
                  class="clear"
                  @click="clearSelections('category')"
                >
                  <span>
                    <i class="icon-close" />
                  </span>
                </div>
              </div>
            </li>
            <li>
              <div class="filter" :class="[Number(finder.selections.region.length + finder.selections.municipality.length) ? 'contains-selections' : null]">
                <span
                  v-if="!Number(finder.selections.region.length + finder.selections.municipality.length)"
                  class="name"
                  @click="toggleModal('region')"
                >
                  {{ $t('general.filters.regionsAndMunicipalities') }}
                </span>
                <span v-else class="name" @click="toggleModal('region')">
                  {{
                    $t(
                      'general.filters.regionsAndMunicipalitiesCounter',
                      Number(finder.selections.region.length + finder.selections.municipality.length),
                    )
                  }}
                </span>
                <div
                  v-if="Number(finder.selections.region.length + finder.selections.municipality.length)"
                  class="clear"
                  @click="clearSelections('region')"
                >
                  <span>
                    <i class="icon-close" />
                  </span>
                </div>
              </div>
            </li>
            <li>
              <div class="filter" :class="[finder.selections.rating.length ? 'contains-selections' : null]">
                <span v-if="!finder.selections.rating.length" class="name" @click="toggleModal('rating')">
                  {{ $t('general.filters.rating') }}
                </span>
                <span v-else class="name" @click="toggleModal('rating')">
                  {{ $t('general.filters.ratingCounter', finder.selections.rating.length) }}
                </span>
                <div v-if="finder.selections.rating.length" class="clear" @click="clearSelections('rating')">
                  <span>
                    <i class="icon-close" />
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <div class="controls">
            <button class="control" :disabled="!resultsMap" :title="$t('general.filters.listView')" @click="toggleResultsMap">
              <i class="icon-grid" />
            </button>
            <button class="control" :disabled="resultsMap" :title="$t('general.filters.mapView')" @click="toggleResultsMap">
              <i class="icon-map" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="places-list">
    <div v-if="!placesLoading">
      <div v-if="places.length">
        <div v-if="resultsMap">
          <MapboxMap :access-token="mapboxAccessToken" :locations="places" />
        </div>
        <div v-else class="page-content">
          <div class="results" :class="[finder.loadings.selections ? 'disabled' : null]">
            <ul class="list">
              <li v-for="place in placesList()" :key="place">
                <router-link :to="{ name: 'Place', params: { slug: place.slug } }">
                  <picture>
                    <img :src="place.image" alt="" loading="lazy">
                    <div class="badges">
                      <div class="stars">
                        <i class="icon-star-solid" />
                        <span>{{ place.user_score.toFixed(1) }}</span>
                      </div>
                      <div class="visitors">
                        <i class="icon-users" />
                        <span>{{ place.visitors }}</span>
                      </div>
                    </div>
                  </picture>
                  <h3>{{ place.locale[$i18n.locale].title }}</h3>
                  <p>{{ place.locale[$i18n.locale].location }}</p>
                </router-link>
              </li>
            </ul>

            <ul class="pagination">
              <li>
                <button :disabled="finder.list.pagination.currentPage === 1" @click="previousPage">
                  <i class="icon-arrow-left-tail" />
                  <span>{{ $t('general.pagination.previous') }}</span>
                </button>
              </li>
              <li class="pages">
                <p
                  v-html="
                    $t('general.pagination.pages', {
                      current: finder.list.pagination.currentPage,
                      total: numberOfPages(),
                      places: places.length,
                    })
                  "
                />
              </li>
              <li>
                <button :disabled="finder.list.pagination.currentPage === numberOfPages()" @click="nextPage">
                  <span>{{ $t('general.pagination.next') }}</span>
                  <i class="icon-arrow-right-tail" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-else class="page-content">
        <div class="results">
          <div class="page-container">
            <div class="container-content padding">
              {{ $t('general.noResults') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="page-content">
      <div class="results">
        <div class="page-container">
          <div class="container-content padding">
            {{ $t('general.loading') }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
