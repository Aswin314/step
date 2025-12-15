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
  }
}
export default APIFunctionality;
