// Import models
const Sauce = require("../models/sauce");
// Controller
exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }, console.log(req.body, "console.log"))
    .then((sauce) => {
      switch (req.body.like) {
        // if user like a sauce
        case 1:
          sauce
            .updateOne(
              { _id: req.body.id },
              {
                $inc: { likes: 1 },
                $push: { usersLiked: req.body.userId },
              }
            )
            .then(() =>
              res.status(201).json({ message: "Sauce have been liked" })
            )
            .catch((error) => res.status(400).json({ error }));
          break;

        // if user remove a like or a dislike ************************ Loading spin require reload /!\
        case 0:
          // if the sauce was liked
          if (sauce.usersLiked.find(userId == req.body.userId)) {
            Sauce.updateOne(
              { _id: req.body },
              {
                $inc: { likes: -1 },
                $pull: { usersLiked: req.body.userId },
              }
            )
              .then(() =>
                res.status(201).json({ message: "Like has been updated" })
              )
              .catch((error) => res.status(404).json({ error }));
            break;

            //if the sauce was disliked
            if (sauce.usersDisliked.find(userId == req.body.userId)) {
              Sauce.updateOne(
                { _id: req.body },
                {
                  $inc: { dislikes: -1 },
                  $pull: { usersDislikes: req.body.userId },
                }
              )
                .then(() =>
                  res.status(201).json({ message: "Like has been updated" })
                )
                .catch((error) => res.status(404).json({ error }));
              break;
            }
          }

        // if the user dislike a sauce ******************************* -1 isn't a number
        case -1:
          sauce
            .updateOne(
              { _id: req.body.id },
              {
                $inc: { dislikes: 1 },
                $push: { userDislikes: req.body.userId },
              }
            )
            .then(() =>
              res.status(201).json({ message: "dislike has been saved" })
            )
            .catch((error) => res.status(404).json({ error }));
          break;

        // default case
        default:
          return res.status(500).json({ error });
      }
    })
    .catch((error) => res.status(404).json({ error }));
};

// .then((p) => {
//   // if userId isn't pushed in usersLiked, and the user select the like button
//   if (!p.usersLiked.includes(req.body.userId) && req.body.likes === 1) {
//     // update p in database
//     Sauce.updateOne(
//       { _id: req.params.id },
//       {
//         $inc: { likes: 1 },
//         $push: { usersLiked: req.body.userId },
//         _id: req.params.id,
//       }
//     )
//       .then(() => res.status(201).json({ message: "like +1" }))
//       .catch((error) => res.status(400).json({ error }));
//   }
//   // if userId is already pushed in usersLiked and remove is like
//   if (p.usersLiked.includes(req.body.userId) && req.body.likes === 0) {
//     // update p in database
//     Sauce.updateOne(
//       { _id: req.params.id },
//       {
//         $inc: { likes: -1 },
//         $pull: { usersLiked: req.body.userId },
//         _id: req.params.id,
//       }
//     )
//       .then(() => res.status(201).json({ message: "like 0" }))
//       .catch((error) => res.status(400).json({ error }));
//   }
//   // if userId isn't pushed in usersLiked, and the user select the dislike button
//   if (!p.usersDisliked.includes(req.body.userId) && req.body.likes === -1) {
//     // update p in database
//     Sauce.updateOne(
//       { _id: req.params.id },
//       {
//         $inc: { disLikes: 1 },
//         $push: { usersDisliked: req.body.userId },
//         _id: req.params.id,
//       }
//     )
//       .then(() => res.status(201).json({ message: "disLikes +1" }))
//       .catch((error) => res.status(400).json({ error }));
//   }
//   // if userId is already pushed in usersDisliked and remove is disLike
//   if (p.usersDisliked.includes(req.body.userId) && req.body.likes === 0) {
//     // update p in database
//     Sauce.updateOne(
//       { _id: req.params.id },
//       {
//         $inc: { disLikes: -1 },
//         $pull: { usersDisliked: req.body.userId },
//         _id: req.params.id,
//       }
//     )
//       .then(() => res.status(201).json({ message: "disLike 0" }))
//       .catch((error) => res.status(400).json({ error }));
//   }
// })
