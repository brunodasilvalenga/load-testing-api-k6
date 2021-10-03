/*
Soak Testing

Is used to validate realiability of the application for a long period of time.

Command: docker run -i loadimpact/k6 run - <soak-testing.js

A soak test is a classic way of doing the majority of load
testing for applications that are able to handle high traffic
over time. In other words, it puts your API through its paces
to see how it holds up under continuous stress over a period
of time. This is done by running the test for an extended period
of time with higher loads than what would normally be expected so
that any problems can be identified under actual use conditions.

Notes:
- Check problems like memory leaks, craces, timeouts.

How:
- Get how many users your application can handle in average.
- Use that number as the target VUs.
- Run the test for a long period of time.
*/

import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  noConnectionReuse: false,
  stages: [
    { duration: '1m', target: 100 }, //Normal user connections 1-100 in 2 minutes
    { duration: '5h', target: 300 }, //Stay for 5h with average of 300 VUs
    { duration: '1m', target: 0 }, //Scale down to 0 users.
  ]
};

export default () => {
  const res = http.get('http://localhost:8080/signin');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}