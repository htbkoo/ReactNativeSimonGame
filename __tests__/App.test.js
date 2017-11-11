import React from 'react';
import chai from "chai"
import App from '../App';

import renderer from 'react-test-renderer';

describe('App.test.js', function () {
    it('renders without crashing', () => {
        const rendered = renderer.create(<App/>).toJSON();
        chai.expect(rendered).to.equal(true);
    });
});
