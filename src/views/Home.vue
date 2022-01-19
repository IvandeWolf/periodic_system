<template>
  <div class="w-screen h-screen bg-gray-800 p-28 relative overflow-hidden">
    <div class="absolute top-32 left-0 w-full flex justify-center">
      <div class="relative flex space-x-8 mx-auto">
        <span @click="selected = selected && selected === c ? null : c" v-for="c of Object.keys(categories)" :key="c" class="cursor-pointer opacity-80 hover:opacity-100" :style="`color: ${categories[c]}`">{{ c }}</span>
      </div>
    </div>
    <div class="w-full h-full grid grid-cols-9 grid-rows-5 gap-0.5">
      <div v-for="i in (height / 2) * (width / 2)" :key="i" class="grid grid-cols-2 grid-rows-2 gap-0.5">
        <Element :selected="selected" :categories="categories" :element="getElement(((i - 1) * 2) % width, Math.floor(((i - 1) * 2) / width) * 2)?.element" />
        <Element :selected="selected" :categories="categories" :element="getElement(((i - 1) * 2) % width + 1, Math.floor(((i - 1) * 2) / width) * 2)?.element" />
        <Element :selected="selected" :categories="categories" :element="getElement(((i - 1) * 2) % width, Math.floor(((i - 1) * 2) / width) * 2 + 1)?.element" />
        <Element :selected="selected" :categories="categories" :element="getElement(((i - 1) * 2) % width + 1, Math.floor(((i - 1) * 2) / width) * 2 + 1)?.element" />
      </div>
    </div>
  </div>
</template>

<script>
import Element from '@/components/Element'

const periodic_table = require('@/assets/periodic_table.json')
const categories = {
  'Alkali Metals': '#e7b960',
  'Alkaline Earth Metals': '#cedc66',
  'Lanthanide': '#d9779d',
  'Aktinoids': '#b57eb1',
  'Transition Metals': '#dd7771',
  'Post-transition Metals': '#7fbecd',
  'Metalloids': '#73e8bd',
  'Other Nonmetals': '#79e775',
  'Noble Gasses': '#7fa3ed',
  'Unknown': '#c8c8c5'
}

export default {
  name: 'Home',
  components: {
    Element
  },
  data: () => ({
    width: 18,
    height: 10,
    selected: null
  }),
  setup () {
    return {
      categories,
      periodic_table
    }
  },
  methods: {
    getElement (x, y) {
      return this.periodic_table.find(element => element.x === x && element.y === y)
    }
  }
}
</script>
