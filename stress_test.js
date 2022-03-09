import http from "k6/http";
import { sleep } from "k6";

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '30s', target: 500 },
    { duration: '3m', target: 900 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<150'], // 99% of requests must complete below 1.5s
  }
}

const BASE_URL = 'http://localhost:3000'

export default function () {
  http.batch([
    ['GET', `${BASE_URL}/products`],
    ['GET', `${BASE_URL}/products/1`],
    ['GET', `${BASE_URL}/products/1/styles`],
    ['GET', `${BASE_URL}/products/1/related`],
  ])
  sleep(1);
}
