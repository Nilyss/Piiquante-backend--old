// Import models
const Sauce = require("../models/sauce");
// Controller
exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      console.log("AVANT CONDITION X", sauce);
      console.log("REQUEST BODY", req.body);
      // If  the user didn't like an item and push like it
      if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
        console.log("REQ BODY LIKES RETURN", req.body);
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId },
          }
        )
          .then(() => res.status(201).json({ message: "The sauce was liked" }))
          .catch((error) => res.status(404).json({ error }));
      }

      // If the user want to remove his like
      if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
        console.log("REQ BODY LIKES RETURN", req.body);
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.body.userId },
          }
        )
          .then(() => res.status(201).json({ message: "The sauce was liked" }))
          .catch((error) => res.status(404).json({ error }));
      }

      // If  the user didn't dislike an item and push dislike it
      if (
        !sauce.usersDisliked.includes(req.body.userId) &&
        req.body.like === -1
      ) {
        console.log("REQ BODY LIKES RETURN", req.body);
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: 1 },
            $push: { usersDisliked: req.body.userId },
          }
        )
          .then(() =>
            res.status(201).json({ message: "The sauce was Disliked" })
          )
          .catch((error) => res.status(404).json({ error }));
      }
      // If the user want to remove his Dislike

      if (
        sauce.usersDisliked.includes(req.body.userId) &&
        req.body.like === 0
      ) {
        console.log("REQ BODY LIKES RETURN", req.body);
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: req.body.userId },
          }
        )
          .then(() =>
            res.status(201).json({ message: "The sauce was Undisliked" })
          )
          .catch((error) => res.status(404).json({ error }));
      }

      console.log("SORTIE CONDITION X", sauce);
    })
    .catch((error) => res.status(500).json({ error }));
};
