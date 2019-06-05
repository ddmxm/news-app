const url =
    "https://newsapi.org/v2/top-headlines?country=ru&apiKey=b23f2a06b597474895274065e8f3bf27";

function timeout(ms, promise) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject(new Error("Timeout Error"))
        }, ms)
        promise.then(resolve, reject)
    })
}

function GetNewsError(message) {
    this.name = "GetNewsError";
    this.message = message || "Ошибка во время загрузки новостей";
}

GetNewsError.prototype = Object.create(Error.prototype);

export async function getNews() {
    let result = await timeout(3000, fetch(url))
        .then(response => response.json())
        .catch((error) => {
            throw new GetNewsError();
        });
    return result.articles;
}


