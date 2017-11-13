import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5ECFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    "#root": {
        "display": "flex",
        "margin": "10px",

        "flex-direction": "column",
        "justify-content": "center",
        "align-content": "center",
        "align-items": "center",
    },
    ".App": {
        "border": "1px solid #eebb55",
        "border-radius": "7pt",
        "background": "#dddddd",

        "display": "flex",

        "flex-direction": "column",
        "justify-content": "space-between",
    },
    ".Dashboard": {
        "display": "flex",

        "flex-direction": "row",
        "justify-content": "space-around",
        "align-content": "center",
        "align-items": "center",
    },
    ".App-title": {
        "align-self": "flex-start",
        "display": "block",
        "padding": "5px",
        "min-height": "50px",
        "min-width": "500px",
        "width": "100%",
        "font-size": "3em",

        "border": "3px solid #eebb55",
        "border-radius": "7pt",
        "background": "#777777",
        "color": "white",
    },
    ".App-container": {
        "margin": "20px",
        "padding": "20px",

        "font-size": "2em",

        "min-width": "100px",
        "min-height": "100px",
        "border": "3px solid #777777",
        "border-radius": "15pt",
        "background": "#999999",
        "color": "#224466",

        "display": "flex",
        "flex-direction": "column",
        "justify-content": "center",
        "align-content": "center",
        "align-items": "center",
    },
    ".ButtonPanel": {
        "border": "1px solid #eebb55",
        "border-radius": "7pt",
        "background": "#dddddd",

        "display": "flex",

        "flex-direction": "row",
        "justify-content": "space-between",
    },
    ".GameButton": {
        "min-width": "64px !important",
        "min-height": "64px !important",
    },
    ".bg-colour-white": {
        "background-color": "white",
    },
    ".bg-colour-black": {
        "background-color": "black",
    },
    ".bg-colour-red": {
        "background-color": "red",
    },
    ".bg-colour-green": {
        "background-color": "green",
    },
    ".bg-colour-blue": {
        "background-color": "blue",
    },
    ".bg-colour-yellow": {
        "background-color": "yellow",
    }
});

export default styles;