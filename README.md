# api-js

Mostrar el *tiempo actual* en una ciudad.

![city weather](preview.png)


# 1 añadimos vue

```
<head>
  ...
  ...
  <script src="https://unpkg.com/vue@next"></script>
</head>
```

```
<body>
  ...
  ...
  <script src="app.js"></script>
</body>
```

```
let app = Vue.createApp({

});
```

# 2 creamos app vue

```
let app = Vue.createApp({
});

app.mount("#app");
```

`[Vue warn]: Failed to mount app: mount target selector "#app" returned null.`

```
<body>
  <main id="app">
    ...
    ...
  </main>
  <script src="app.js"></script>
</body>
```

# 3 vue props

```
      <h2>{{city}}</h2>
      <img :src="image" alt="">
      <h3>{{temperature}} ºC</h3>
```

```
  data() {
    return {
      city: 'BIO',
      image: 'images/rain.png',
      temperature: 11
    }
  },
```

# 3 obtener predicción real

```
  data() {
    return {
      city: undefined,
      image: undefined,
      temperature: undefined
    }
  },
  mounted() {
    this.city = 'BIO'
    this.image = 'images/rain.png'
    this.temperature = 11
  }
```

## Bilbao Weather

[https://my-json-server.typicode.com/jercilla/json-server-weather/cities/BIO](https://my-json-server.typicode.com/jercilla/json-server-weather/cities/BIO)

```
{
  "id": "BIO",
  "name": "Bilbao",
  "temperature": 11,
  "rain_probability": 0.9
}
```

```
  async mounted(){
    const url = 'https://xyz.com/jercilla/json-server-weather/cities/BIO'
    const response = await fetch(url)
    const data = await response.json()
    
    this.temperature = data.temperature
    this.city = data.id
    if (data.rain_probability > 0.5) {
      this.image = 'images/rain.png'
    } else {
      this.image = 'images/sunny.png'
    }
  }
```

## Diferencias de URL FRONT y BACK

`http://127.0.0.1:5500/index.html`

`https://my-json-server.typicode.com/jercilla/json-server-weather/cities/BIO`


# 4 gestión de errores


```
  async mounted(){
    const url = 'https://xyz.com/jercilla/json-server-weather/cities/NYC'
    this.isError = false
    const response = await fetch(url)
    
    if (response.ok) {
      ...
      ...
    } else {
      this.isError = true
    }
  }
```

```
  data() {
    return {
      ...
      isError: undefined      
    }
  },
```

```
  <main id="app">
    <img v-if="isError" src="images/error.png" alt="error">
    <div v-else class="weather-summary">
      ...
      ...
```

## Otro tipo de errores

```
  async mounted(){
    const url = 'https://xyz.com/jercilla/json-server-weather/cities/NYC'
    this.isError = false
    const response = await fetch(url)
                           .catch((e) => {
                             console.log('****ERROR', e)
                             this.isError = true
                           })    
    if (!this.isError && response?.ok) {
        ...
        ...
```

![HTTP Error Codes](HTTP-Error-Codes.jpg)

[HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
)


# 5 Loading...


```
  async mounted(){
    const url = 'https://xyz.com/jercilla/json-server-weather/cities/NYC'
    this.isError = false
    this.isLoading = true
    const response = await fetch(url)
                           .catch((e) => {
                             console.log('****ERROR', e)
                             this.isError = true
                             this.isLoading = false
                           })    
    this.isLoading = false
    if (!this.isError && response?.ok) {
      ...
      ...
```

```
  data() {
    return {
      ...
      isLoading: false   
    }
  },

```

```
  <main id="app">
    <img v-if="isLoading" src="images/spin.gif" alt="loasding">
    <img v-if="isError" src="images/error.png" alt="error">
    <div v-if="!isError && !isLoading" class="weather-summary">
      ...
```

# 6 Métodos de petición HTTP (aka 'http verbs')

![HTTP Verbs](HTTP-verbs.png)

https://developer.mozilla.org/es/docs/Web/HTTP/Methods


# 7 REST

https://es.wikipedia.org/wiki/Transferencia_de_Estado_Representacional

> En REST, al contrario, el énfasis se pone en los recursos, o **sustantivos**; especialmente en los nombres que se le asigna a cada tipo de recurso. Por ejemplo, una aplicación REST podría definir algunos tipos de recursos asignándoles estos nombres:
>
>  - Libros
>  - Ciudades
>  - Usuarios
>  - ...


## 8 Servidor _backend_ local

```
git clone https://github.com/jercilla/json-server-weather.git

code json-server-weather

(open terminal)

npx json-server --watch db.json
```


- Seleccionar todos: `GET /cities`
```
curl -X GET http://localhost:3000/cities
[
  {
    "id": "BIO",
    "name": "Bilbao",
    "temperature": 11,
    "rain_probability": 0.9
  },
  {
    "id": "TFN",
    "name": "Tenerife",
    "temperature": 22,
    "rain_probability": 0.1
  }
]
```

- Seleccionar uno (por `id`): `GET /cities/BIO`
```
curl -X GET http://localhost:3000/cities/BIO
{
  "id": "BIO",
  "name": "Bilbao",
  "temperature": 11,
  "rain_probability": 0.9
}
```

- Insertar 1: `POST /cities`
```
curl -X POST http://localhost:3000/cities \
     -H "Content-Type: application/json" \
     --data '{"id":"NYC", "name":"New York", "temperature": 8, "rain_probability": 0.4}'
```

- Eliminar: `DELETE  /cities/BIO`
```
curl -X DELETE http://localhost:3000/cities/NYC
```

# 7 POST usando FETCH

**admin.html**
```
<!DOCTYPE html>
<head>
  <title>City Weather</title>
  <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
  <main id="app">
    <img v-if="isLoading" src="images/spin.gif" alt="loading">
    <img v-if="isError" src="images/error.png" alt="error">
    <div v-if="!isError && !isLoading" >
      <h1>ADMIN</h1>
    </div>
  </main>
  <script src="admin.js"></script>
</body>
```

**admin.js**
```
let app = Vue.createApp({
  data() {
    return {
      isError: undefined,
      isLoading: false   
    }
  }
});

app.mount("#app");
```

## Primera versión lo más simple posible
```
  methods: {
    async newCity() {
      const url = 'http://localhost:3000/cities';
      this.isError = false
      this.isLoading = true
      const response = await fetch(url, {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: '{"id":"NYC", "name":"New York", "temperature": 8, "rain_probability": 0.4}'
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
```

```
      <button @click="newCity()">Crear ciudad: NYC</button>
```

## Segunda versión con campos de entrada de datos

```
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
```

```
  body: `{"id":"${this.id}", "name":"${this.name}", "temperature": ${this.temperature}, "rain_probability": ${this.rain_probability}}`

```

```
    <div v-if="!isError && !isLoading" >
      <h1>ADMIN</h1>
      <label>ID: <input type="text" v-model="id"></label>
      <label>Nombre: <input type="text" v-model="name"></label>
      <label>Temp: <input type="number" v-model="temperature"> ºC</label>
      <label>Prob. lluvia: <input type="number" v-model="rain_probability"></label>
      <button @click="newCity()">Crear ciudad</button>
    </div>
```

```
    <pre>{{$data}}</pre>
```

## Tercera versión con objetos javascript

```
  data() {
    return {
      city: {
        id: undefined,
        name: undefined,
        temperature: undefined,
        rain_probability: undefined,
      },
```

```
      <label>ID: <input type="text" v-model="city.id"></label>
      <label>Nombre: <input type="text" v-model="city.name"></label>
      <label>Temp: <input type="number" v-model="city.temperature"> ºC</label>
      <label>Prob. lluvia: <input type="number" v-model="city.rain_probability"></label>
```

```
      const response = await fetch(url, {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify(this.city)
                              })
```

