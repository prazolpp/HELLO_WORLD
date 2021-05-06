const DEFAULT_HEADERS = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer',
};

const sendRequest = (requestObj, headers = DEFAULT_HEADERS) => {
    const url = requestObj.url;
    delete requestObj.url;
    const response = fetch(url, { ...requestObj, ...headers }).then((data) =>
        data.json()
    );

    return Promise.resolve(response);
};

module.exports = { sendRequest }
