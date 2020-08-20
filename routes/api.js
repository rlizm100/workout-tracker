const router = require("express").Router();
const db = require("../models")


// Creates a workout 
router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
  
});

// Update workout
router.put("/api/workouts/:id", (req, res) => {
  db.Workout.update(
    {
      _id: (req.params.id),
    },
    {
      $push: {
       exercises: req.body
      },
      $inc:{
        totalDuration:req.body.duration
      },
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

// Respond with json for all the workouts in an array.
router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
  .then((dbWorkouts) => {
    res.json(dbWorkouts)
  })
  .catch((err) => {
    res.json(err);
  });
});


// Get last workouts
router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({}).limit(7)
  .then((dbWorkouts) => {
    res.json(dbWorkouts)
  })
  .catch((err) => {
    res.json(err);
  });
});

module.exports = router;