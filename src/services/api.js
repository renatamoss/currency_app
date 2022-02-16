import axios from 'axios'

const api = axios.create({
    baseURL: 'https://economia.awesomeapi.com.br/json'

});

export default {
    last() {
      return api.get('/last/USD-BRL,EUR-BRL,BTC-BRL')
    },
  
    listen(codes = []) {
      return api.get(`/all/${codes.join()}`)
    }
}

// last/USD-BRL,EUR-BRL,BTC-BRL