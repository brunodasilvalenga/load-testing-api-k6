/*
Stress Testing
Test the limit of the API, how far can we push it
Command: docker run -i loadimpact/k6 run - <4-stress-testing.js

A common type of load testing is stress testing, which tests how the application
holds up under heavy use. It is usually designed to find out if there are any flaws
in the design or implementation of the application by forcing it to perform tasks it
would normally not have to do. A lot of times, stress testing involves running a
program that keeps on generating errors in order to cause the software to operate
outside of its normal range. This type of testing can be helpful for detecting
vulnerabilities such as buffer overflows and input validation vulnerabilities.

Expecations:
- How you system will behave under extreme conditions.
- What is the maximum capacity of your system under stress.
- Determine the breaking point of your system.
- Your system will recover after the stress test is over.
*/

import http from 'k6/http'
import { sleep, check } from 'k6'

export let options = {
  noConnectionReuse: false,
  stages: [
    { duration: '2m', target: 100 }, //below normal load
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 }, //normal load
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 }, //around the breaking point
    { duration: '5m', target: 300 },
    { duration: '2m', target: 400 }, //beyond the breaking point
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }, //scale down. Recovey mode.
  ],
}

export default () => {
  const res = http.get('https://your.api.com')
  check(res, { 'status was 200': r => r.status == 200 })
  sleep(1)
}
