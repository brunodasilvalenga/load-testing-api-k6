// Simple testing Request Per Second (RPS)
// It will request as fast as possible the endpoint for 10s
// Command: docker run -i loadimpact/k6 run - <2-simple-rps.js

import http from 'k6/http'
import { sleep, check } from 'k6'

export let options = {
  noConnectionReuse: false,
  vus: 1,
  duration: '10s',
}

export default () => {
  const res = http.get('https://your.second.api.com')
  check(res, { 'status was 200': r => r.status == 200 })
  sleep(1)
}
