import http from "k6/http";
import { sleep } from "k6";

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '30s', target: 1000 }
  ],
  thresholds: {
    http_req_duration: ['p(99)<150'], // 99% of requests must complete below 1.5s
  }
}

const randomNum = Math.floor(Math.random() * Math.floor(1000000) * 1)

const BASE_URL = 'http://localhost:3000'

export default function () {
  http.get(`${BASE_URL}/products/${randomNum}/styles`)

  // http.batch([
  //   ['GET', `${BASE_URL}/products`],
  //   ['GET', `${BASE_URL}/products/${randomNum}`],
  //   ['GET', `${BASE_URL}/products/${randomNum}/styles`],
  //   ['GET', `${BASE_URL}/products/${randomNum}/related`],
  // ])
  sleep(1);
}
