// JavaScript sample for checking theme colors.
"use strict";

const { EventEmitter } = require("node:events");

const DEFAULT_OPTIONS = Object.freeze({
  retries: 3,
  timeout: 2.5e3,
  verbose: false,
  baseUrl: "https://example.com/api",
});

/**
 * A tiny HTTP client with retry support.
 * @param {object} options - Client options.
 */
class ApiClient extends EventEmitter {
  #token = null;

  constructor(options = {}) {
    super();
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  set token(value) {
    this.#token = value?.trim() ?? null;
  }

  async request(method, endpoint, body = undefined) {
    for (let attempt = 1; attempt <= this.options.retries; attempt++) {
      const response = await fetch(`${this.options.baseUrl}/${endpoint}`, {
        method,
        headers: { Authorization: `Bearer ${this.#token}` },
        body: body && JSON.stringify(body),
      });

      if (response.ok) {
        this.emit("success", { endpoint, attempt });
        return response.json();
      }
      if (response.status >= 500 && attempt < this.options.retries) {
        continue;
      }
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }
  }
}

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) yield i;
}

const client = new ApiClient({ verbose: true });
client.on("success", ({ endpoint }) => console.log(`OK: ${endpoint}`));
console.log(slugify("Hello, World!"), [...range(0, 10, 2)], typeof client, null, NaN);
