import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
console.log(player);

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const onPlay = function (time) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(time.seconds)
  );
};
player.on('timeupdate', throttle(onPlay, 1000));

const savedTime = localStorage.getItem(STORAGE_KEY);

player
  .setCurrentTime(savedTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
