const wallpapersFile = {
  day: ["wallpaper-day-1.mp4", "wallpaper-day-2.mp4", "wallpaper-day-3.mp4"],
  night: ["wallpaper-night-1.mp4"],
};
const hoursToIs = {
  day: 6,
  night: 18,
};
const changeWallpaperForCategoryInSeconds = 5;

const randInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
};

function setWallpaper() {
  console.log("set wallpaper");
  const currentDate = new Date();
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();

  if (currentHours >= hoursToIs.day && currentHours < hoursToIs.night) {
    const randomDayWallpaper = `./wallpapers/${
      wallpapersFile.day[randInt(0, wallpapersFile.day.length)]
    }`;
    const changeWallpaperForTimeInSeconds =
      hoursToIs.night * 3600 -
      (currentHours * 3600 + currentMinutes * 60 + currentSeconds);

    if (changeWallpaperForCategoryInSeconds < changeWallpaperForTimeInSeconds) {
      setTimeout(
        () => setWallpaper(),
        changeWallpaperForCategoryInSeconds * 1000
      );
    } else {
      setTimeout(() => setWallpaper(), changeWallpaperForTimeInSeconds * 1000);
    }

    document.getElementById("current-wallpaper").src = randomDayWallpaper;
  } else if (currentHours >= hoursToIs.night && currentHours > hoursToIs.day) {
    const randomNightWallpaper = `./wallpapers/${
      wallpapersFile.night[randInt(0, wallpapersFile.night.length)]
    }`;
    const changeWallpaperForTimeInSeconds =
      currentHours * 3600 +
      currentMinutes * 60 +
      currentSeconds -
      hoursToIs.day * 3600;

    if (changeWallpaperForCategoryInSeconds < changeWallpaperForTimeInSeconds) {
      setTimeout(
        () => setWallpaper(),
        changeWallpaperForCategoryInSeconds * 1000
      );
    } else {
      setTimeout(() => setWallpaper(), changeWallpaperForTimeInSeconds * 1000);
    }

    document.getElementById("current-wallpaper").src = randomNightWallpaper;
  } else {
    throw new Error("Verifique se seus horários estão em sequência.");
  }
}

setWallpaper();
