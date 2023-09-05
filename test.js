import http from 'k6/http';
import { sleep } from 'k6';

// configure load testing users and rampup time. 
// define SLOs as Pass/Fail criteria with Thresholds
export const options = {
    duration: '1m',
    vus: 5,

    stages: [
        { duration: '1m', target: 20 },
        { duration: '3m', target: 20 },
        { duration: '1m', target: 0 },
      ],
      
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<500'], // 95 percent of response times must be below 500ms
      },
  };
  

export default function () {
  const res = http.get('https://test.k6.io');
  sleep(1);
}
