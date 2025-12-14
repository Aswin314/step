export default (myfunc) => (req, res, next) => {
  Promise.resolve(myfunc(req, res, next)).catch(next);
};
