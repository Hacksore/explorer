import ConfigRequest from 'config-request/instance';
import qs from 'querystringify';

import { getCommaAccessToken } from './auth/storage';
import errorHandler from './errorHandler';

const URL_ROOT = 'https://api.commadotai.com/v1/';

const request = ConfigRequest();

var initPromise = init();

async function init() {
  const config = {
    baseUrl: URL_ROOT,
    jwt: false
  }

  var token = await getCommaAccessToken();
  if (token) {
    config.token = `JWT ${token}`;
  }

  request.configure(config);
}

export async function get(endpoint, data) {
  await initPromise;
  return new Promise((resolve, reject) => {
    request.get(
      endpoint,
      {
        query: data,
        json: true
      },
      errorHandler(resolve, reject)
    );
  });
}

export async function post(endpoint, data) {
  await initPromise;
  return new Promise((resolve, reject) => {
    request.post(
      endpoint,
      {
        body: data,
        json: true
      },
      errorHandler(resolve, reject)
    );
  });
}

export async function postForm(endpoint, data) {
  await initPromise;
  return new Promise((resolve, reject) => {
    request.post(
      endpoint,
      {
        body: qs.stringify(data),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      },
      errorHandler(resolve, reject)
    )
  });
}

export async function patch(endpoint, data) {
  await initPromise;
  return new Promise((resolve, reject) => {
    request.patch(
      endpoint,
      {
        body: data,
        json: true
      },
      errorHandler(resolve, reject)
    );
  });
}
