import Realm from 'realm';

export const ARTICLE_SCHEMA = 'Article';

export const ArticleSchema = {
    name: ARTICLE_SCHEMA,
    primaryKey: 'url',
    properties: {
        sourceName: 'string',
        title: 'string',
        description: 'string?',
        url: 'string',
        urlToImage: 'string?',
        publishedAt: 'string',
    }
};

const databaseOptions = {
    path: 'news_app.realm',
    // schema: [ArticleListSchema, ArticleSchema],
    schema: [ArticleSchema],
    schemaVersion: 0, //optional
};

export const insertNewArticles = newArticle => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(ARTICLE_SCHEMA, newArticle, true);
            resolve(newArticle);
        })
    }).catch((error) => {
        reject(error);
    });
});

class ReadDbError extends Error{
    constructor(message) {
        super(message);
        this.name = "ReadDbError";
    }
}

export const queryAllArticles = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allArticles = realm.objects(ARTICLE_SCHEMA);
        if (allArticles.length == 0) {
            throw new ReadDbError('База данных пуста!')
        }
        resolve(allArticles);
    })
        .catch((error) => {
            reject(error);
        });
});


export default new Realm(databaseOptions);
