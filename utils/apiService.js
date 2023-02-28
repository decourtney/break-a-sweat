const key = 'MvLMtCjpe/b1xp1TUuzzjA==ylsHdsCXD1Kvg7ZC';
const url = `https://api.api-ninjas.com/v1/exercises?`;

const getExercises = async (param, val, offset) => {
  if (!offset) {
    offset = 0;
  }

  const request = `${param}=${val}&offest=${offset}`;
  console.log(request);
  
  return await callAPI(request);
}

const getRandomExercises = async () => {

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const randomIndex = Math.floor(Math.random() * 26);
  const randomLetter = alphabet[randomIndex];
  const request = `name=${randomLetter}`;

  // console.log(request)
  return await callAPI(request);
}

const callAPI = async (req) => {
  try {
    const response = await fetch(url + req, {
      method: 'GET',
      headers: {
        'X-Api-Key': key,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = getRandomExercises, getExercises;