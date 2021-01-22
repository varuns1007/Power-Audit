const homepageRouter = require("./homepageRouter");

const initRoutes = (app) => {
  app.use("/", homepageRouter);
};

module.exports = initRoutes;
