import transform from 'css-to-react-native';

const cssStyles = {
    "root": {
        "display": "flex",
        "margin": "10px",

        "flex-direction": "column",
        "justify-content": "center",
        "align-content": "center",
        "align-items": "center",
    },
    "Dashboard": {
        "display": "flex",

        "flex-direction": "row",
        "justify-content": "space-between",
        "align-content": "center",
        "align-items": "center",
    },
    "App-title": {
        "align-self": "flex-start",
        // "display": "block",
        "padding": "5px",
        "min-height": "50px",
        "min-width": "200px",
        "width": "100%",

        "border": "3px solid #eebb55",
        "border-radius": "7",
        "background": "#777777",

        "display": "flex",
        "align-content": "center",
        "align-items": "center",
    },
    "App-container": {
        "margin": "5px",
        // "padding": "5px",

        "min-width": "70px",
        "min-height": "70px",
        "border": "3px solid #777777",
        "border-radius": "3",
        "background": "#999999",

        "display": "flex",
        "flex-direction": "column",
        "justify-content": "center",
        "align-content": "center",
        "align-items": "center",
    },
    "ButtonPanel": {
        "border": "1px solid #eebb55",
        "border-radius": "7",
        "background": "#dddddd",

        "display": "flex",

        "flex-direction": "row",
        "justify-content": "space-between",
    },
    "GameButton": {
        "min-width": "64px !important",
        "min-height": "64px !important",
    },
    "bg-colour-white": {
        "background-color": "white",
    },
    "bg-colour-black": {
        "background-color": "black",
    },
    "bg-colour-red": {
        "background-color": "red",
    },
    "bg-colour-green": {
        "background-color": "green",
    },
    "bg-colour-blue": {
        "background-color": "blue",
    },
    "bg-colour-yellow": {
        "background-color": "yellow",
    }
};

const SHORTHAND_BLACKLIST = ["borderRadius"];

const getTransformedCssStyles = () => Object.keys(cssStyles).reduce((prev, key) => {
    let styleObject = cssStyles[key];
    prev[key] = transform(Object.keys(styleObject).map(styleKey => [styleKey, styleObject[styleKey]]), SHORTHAND_BLACKLIST);
    return prev;
}, {});

export {cssStyles, getTransformedCssStyles};