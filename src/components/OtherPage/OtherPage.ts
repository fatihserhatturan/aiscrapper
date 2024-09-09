import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OtherPage',
  data() {
    return {
      isExpanded: false, // Card expansion state
    };
  },
  methods: {
    toggleCard() {
      this.isExpanded = !this.isExpanded;
    },
  },
});
