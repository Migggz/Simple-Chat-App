var moment = require('moment');

var createdAt = 1234;
var Date = moment(createdAt);

var ts = moment().valueOf(createdAt);

console.log(Date.format(''), ts)