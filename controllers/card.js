const cardModel = require('../models/card');


exports.create = async (req, res) => {
  try {
    let data  = await cardModel.create(req.body)
    res.json(data);
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error,
    });
  }
};

exports.get = (req, res) => {
  cardModel.find()
    .exec((err, cardModels) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(cardModels);
    });
};

exports.remove = (req, res) => {
  cardModel.deleteOne({_id: req.params.id}, function (err) {
    if (err) {
      res.status(500).json({status: "failed"});
      return 
    }
    res.json({status: "success"});
  });
  
};

