<template>
  <img class="logo" src="./assets/logo.svg">
  <TipsCalc/>
</template>

<script lang="ts">
import './App.css';
import { defineComponent } from 'vue';
import TipsCalc from "@/components/TipsCalc.vue";

export default defineComponent({
  name: 'App',
  components: {
    TipsCalc

  }
});
</script>

<style>
.logo{
  @apply w-[82px] mb-16;
}
</style>
