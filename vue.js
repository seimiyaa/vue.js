Vue.createApp({
  data() {
    return {
      card: [],
      sort_key: "",
      sort_asc: true,
    };
  },
  async created() {
    const response = await fetch("./cards.json");
    const data = await response.json();
    this.card = data;
  },
  methods: {
    sortBy(key) {
      this.sort_key = key;
      this.sort_asc = this.sort_key === key ? !this.sort_asc : true;
      console.log("Sort Key: " + this.sort_key);
      console.log("Sort Ascending: " + this.sort_asc);

      if (this.sort_key !== "") {
        let set = this.sort_asc ? 1 : -1;
        if (this.sort_key === 'id') {
          this.card.sort((a, b) => (a[this.sort_key] - b[this.sort_key]) * set);
        } else {
          this.card.sort((a, b) => {
            const valueA = a[this.sort_key];
            const valueB = b[this.sort_key];
            const comparison = valueA.localeCompare(valueB, 'ja', { sensitivity: 'base' });
            return comparison * set;
          });
        }
        console.log("Sorted Data: ", this.card);
      }
    },
  }
}).mount("#app");
