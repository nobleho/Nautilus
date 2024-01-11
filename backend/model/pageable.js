class Pageable {
    constructor(
        isPaging,
        page,
        size
    ) {
        this.isPaging = isPaging;
        this.page = page;
        this.size = size;
    }
}

module.exports = Pageable