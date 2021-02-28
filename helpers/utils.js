const { RECORD_LIMIT } = require("./constants");

const utils = {};

utils.getSkipLimit = (page, recordsPerPage) => {
    let skip = 0;
    const limit = recordsPerPage || RECORD_LIMIT; // for paginate records
    if (page) {
        skip = (page - 1) * limit;
    }
    return { limit, skip };
}

utils.getImagePath = (atchId, location) => {
    return `IF(${atchId} IS NULL, '', CONCAT('${process.env.IMAGE_URL}', ${location}))`;
}

module.exports = utils;