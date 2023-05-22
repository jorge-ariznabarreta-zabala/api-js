let app = Vue.createApp({
    data() {
        return {
          id: undefined,
          name: undefined,
          temperature: undefined,
          rain_probability: undefined,
          isError: undefined,
          isLoading: false   
        }
      },
    methods: {
        async CreateCity() {
          const url = 'http://localhost:5000/cities';
          this.isError = false
          this.isLoading = true
          const response = await fetch(url, {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: `{"id":"${this.id}", "name":"${this.name}", "temperature": ${this.temperature}, "rain_probability": ${this.rain_probability}}`
                                  })
                                 .catch((e) => {
                                   console.log('****ERROR', e)
                                   this.isLoading = false
                                   this.isError = true
                                 })    
          this.isLoading = false
          if (!this.isError && response?.ok) {
          } else {
            this.isError = true
          }
        },
        async UpdateCity() {
          const url = 'http://localhost:5000/cities/'+this.id;
          this.isError = false
          this.isLoading = true
          const response = await fetch(url, {
                                    method: 'PUT',
                                    headers: {'Content-Type': 'application/json'},
                                    body: `{"id":"${this.id}", "name":"${this.name}", "temperature": ${this.temperature}, "rain_probability": ${this.rain_probability}}`
                                  })
                                 .catch((e) => {
                                   console.log('****ERROR', e)
                                   this.isLoading = false
                                   this.isError = true
                                 })    
          this.isLoading = false
          if (!this.isError && response?.ok) {
          } else {
            this.isError = true
          }
        },
        async DeleteCity(id) {
          const url = 'http://localhost:5000/cities/'+this.id;
          this.isError = false
          this.isLoading = true
          const response = await fetch(url, {
                                    method: 'DELETE',
                                    headers: {'Content-Type': 'application/json'}
                                  })
                                 .catch((e) => {
                                   console.log('****ERROR', e)
                                   this.isLoading = false
                                   this.isError = true
                                 })    
          this.isLoading = false
          if (!this.isError && response?.ok) {
          } else {
            this.isError = true
          }
        }
    }    
  });
  
  app.mount("#app");