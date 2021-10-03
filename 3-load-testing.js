/*
Load Testing

Mensure the performance of your application in terms of
concorrent users and requests per second.

Command: docker run -i loadimpact/k6 run - <load-testing.js

A load test simulates real users performing real tasks to see
how your API responds under actual conditions of use. It can
help identify issues with scalability, load balancing and capacity
planning. This type of testing can show how your API will respond
to standard user behaviour as well as unusual or abnormal use cases.

Notes:
- Simulate normal user behaviour.
*/

import http from 'k6/http'
import { sleep, check } from 'k6'

export let options = {
  noConnectionReuse: false,
  stages: [
    { duration: '2m', target: 50 }, //Normal user connections 1-100 in 5 minutes
    { duration: '10m', target: 50 }, //Stay like this for 10 minutes
    { duration: '2m', target: 0 }, //Scale down to 0 users.
  ],
  thresholds: {
    http_req_duration: ['p(99)<500'], //99% of requests must complete in less than 500ms
  },
}

export default () => {
  const res = http.get('https://your.second.api.com')
  check(res, { 'status was 200': r => r.status == 200 })
  sleep(1)
}
