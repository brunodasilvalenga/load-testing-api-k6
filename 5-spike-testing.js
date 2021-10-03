/*
Spike Testing

Variant of a stress test, but instead of gradually increasing,
it spikes to extreme load in a very short time.

Command: docker run -i loadimpact/k6 run - <5-spike-testing.js

A spike test is designed to identify when your system can't handle
requests coming in all at once. This kind of test will start slowly
with low traffic to see how the system reacts then gradually build
up until there is a high spike in incoming requests. This can help
identify memory leaks and performance issues that are caused by
external or internal events such as a hardware failure, system
slowdown or even when the API is used at maximum capacity.

Notes:
- How your system will perfom under a sudden spike of traffic.
- Very common on product launches.
- Very common on marketing campaigns.
*/

import http from 'k6/http'
import { sleep, check } from 'k6'

export let options = {
  noConnectionReuse: false,
  stages: [
    { duration: '5m', target: 50 }, //below normal load
    { duration: '2m', target: 50 },
    { duration: '2m', target: 1000 }, //spike to 1500 users
    { duration: '2m', target: 1000 }, //stay at 1500 users for 2 minutes
    { duration: '10m', target: 50 }, //scale back to 100 users
    { duration: '3m', target: 50 },
    { duration: '2m', target: 0 },
  ],
}

export default () => {
  const res = http.get('https://your.second.api.com')
  check(res, { 'status was 200': r => r.status == 200 })
  sleep(1)
}
