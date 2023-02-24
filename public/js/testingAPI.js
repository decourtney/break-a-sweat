const key = 'MvLMtCjpe/b1xp1TUuzzjA==ylsHdsCXD1Kvg7ZC'

let muscle = 'biceps'

// Users can save exercises. They are joined by a junction table right now. 
// Will need to perform a local lookup to see if the exercise already exists before making an api call for it.
'https://api.api-ninjas.com/v1/exercises?'  // search for exercises by name, type, muscle, difficulty, offset

// Don't need to save any of this to the DB. Leave to api calls when performing calculations
'https://api.api-ninjas.com/v1/nutrition?query=' // search for a foods nutritional facts


// Don't need to save any of this to the DB. Leave to api calls when performing calculations
'https://api.api-ninjas.com/v1/caloriesburned?' // query calorie burn by activity, weight, duration

fetch('https://api.api-ninjas.com/v1/exercises?type=cardio', {
  method: 'GET',
  headers: {
    'X-Api-Key': key,
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));