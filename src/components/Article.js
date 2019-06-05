import React from 'react';
import {View, Linking, TouchableNativeFeedback} from 'react-native';
import {Text, Button, Card, Divider} from 'react-native-elements';
import moment from 'moment';

import styles from './styles';

export default class Article extends React.Component {
    render() {
        const {
            title,
            description,
            publishedAt,
            sourceName,
            urlToImage,
            url
        } = this.props.article;
        const {
            noteStyle,
            featuredTitleStyle,
            dividerStyle,
            descriptionStyle,
            newsBottomStyle
        } = styles;
        const time = moment(publishedAt || moment.now()).fromNow();
        const defaultImg = './images/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg'

        return (
            <TouchableNativeFeedback
                useForeground
                onPress={() => Linking.openURL(url)}
            >
                <Card
                    featuredTitle={title}
                    featuredTitleStyle={featuredTitleStyle}
                    image={{
                        uri: urlToImage || defaultImg
                    }}
                >
                    <Text style={descriptionStyle}>
                        {description || 'Read More..'}
                    </Text>
                    <Divider style={dividerStyle}/>
                    <View
                        style={newsBottomStyle}
                    >
                        <Text style={noteStyle}>{sourceName.toUpperCase()}</Text>
                        <Text style={noteStyle}>{time}</Text>
                    </View>
                </Card>
            </TouchableNativeFeedback>
        );
    }
}

