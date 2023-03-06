import('./analytics.js')
  .then(module => {
    // const canvas = document.getElementById('chart1');
    // const ctx = canvas.getContext('2d');

    const userData = [
      { age: 25, weight: 70, height: 170, bmi: 23, exerciseDuration: 30, weightsUsed: [10, 15, 20] },
      { age: 30, weight: 75, height: 175, bmi: 25, exerciseDuration: 45, weightsUsed: [15, 20, 25] },
      { age: 35, weight: 80, height: 180, bmi: 27, exerciseDuration: 60, weightsUsed: [20, 25, 30] },
      { age: 40, weight: 85, height: 185, bmi: 29, exerciseDuration: 45, weightsUsed: [25, 30, 35] },
      { age: 45, weight: 90, height: 190, bmi: 31, exerciseDuration: 30, weightsUsed: [30, 35, 40] }
    ];

    const chart1 = new Chart(document.getElementById("chart1").getContext("2d"), {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'User Data',
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
              labelString: 'Weight (kg)'
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
      type: 'line',
      data: {
        labels: userData.map(user => user.age),
        datasets: [{
          label: 'Exercise Duration',
          data: userData.map(user => user.exerciseDuration),
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            scaleLabel: {
              display: true,
              labelString: 'Age'
            }
          }],
          yAxes: [{
            type: 'linear',
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: 'Exercise Duration (minutes)'
            }
          }]
        }
      }
    });

    const chart3 = new Chart(document.getElementById("chart3").getContext("2d"), {
      type: 'bar',
      data: {
        labels: userData.map(user => user.age),
        datasets: [{
          label: 'Exercise Duration',
          data: userData.map(user => user.exerciseDuration),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Age'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: 'Exercise Duration (minutes)'
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const user = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              return `Duration: ${user} minutes`;
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
        labels: ['Underweight', 'Normal', 'Overweight', 'Obese'],
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

  })
  .catch(err => {
    console.log(err);
  });



