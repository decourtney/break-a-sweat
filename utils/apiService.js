const key = 'MvLMtCjpe/b1xp1TUuzzjA==ylsHdsCXD1Kvg7ZC';
const url = `https://api.api-ninjas.com/v1/exercises?`;

const getExercises = async (param, val, offset) => {
  const request = `${param}=${val}&offset=${offset}`;
  // Offset appears to +/- correctly
  // But results are not changing. I had a typo there so still needs
  // Testing to figure out wtf is going on.
  
  console.log(offset);
  // console.log('This is getExercises ' + request);
  return await callAPI(request);
}

const getRandomExercises = async () => {

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const randomIndex = Math.floor(Math.random() * 26);
  const randomLetter = alphabet[randomIndex];
  const randomRequest = `name=${randomLetter}`;

  // console.log(`This is the random request ` + request)
  return await callAPI(randomRequest);
}

const callAPI = async (req) => {
  try {
    console.log('This is the api url ' + url + req)
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

module.exports = { getRandomExercises, getExercises };