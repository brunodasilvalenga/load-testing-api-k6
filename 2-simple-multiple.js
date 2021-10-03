// Simple testing multiple endpoints
// It will request as fast as possible the endpoint for 10s
// Command: docker run -i loadimpact/k6 run - <2-simple-multiple.js

import http from 'k6/http'
import { check } from 'k6'

export let options = {
  vus: 1,
  duration: '5s',
}

export default () => {
  const res = http.batch([
    ['GET', 'https://your.second.api.com'],
    ['GET', 'https://your.api.com'],
  ])

  check(res[0], { 'docker res status was 200': r => r.status == 200 })
  check(res[1], { 'api gateway res status was 200': r => r.status == 200 })
}
