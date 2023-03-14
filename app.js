let app = Vue.createApp({
  data() {
    return {
      city: undefined,
      image: undefined,
      temperature: undefined,
      isError: undefined,
      isLoading: false   
    }
  },
  async mounted(){
    this.isError = false
    this.isLoading = true
    const response = await fetch('https://json-server.typicode.com/jercilla/json-server-weather/cities/BIO')
                           .catch((e) => {
                             console.log('****ERROR', e)
                             this.isLoading = false
                             this.isError = true
                           })    
    if (!this.isError && response?.ok) {
      this.isLoading = false
      const bilbaoWheater = await response.json()
      
      this.temperature = bilbaoWheater.temperature
      this.city = bilbaoWheater.city
      if (bilbaoWheater.rain_probability > 0.5) {
        this.image = 'images/rain.png'
      } else {
        this.image = 'images/sunny.png'
      }
    } else {
      this.isError = true
    }
  }
});

app.mount("#app");