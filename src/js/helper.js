import { TIMEOUT_THRESHOLD } from "./config";

const timeout = ms =>
  new Promise((_, reject) => {
    setTimeout(
      () =>
        reject(
          new Error(`Request took too long! Timeout after ${ms} milliseconds`)
        ),
      ms
    );
  });

export const getJSON = async (url, options) => {
  try {
    const prms = fetch(url, options);
    const resp = await Promise.race([prms, timeout(TIMEOUT_THRESHOLD)]);

    if (!resp.ok) throw resp.statusText;
    return await resp.json();
  } catch (e) {
    throw e;
  }
};
