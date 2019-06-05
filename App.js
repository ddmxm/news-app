import React, {Component} from 'react';
import {FlatList} from 'react-native';

import {getNews} from './src/news';
import Article from './src/components/Article';
import {insertNewArticles, queryAllArticles, isArticleNotExist} from './src/databases/allSchemas';

export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {articles: [], refreshing: true};
        this.fetchNews = this.fetchNews.bind(this);
        this.getArticlesFromDB = this.getArticlesFromDB.bind(this);
    }

    getArticlesFromDB() {
        queryAllArticles()
            .then((articles) => {
                this.setState({articles, refreshing: false});
            })
            .catch((error) => {
                this.setState({refreshing: false});
                alert(`${error.name}`);
            })
    }

    componentDidMount() {
        this.fetchNews();
    }

    fetchNews() {
        getNews()
            .then(articles => {
                for (var i = 0; i < articles.length; i++) {
                    const newArtiсle = {
                        title: articles[i].title,
                        description: articles[i].description,
                        publishedAt: articles[i].publishedAt,
                        sourceName: articles[i].source.name,
                        urlToImage: articles[i].urlToImage,
                        url: articles[i].url,
                    };
                    insertNewArticles(newArtiсle).catch((error) => {
                        alert(`Проблема с записью в БД:\n ${error}`);
                    })
                }
            })
            .then(() => {
                    this.getArticlesFromDB();
                }
            )
            .catch((error) => {
                if (error.name == 'GetNewsError') {
                    alert(`${error}`);
                    this.getArticlesFromDB();
                    this.setState({refreshing: false});
                } else if (error.name == 'ReadDbError') {
                    alert(`${error}`);
                    this.setState({refreshing: false});
                } else {
                    alert(`${error}`)
                    this.setState({refreshing: false});
                }
            })
    }

    handleRefresh() {
        this.setState(
            {
                refreshing: true
            },
            () => this.fetchNews()
        );
    }

    render() {
        return (
            <FlatList
                data={this.state.articles}
                renderItem={({item}) => <Article article={item}/>}
                keyExtractor={item => item.url}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh.bind(this)}
            />
        );
    }
}
