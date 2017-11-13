import {StyleSheet} from 'react-native';
import {getTransformedCssStyles} from "./cssStyles";

const rawStylesObject = {
    container: {
        flex: 1,
        backgroundColor: '#DDD',
        alignItems: 'center',
        justifyContent: "space-between",
    },
    "App": {
        "borderWidth": 10,
        "borderStyle": "solid",
        "borderColor": "#AAA",

        "flexDirection": "column",

        padding: 50,
    },
};

let transformedCssStyles = getTransformedCssStyles();
Object.keys(transformedCssStyles).forEach(key => {
        if (!(key in rawStylesObject)) {
            rawStylesObject[key] = transformedCssStyles[key];
            console.log(`Added a style ${key}=${JSON.stringify(rawStylesObject[key])} to rawStylesObject`);
        } else {
            console.log(`warning: Style ${key} already exists in rawStylesObject`);
        }
    });

const styles = StyleSheet.create(rawStylesObject);

export default styles;