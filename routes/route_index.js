module.exports = app => {

    const citizen = require("../controllers/ctlr_citizen.js");
    var router = require("express").Router();
  
    /***
    START of routes declaration
    ***/

    router.post("/", citizen.create);
    router.get("/", citizen.getAll);
    router.get("/:id", citizen.getOne);
    router.get("/city/:city", citizen.getCity)
    router.put("/:id", citizen.updateOne);
    router.delete("/:id", citizen.delete);
  
    /***
    END of routes declaration
    ***/
  
    app.use('/api/ver1/', router);
    
};
  