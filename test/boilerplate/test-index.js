window.Should = require('should');
require('@mparticle/web-sdk');

window.mParticle.addForwarder = function(forwarder) {
    window.mParticle.forwarder = new forwarder.constructor();
};

require('../../dist/BrazeKit.common.js');
require('../mockhttprequest');
require('../tests.js');
