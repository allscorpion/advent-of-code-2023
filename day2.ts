import fs from "fs";

const input = fs.readFileSync("./day2.input.txt", {
  encoding: "utf8",
  flag: "r",
});

const games = input.split("\n");

const gameDetails = games.map((game) => {
  const gameParts = game.split(":");
  const gameId = gameParts[0].match(/[0-9]+/)?.[0];
  const subsetsOfCubes = gameParts[1].split(";").map((x) =>
    x
      .trim()
      .split(",")
      .reduce<Record<string, number>>((acc, item) => {
        const cubeParts = item.split(" ").filter(Boolean);
        const cubeColor = cubeParts[1];
        const cubeAmount = +cubeParts[0];

        if (!acc[cubeColor]) {
          acc[cubeColor] = 0;
        }

        acc[cubeColor] += cubeAmount;
        return acc;
      }, {})
  );
  const lowestPossibleSubset = subsetsOfCubes.reduce<Record<string, number>>(
    (acc, item) => {
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          const cubeAmount = +item[key];
          if (!acc[key]) {
            acc[key] = 0;
          }

          acc[key] = Math.max(acc[key], cubeAmount);
        }
      }
      return acc;
    },
    {}
  );

  return {
    id: parseInt(gameId ?? "", 10),
    subsetsOfCubes,
    lowestPossibleSubset,
  };
});

const part1 = gameDetails
  .filter((gameDetail) => {
    const disallowSubSetOfCubes = gameDetail.subsetsOfCubes.some(
      (subsetOfCube) => {
        return (
          subsetOfCube.red > 12 ||
          subsetOfCube.green > 13 ||
          subsetOfCube.blue > 14
        );
      }
    );
    return !disallowSubSetOfCubes;
  })
  .reduce((acc, item) => {
    return (acc += item.id);
  }, 0);

console.log({ part1 });

const part2 = gameDetails
  .map((gameDetail) => {
    const cubesMultiplied = Object.values(
      gameDetail.lowestPossibleSubset
    ).reduce((a, b) => a * b, 1);
    return cubesMultiplied;
  })
  .reduce((acc, num) => {
    return acc + num;
  }, 0);

console.log({ part2 });
