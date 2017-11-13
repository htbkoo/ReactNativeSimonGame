import {cssStyles, getTransformedCssStyles} from "../styles/cssStyles";
import chai from "chai";

describe("cssStyles", function () {
    it("should transform cssStyles", function () {
        //    given
        //    when
        let transformedCssStyles = getTransformedCssStyles();

        //    then
        chai.expect(transformedCssStyles).to.deep.equal(
            {
                "App-container": {
                    "alignContent": "center",
                    "alignItems": "center",
                    "backgroundColor": "#999999",
                    "borderColor": "#777777",
                    "borderStyle": "solid",
                    "borderWidth": 3,
                    "color": "#224466",
                    "display": "flex",
                    "flexDirection": "column",
                    "fontSize": "2em",
                    "justifyContent": "center",
                    "marginBottom": 20,
                    "marginLeft": 20,
                    "marginRight": 20,
                    "marginTop": 20,
                    "minHeight": 100,
                    "minWidth": 100,
                    "paddingBottom": 20,
                    "paddingLeft": 20,
                    "paddingRight": 20,
                    "paddingTop": 20,
                },
                "App-title": {
                    "alignSelf": "flex-start",
                    "backgroundColor": "#777777",
                    "borderColor": "#eebb55",
                    "borderStyle": "solid",
                    "borderWidth": 3,
                    "color": "white",
                    "fontSize": "3em",
                    "minHeight": 50,
                    "minWidth": 500,
                    "paddingBottom": 5,
                    "paddingLeft": 5,
                    "paddingRight": 5,
                    "paddingTop": 5,
                    "width": "100%",
                },
                "ButtonPanel": {
                    "backgroundColor": "#dddddd",
                    "borderColor": "#eebb55",
                    "borderStyle": "solid",
                    "borderWidth": 1,
                    "display": "flex",
                    "flexDirection": "row",
                    "justifyContent": "space-between",
                },
                "Dashboard": {
                    "alignContent": "center",
                    "alignItems": "center",
                    "display": "flex",
                    "flexDirection": "row",
                    "justifyContent": "space-around",
                },
                "GameButton": {
                    "minHeight": "64px !important",
                    "minWidth": "64px !important",
                },
                "bg-colour-black": {
                    "backgroundColor": "black",
                },
                "bg-colour-blue": {
                    "backgroundColor": "blue",
                },
                "bg-colour-green": {
                    "backgroundColor": "green",
                },
                "bg-colour-red": {
                    "backgroundColor": "red",
                },
                "bg-colour-white": {
                    "backgroundColor": "white",
                },
                "bg-colour-yellow": {
                    "backgroundColor": "yellow",
                },
                "root": {
                    "alignContent": "center",
                    "alignItems": "center",
                    "display": "flex",
                    "flexDirection": "column",
                    "justifyContent": "center",
                    "marginBottom": 10,
                    "marginLeft": 10,
                    "marginRight": 10,
                    "marginTop": 10,
                },
            }
        );
    });
});
