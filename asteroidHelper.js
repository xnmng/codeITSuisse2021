getMultiplier = (size) => {
  if (size >= 10) {
    return 2;
  }

  if (size <= 6) {
    return 1;
  }

  return 1.5;
};

module.exports.solveAsteroid = async (asteriods) => {
  // parse input
  let asteroidArr = [];

  let size = asteriods.charAt(0); // size of the asteroid (char)
  let start = 0; // sequence length

  for (let i = 1; i < asteriods.length; i++) {
    if (asteriods.charAt(i) == size) {
    } else {
      // end, create the object
      asteroidArr.push([size, start, i - 1]);
      // reset
      size = asteriods.charAt(i);
      start = i;
    }
  }

  // create the last object
  asteroidArr.push([size, start, asteriods.length - 1]);

  // calculate maximum possible score
  let max = 1;
  let index = 0;

  for (let i = 0; i < asteroidArr.length; i++) {
    // calculate score for the current asteroid
    let totalScore =
      (asteroidArr[i][2] - asteroidArr[i][1] + 1) *
      getMultiplier(asteroidArr[i][2] - asteroidArr[i][1] + 1);

    // pointers for left and right asteriod
    let left = i - 1;
    let right = i + 1;
    let isValid = true;

    // iteratively calculate additional score on left and right asteriods
    while (isValid) {
      // both pointers within bounds
      if (left >= 0 && right < asteroidArr.length) {
        if (asteroidArr[left][0] === asteroidArr[right][0]) {
          // add the sizes, calculate the score and add to total score
          const size =
            asteroidArr[left][2] -
            asteroidArr[left][1] +
            1 +
            (asteroidArr[right][2] - asteroidArr[right][1] + 1);

          totalScore += getMultiplier(size) * size;

          // move pointers
          left--;
          right++;
        } else {
          isValid = false;
        }
      } else {
        isValid = false;
      }
    }

    // update max score
    if (totalScore > max) {
      max = totalScore;
      index = i;
    }

    // reset total score
    totalScore = 0;
  }

  let response = {
    input: asteriods,
    score: max,
    origin: Math.floor((asteroidArr[index][2] + asteroidArr[index][1]) / 2),
  };

  console.log("answer", response);

  return response;
};
