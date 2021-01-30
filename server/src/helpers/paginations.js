const PAGE_LIMIT = 12;
const PAGE_START = 1; // start of the page limit

module.exports = function paginationOptions(options, limit = PAGE_LIMIT, offset = PAGE_START) {
  limit = parseInt(limit.toString());
  offset = parseInt(offset.toString());

  if (limit <= 0) {
    limit = PAGE_LIMIT;
  }

  if (offset <= 0) {
    offset = PAGE_START;
  }

  options.page = PAGE_START;
  options.paginate = PAGE_LIMIT;

  if (offset) {
    options.page = offset;
  }

  if (limit) {
    options.paginate = limit;
  }

  return options;
};
