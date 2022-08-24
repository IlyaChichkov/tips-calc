<template>
  <div class="card">
    <div class="col">
      <section class="mb-5">
        <p class="mb-2">Bill</p>
        <div class="relative">
          <img class="absolute left-3 top-[12px] my-auto" src="../assets/icon-dollar.svg"/>
          <input v-model="bill" class="calc-input" placeholder="0">
        </div>
      </section>
      <section class="mb-5">
        <p class="mb-2">Select Tip %</p>
        <PercentSelect/>
      </section>
      <section class="">
        <p class="mb-2">Number of people</p>

        <div class="relative">
          <img class="absolute left-3 top-[12px] my-auto" src="../assets/icon-person.svg"/>
          <input v-model="peopleCount" :class="['calc-input', requirePeopleInput? 'input-req': '']" placeholder="0">
        </div>
      </section>
    </div>
    <div class="col">
      <div class="result-col">
        <div>
          <div class="result-item">
            <div>
              <p class="text-white">Tip Amount</p>
              <span>/ person</span>
            </div>
            <p class="text-cyan-500 text-4xl max-w-[154px] overflow-hidden">${{getTipAmount}}</p>
          </div>

          <div class="result-item">
            <div>
              <p class="text-white">Total</p>
              <span>/ person</span>
            </div>
            <p class="text-cyan-500 text-4xl max-w-[154px] overflow-hidden">${{getTotal}}</p>
          </div>
        </div>
        <button :class="['reset-btn', hasResult?'selected':'']" v-on:click.prevent="reset">
          RESET
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PercentSelect from "@/components/PercentSelect";
export default {
  name: "TipsCalc",
  data(){
    return{
      bill: null,
      peopleCount: null,
      hasResult: false,
    }
  },
  computed: {
    getTipAmount: function () {
      if(this.requirePeopleInput == true) return 0;
      const percent = this.$store.state.percent / 100;
      const val = this.bill * percent / (this.peopleCount);
      const result = Math.round(val * 100) / 100;
      const length = result.toString().length;
      console.log('length ' + result.toString().length)
      if(length > 7) return '0';
      this.localSave();
      return result || 0;
    },
    getTotal: function (){
      if(this.requirePeopleInput == true) return 0;
      const val = (Number(this.getTipAmount) + Number(this.bill)) / Number(this.peopleCount);
      const result = Math.round(val * 100) / 100;
      if(result > 10e6) return '0';
      this.localSave();
      return Math.round(Number(result) * 100) / 100 || 0;
    },
    requirePeopleInput: function (){
      return this.bill != null && (this.peopleCount == null || this.peopleCount == 0)
    }
  },
  methods: {
    reset(){
      this.hasResult = false;
      this.bill = null;
      this.peopleCount = null;
      localStorage.setItem('bill', null);
      localStorage.setItem('people', null);
      localStorage.setItem('tip', null);
    },
    localSave(){
      this.hasResult = false;
      if (this.bill != null && this.peopleCount != null && this.$store.state.percent != null){
        console.log('---\nsaving...');
        this.hasResult = true;
        localStorage.setItem('bill', this.bill);
        console.log(this.bill);
        localStorage.setItem('people', this.peopleCount);
        console.log(this.peopleCount);
        localStorage.setItem('tip', this.$store.state.percent);
      }
    },
    localLoad(){
      const bill = localStorage.getItem('bill');
      console.log(bill);
      this.bill = bill == 'null'? null: bill;
      const peopleCount = localStorage.getItem('people');
      console.log(peopleCount);
      this.peopleCount = peopleCount == 'null'? null: peopleCount;
      const percent = localStorage.getItem('tip');
      console.log(percent);
      this.$store.state.percent = percent == 'null'? null: percent;
    }
  },
  created() {
    this.localLoad();
  },
  components: {PercentSelect}
}
</script>

<style scoped>
.card{
  @apply bg-white rounded-lg;
  @apply grid grid-cols-1 gap-2 md:grid-cols-2;
  @apply p-4  min-w-[330px] md:w-[630px];
}
.card .col{
  @apply flex flex-col m-2;
}
.result-col{
  @apply flex flex-col justify-between;
  @apply bg-cyan-700 rounded p-5 h-full;
}
.result-item{
  @apply flex flex-row justify-between mb-4;
}
.calc-input{
  @apply w-full text-end;
}
.reset-btn{
  @apply text-cyan-700 py-2;
}
.reset-btn.selected{
  @apply bg-cyan-500 text-white;
}
</style>