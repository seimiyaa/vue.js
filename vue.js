Vue.createApp({
  data() {
    return {
      card: [],
      sort_key: "",
      sort_asc: true,
      selectCategory: "all",
      searchKeyword: "",
      searchResult: [],
    };
  },
  async created() {
    const response = await fetch("./cards.json");
    const data = await response.json();
    this.card = data;
    this.searchResult = data;
  },
  methods: {
    sortBy(key) {
      if (this.sort_key === key) {
        this.sort_asc = !this.sort_asc;
      } else {
        this.sort_key = key;
        this.sort_asc = true;
      }

      console.log("Sort Key: " + this.sort_key);
      console.log("Sort Ascending: " + (this.sort_asc ? '昇順' : '降順'));

      this.searchResult.sort((a, b) => {
        const sortOrder = this.sort_asc ? 1 : -1;
        if (this.sort_key === "id") {
          return (a.id - b.id) * sortOrder;
        } else {
          return a[this.sort_key].localeCompare(b[this.sort_key], "ja", {
            sensitivity: "base",
          }) * sortOrder;
        }
      });
      console.log("Sorted Data: ", this.searchResult);
    },
    search() {
      this.searchResult = this.filterItems();
      console.log(this.searchResult);
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
