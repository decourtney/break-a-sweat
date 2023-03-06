import('./analytics.js')
  .then(module => {
    // const canvas = document.getElementById('chart1');
    // const ctx = canvas.getContext('2d');

    const userData = [
      { name: "John", age: 25, weight: 120, height: 69, bmi: 17.7, exerciseDuration: 30, weightsUsed: [10, 15, 20] },
      { name: "Francisco", age: 28, weight: 190, height: 75, bmi: 23.7, exerciseDuration: 45, weightsUsed: [15, 20, 25] },
      { name: "Christina", age: 40, weight: 140, height: 60, bmi: 27.3, exerciseDuration: 60, weightsUsed: [20, 25, 30] },
      { name: "Alessandro", age: 32, weight: 200, height: 70, bmi: 28.7, exerciseDuration: 45, weightsUsed: [25, 30, 35] },
      { name: "Josiah", age: 18, weight: 130, height: 64, bmi: 22.3, exerciseDuration: 30, weightsUsed: [30, 35, 40] },
      { name: "Josh", age: 18, weight: 240, height: 70, bmi: 30.0, exerciseDuration: 30, weightsUsed: [30, 35, 40] }
    ];

    const currentUserData = [
      { name: "Irimar", age: 22, weight: 134, height: 61, bmi: 25.3, exerciseDuration: 30, weightsUsed: [10, 15, 20] }
    ]
   

    const chart1 = new Chart(document.getElementById("chart1").getContext("2d"), {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Your Age and Weight',
          data: currentUserData.map(user => ({ x: user.age, y: user.weight, r: user.bmi })),
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: [{
            type: 'linear',
            position: 'bottom',
            scaleLabel: {
              display: true,
              labelString: 'Age'
            }
          }],
          y: [{
            type: 'linear',
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: 'Weight (lb)'
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const user = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              return `BMI: ${user.r}`;
            }
          }
        }
      }
    });

    

    const chart2 = new Chart(document.getElementById("chart2").getContext("2d"), {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Your BMI',
          data: currentUserData.map(user => ({ x: user.age, y: user.bmi })),
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: [{
            type: 'linear',
            position: 'bottom',
            scaleLabel: {
              display: true,
              labelString: 'Age'
            }
          }],
          y: [{
            type: 'linear',
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: 'Weight (lb)'
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const user = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              return `BMI: ${user.r}`;
            }
          }
        }
      }
    });

    const bmiCategories = {
      underweight: 0,
      normal: 0,
      overweight: 0,
      obese: 0
    };
    
    userData.forEach(user => {
      const bmi = user.bmi;
      if (bmi < 18.5) {
        bmiCategories.underweight++;
      } else if (bmi >= 18.5 && bmi < 25) {
        bmiCategories.normal++;
      } else if (bmi >= 25 && bmi < 30) {
        bmiCategories.overweight++;
      } else if (bmi >= 30) {
        bmiCategories.obese++;
      }
    });
    
    const chart4 = new Chart(document.getElementById("chart4").getContext("2d"), {
      type: 'pie',
      data: {
        labels: ['Underweight: <18.5', 'Normal: 18.5-24.9', 'Overweight: 25-29.9', 'Obese: 30+'],
        datasets: [{
          data: [
            bmiCategories.underweight,
            bmiCategories.normal,
            bmiCategories.overweight,
            bmiCategories.obese
          ],
          backgroundColor: ['red', 'green', 'yellow', 'orange']
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Distribution of BMI Categories'
        }
      }
    });
    const chart3 = new Chart(document.getElementById("chart3").getContext("2d"), {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'All Users Ages and Weights',
          data: userData.map(user => ({ x: user.age, y: user.weight, r: user.bmi })),
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: [{
            type: 'linear',
            position: 'bottom',
            scaleLabel: {
              display: true,
              labelString: 'Age'
            }
          }],
          y: [{
            type: 'linear',
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: 'Weight (lb)'
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const user = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              return `BMI: ${user.r}`;
            }
          }
        }
      }
    });

  })
  
  .catch(err => {
    console.log(err);
  });