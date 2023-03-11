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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(time.seconds));
};
player.on('timeupdate', throttle(onPlay, 1000));

const savedTime = localStorage.getItem(STORAGE_KEY);
if (savedTime) {
  player
    .setCurrentTime(savedTime)
    .then(function (seconds) {})
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          break;

        default:
          break;
      }
    });
}
