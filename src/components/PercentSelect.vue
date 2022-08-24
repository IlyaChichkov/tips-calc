<template>
  <div class="text-white grid grid-cols-3 gap-2">
    <button v-for="(btn, index) in tipButtons" v-bind:key="index" :class="btn.class" v-on:click.prevent="setPercent(btn.percent, btn.class)" >{{btn.percent}}%</button>
    <input  :class="['text-center', 'text-lg', selectedCustomTip? 'selected': '']" v-model="customTip" type="text" v-on:click="selectCustomTip" v-on:change.prevent="setCustomTip($event.target.value)" min="0" max="100" placeholder="Custom"/>
  </div>
</template>

<script>
export default {
  name: "PercentSelect",
  data(){
    return{
      customTip: null,
      selectedCustomTip: false,
      tipButtons: [
        { class: ['percent-btn'], percent: 5 },
        { class: ['percent-btn'], percent: 10 },
        { class: ['percent-btn'], percent: 15 },
        { class: ['percent-btn'], percent: 25 },
        { class: ['percent-btn'], percent: 50 },
      ]
    }
  },
  methods: {
    selectCustomTip(){
      this.resetBtns();
      this.$store.commit('setPercent', this.customTip);
      this.selectedCustomTip = true;
      localStorage.setItem('tip', this.customTip);
    },
    setCustomTip(tip){
      if(tip > 100) tip = 100;
      this.resetBtns();
      this.customTip = tip;
      this.selectedCustomTip = true;
      this.$store.commit('setPercent', tip);
      localStorage.setItem('tip', tip);
    },
    setPercent(percent, key){
      this.resetBtns();
      key.push('selected');
      this.selectedCustomTip = false;
      this.$store.commit('setPercent', percent);
      localStorage.setItem('tip', percent);
    },
    resetBtns() {
      this.tipButtons.forEach(btn => {
        btn.class.splice(1, 1);
      });
    }
  },
  mounted() {
    this.tipButtons.forEach((btn) => {
      if(btn.percent == this.$store.state.percent){
        btn.class.push('selected');
      }
    })
  }
}
</script>

<style scoped>
button.percent-btn{
  @apply p-1 px-1 py-2 bg-cyan-700 active:bg-cyan-500;
}
button.percent-btn.selected{
  @apply bg-cyan-500 text-cyan-700;
}
input.selected{
  @apply border-solid border-2 border-cyan-500;
}
</style>