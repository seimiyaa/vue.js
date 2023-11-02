Vue.createApp({
  data() {
    return {
      card: [],
      newInfo: {
        name: "",
        company: "",
        division: "",
        title: "",
      },
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
    addNewInfo() {
      let errorMessage = "";

      if (!/\s/.test(this.newInfo.name)) {
        errorMessage =
          "名前に半角スペースを入れてフルネームで入力してください";
      } else if (!/^[ぁ-んァ-ヶー－一-龠\s]*$/.test(this.newInfo.name)) {
        errorMessage = "名前は日本語のみ入力してください";
      } else if (!/株式会社$/.test(this.newInfo.company)) {
        errorMessage = "会社名には「株式会社」が末尾に必要です";
      } else if (!/^[ぁ-んァ-ヶー－一-龠]*$/.test(this.newInfo.company)) {
        errorMessage = "会社名は日本語のみ入力してください";
      } else if (
        this.newInfo.title &&
        !/^[ぁ-んァ-ヶー－一-龠]*$/.test(this.newInfo.title)
      ) {
        errorMessage = "役職は日本語のみ入力してください";
      }

      if (errorMessage) {
        alert(errorMessage);
        return;
      }

      const newID = Math.max(0, ...this.card.map((item) => item.id)) + 1;

      this.card.forEach((item, index) => {
        item.id = index + 2;
      });

      this.card.unshift({
        id: 1,
        name: this.newInfo.name,
        company: this.newInfo.company,
        division: this.newInfo.division,
        title: this.newInfo.title,
      });
      this.newInfo = {
        name: "",
        company: "",
        division: "",
        title: "",
      };
    },
    sortBy(key) {
      if (this.sort_key === key) {
        this.sort_asc = !this.sort_asc;
      } else {
        this.sort_key = key;
        this.sort_asc = true;
      }

      console.log("Sort Key: " + this.sort_key);
      console.log("Sort Ascending: " + (this.sort_asc ? "昇順" : "降順"));

      this.searchResult.sort((a, b) => {
        const sortOrder = this.sort_asc ? 1 : -1;
        if (this.sort_key === "id") {
          return (a.id - b.id) * sortOrder;
        } else {
          return (
            a[this.sort_key].localeCompare(b[this.sort_key], "ja", {
              sensitivity: "base",
            }) * sortOrder
          );
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
