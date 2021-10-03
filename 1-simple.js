// Simple testing
// It will request as fast as possible the endpoint for 10s
// Command: docker run -i loadimpact/k6 run - <1-simple.js

import http from 'k6/http';
import { check } from 'k6';

export let options = {
  noConnectionReuse: false,
  vus: 1,
  duration: '5s',
};

// Single Endpoint
export default () => {
  const res = http.get('https://your.api.com');
  check(res, { 'status was 200': (r) => r.status == 200 });
}

// Multiple Endpoints
export default () => {
  const res = http.batch({
    'api-gateway': {
      method: 'GET',
      url: 'https://your.api.com'
    },
    'docker': {
      method: 'GET',
      url: 'https://your.second.api.com'
    }
  })
  check(res['docker'], { 'docker res status was 200': (r) => r.status == 200 });
  check(res['api-gateway'], { 'api gateway res status was 200': (r) => r.status == 200 });
}