export const timeout = function(s) {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error(`Request took too long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
};

export const getJSON = async function(url, apiKeys = null) {
  try {
    // Fetch data from api

    const fetchRes = apiKeys ? fetch(`${url}`, apiKeys) : fetch(`${url}`);
    const res = await Promise.race([fetchRes, timeout(10)]);

    const data = await res.json();
    if (!res.ok)
      throw new Error(`Bad request. ${res.status}... failed to connect`);
    return data;
  } catch (err) {
    throw err;
  }
};
