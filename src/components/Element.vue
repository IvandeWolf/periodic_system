<template>
  <!-- If there is an element for this grid show it. On click we will make it active. -->
  <div v-if="element" @click="active = !active" class="relative">
    <!-- Gray background screen. -->
    <div v-show="active" class="fixed top-0 left-0 w-screen h-screen bg-gray-700 opacity-50 z-20" />

    <!-- The cell -->
    <div class="relative border flex flex-col w-full h-full items-center justify-end cursor-pointer hover:scale-150 bg-gray-800 duration-200 hover:z-30" :class="[active ? 'scale-300 z-30 hover:scale-300' : 'hover:scale-125', selected ? (selected === element.category ? '' : 'opacity-30') : '']" :style="`color: ${color}; border-color: ${color}`">
      <div class="absolute top-0 left-0 flex p-0.5">
        <span class="text-xs leading-3">{{ element.number }}</span>
      </div>
      <span class="text-3xl z-10">{{ element.symbol }}</span>
      <span class="text-xs z-10">{{ element.name }}</span>
      <span class="text-xs z-10">{{ element.mass }}</span>

      <!-- Only show the electron ring numbers when cell is active (clicked). -->
      <div v-show="active" class="absolute top-0 right-0 flex flex-col items-end p-0.5">
        <span v-for="(n, i) of element.electronrings" :key="i" class="text-2xs leading-2">{{ n }}</span>
      </div>

      <!-- Show a representation of the electron rings when cell is active (clicked). -->
      <div v-show="active" class="absolute top-0 left-0 flex p-0.5 w-full h-full z-0">
        <!-- For each ring create an svg. -->
        <template v-for="(e, ind) of element.electronrings.slice().reverse()" :key="ind">
          <svg v-if="element.electronrings.length >= ind + 1" class="w-full h-full absolute animate-spin" :style="`animation: spin ${20 - (ind * 2)}s linear infinite;`" viewBox="0 0 1000 1000">
            <!-- The ring. -->
            <circle cx="500" cy="500" :r="420 - (50 * ind)" stroke="#474747" stroke-width="5" fill="transparent" />
            <!-- Small dots which are a representation of an electron placed evenly alongside the ring. -->
            <circle
              v-for="i in e"
              :key="i" r="15" stroke="transparent" fill="#474747"
              :cx="500 + (420 - (50 * ind)) * Math.cos(((2 * Math.PI) / e) * i)"
              :cy="500 + (420 - (50 * ind)) * Math.sin(((2 * Math.PI) / e) * i)"
            />
          </svg>
        </template>
      </div>
    </div>
  </div>

  <!-- If there is no element for this grid, leave it empty. -->
  <div v-else></div>
</template>

<script>
export default {
  name: 'Element',
  props: {
    element: {
      type: Object,
      required: true
    },
    categories: {
      type: Object,
      required: true
    },
    selected: {
      type: String,
      required: false
    }
  },
  data: () => ({
    active: false
  }),
  computed: {
    color () {
      return this.categories[this.element.category]
    }
  }
}
</script>
