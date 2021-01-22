const initRoutes = (app) => {
    app.use("/",(req,res)=> {
        res.send("Welcome to Power-Audit")
    })
}

module.exports = initRoutes;