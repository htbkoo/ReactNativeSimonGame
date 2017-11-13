import React from 'react';
import {mount} from 'enzyme';
import jsdom from 'jsdom';
import chai from "chai"
import renderer from 'react-test-renderer';

import sinon from 'sinon';
import sinonTest from 'sinon-test';
sinon.test = sinonTest.configureTest(sinon);
sinon.testCase = sinonTest.configureTestCase(sinon);

import App from '../App';
import Game from '../build_a_simon_game/src/game';

describe("SimonGame (Full render test) - FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Advanced Project", function () {
        describe("SimonGame", function () {
            describe("<App/>", function () {
                it('renders App without crashing', sinon.test(function (done) {
                    // Given
                    this.stub(Game.prototype, "status").callsFake(() => {
                        return {
                            "isIdle": () => {
                                return false;
                            },
                            "isPlaying": () => {
                                return false;
                            },
                            "isDemoing": () => {
                                return false;
                            }
                        }
                    });

                    // When
                    // Then
                    setUpJsdomAndAssert(() => {
                        mount(<App/>);
                    }, done)
                }));
            });
        });
    });

    function setUpJsdomAndAssert(assertion, done) {
        jsdom.env({
            file: require.resolve("../public/index.html"),
            features: {
                FetchExternalResources: ["script"],
                ProcessExternalResources: ["script"],
                SkipExternalResources: false
            },
            created: function (err, window) {
                global.window = window;
                global.document = window.document;
                Object.keys(document.defaultView).forEach((property) => {
                    if (typeof global[property] === 'undefined') {
                        global[property] = document.defaultView[property];
                    }
                });

                global.navigator = {
                    userAgent: 'node.js'
                };
            },
            done: (err, window) => {
                assertion(err, window);
                done();
            }
        });
    }


    describe('App.test.js from React Native', function () {
        it('renders without crashing', () => {
            const rendered = renderer.create(<App/>).toJSON();
            chai.expect(rendered).to.equal(true);
        });
    });
});
