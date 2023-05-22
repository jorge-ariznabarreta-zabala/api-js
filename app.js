let app = Vue.createApp({
  data() {
    return {
      id: "BIO",
      city: undefined,
      image: undefined,
      temperature: undefined,
      isError: false,
      isLoading: false,
      response: undefined,
    };
  },
  methods: {
    getCity: async function () {
      this.isLoading = true;
      this.isError = false;
      const url = "http://127.0.0.1:5000/cities/" + this.id;
      const response = await fetch(url);
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log("***data", data);

        this.city = data.name;
        if (data.rain_probability > 0.5) {
          this.image = "images/rain.png";
        } else {
          this.image = "images/sunny.png";
        }
        this.temperature = data.temperature;
      } else {
        this.isError = true;
      }
      this.isLoading = false;
    },
  },
});

app.mount("#app");