export const host = "http://ssyz.mshome.net";
export const port = "7379";

export async function handleResponse(response) {
  if (response.ok) return response.json();
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error);
  throw error;
}

export function getModelPath() {
  return fetch(host + ":" + port + "/GET/ModelPath", { method: "GET" })
    .then(handleResponse)
    .catch(handleError);
}

export function get(key) {
  return fetch(host + ":" + port + "/GET/" + key, { method: "GET" })
    .then(handleResponse)
    .catch(handleError);
}

export function hgetall(key) {
  return fetch(host + ":" + port + "/HGETALL/" + key, { method: "GET" })
    .then(handleResponse)
    .catch(handleError);
}

export function zrangebylex(key, start, end) {
  return fetch(
    host + ":" + port + "/ZRANGEBYLEX/" + key + "/" + start + "/" + end,
    { method: "GET" }
  )
    .then(handleResponse)
    .catch(handleError);
}

export function subscribe(key) {
  return fetch(host + ":" + port + "/SUBSCRIBE/" + key, { method: "GET" })
    .then(function(response) {
      console.log(response);
      const reader = response.body.getReader();
      function go() {
        reader.read().then(function(result) {
          if (!result.done) {
            var ctn = JSON.parse(new TextDecoder("utf-8").decode(result.value));
            console.log(ctn.SUBSCRIBE);
            go();
          }
        });
      }

      go();
    })
    .catch(handleError);
}
