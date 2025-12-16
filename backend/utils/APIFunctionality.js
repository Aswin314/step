class APIFunctionality {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }
  search() {
    const keyword = this.querystr.keyword
      ? {
          Name: { $regex: this.querystr.keyword, $option: "i" },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const querycopy = { ...this.querystr };
    const removefields = ["keyword", "page", "limit"];
    removefields.forEach((key) => delete querycopy[key]);
    this.query = this.query.find(querycopy);
    return this;
  }
  pagination(resultpage) {
    const currentpage = Number(this.querystr.page) || 1;
    const skip = resultpage * (currentpage - 1);
    this.query = this.query.limit(resultpage).skip(skip);
    return this
  }
}
export default APIFunctionality;
