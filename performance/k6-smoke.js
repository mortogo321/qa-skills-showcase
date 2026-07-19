// k6-smoke.js
//
// This is a SMOKE test, not a load/stress/soak test:
//   - smoke: a handful of virtual users for a short duration, just to prove
//     the target endpoint is reachable and responds within a sane threshold
//     before running anything heavier.
//   - load:  realistic concurrent user counts sustained over minutes, to
//     validate behaviour under expected production traffic.
//   - stress: pushes beyond expected load to find the breaking point.
//   - soak:  moderate load held for hours to catch leaks/degradation over time.
//
// WARNING: do not repurpose this script (or point k6 in general) at
// restful-booker.herokuapp.com, saucedemo.com, or any other third-party demo
// service with load/stress/soak settings. Those are shared public sandboxes
// for practice, not infrastructure meant to absorb generated traffic. Keep
// VUs and duration at smoke-test scale here.

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 2,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<2000'],
  },
};

export default function () {
  const res = http.get('https://restful-booker.herokuapp.com/ping');

  check(res, {
    'status is 201': (r) => r.status === 201,
  });

  sleep(1);
}
