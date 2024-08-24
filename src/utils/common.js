"use strict";

const _ = require("lodash");

exports.getReturnData = (fields = [], object) => {
  return _.pick(object, fields);
};
