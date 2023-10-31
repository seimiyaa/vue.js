Vue.createApp({
  data() {
    return {
      card: [],
      sort_key: "",
      sort_asc: true,
      selectCategory: "all",
      searchKeyword: "",
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
        if (this.sort_key === "id") {
          this.card.sort((a, b) => (a[this.sort_key] - b[this.sort_key]) * set);
        } else {
          this.card.sort((a, b) => {
            let valueA = a[this.sort_key];
            let valueB = b[this.sort_key];
            let comparison = valueA.localeCompare(valueB, "ja", {
              sensitivity: "base",
            });
            return comparison * set;
          });
        }
        console.log("Sorted Data: ", this.card);
      }
    },
    search() {
      this.card = this.filterItems();
    },
    filterItems() {
      let filtered = this.card;
      if (this.selectCategory !== "all" && this.searchKeyword !== "") {
        filtered = filtered.filter((item) => {
          if (
            this.selectCategory === "id" &&
            item.id.toString().includes(this.searchKeyword)
          ) {
            return true;
          } else if (
            this.selectCategory === "name" &&
            item.name.includes(this.searchKeyword)
          ) {
            return true;
          } else if (
            this.selectCategory === "company" &&
            item.company.includes(this.searchKeyword)
          ) {
            return true;
          } else if (
            this.selectCategory === "division" &&
            item.division.includes(this.searchKeyword)
          ) {
            return true;
          } else if (
            this.selectCategory === "title" &&
            item.title.includes(this.searchKeyword)
          ) {
            return true;
          }
          return false;
        });
      }
      return filtered;
    },
  },
}).mount("#app");
