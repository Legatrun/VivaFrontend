<template>
  <div >
    <v-carousel class="green dark" style="width:100%">
      <v-carousel-item v-for="(item,i) in lstitems" :src="item.src" :key="i"></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script src="./Inicio.ts"></script>