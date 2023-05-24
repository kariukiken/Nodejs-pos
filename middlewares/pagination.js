// middleware/pagination.js

module.exports = function paginateResults(page, limit, totalResults) {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};

  if (endIndex < totalResults) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  results.total = totalResults;
  results.results = results.slice(startIndex, endIndex);

  return results;
};


