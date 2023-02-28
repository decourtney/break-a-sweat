// const APIService = require('./utils/apiService');

// const apiService = new APIService();

const apitest = async () => {
    const data = await apiService.getRandomExercises();
    console.log(data);
}

apitest();