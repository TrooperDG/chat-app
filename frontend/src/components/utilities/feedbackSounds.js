const playSeenSound = () => {
  const seenSound = new Audio("/sounds/message-seen.mp3");
  seenSound.volume = 0.3;
  seenSound.play();
  console.log(":seen");
};
const playNotificationSound = () => {
  const notificationSound = new Audio("/sounds/droplet.mp3");
  notificationSound.volume = 0.3;
  notificationSound.play();
  console.log(":noti");
};
const playSendSound = () => {
  const sendSound = new Audio("/sounds/message-send.wav");
  sendSound.volume = 0.3;
  sendSound.play();
  console.log(":send");
};
const playReceiveSound = () => {
  const sendSound = new Audio("/sounds/message-received.mp3");
  sendSound.volume = 0.2;
  sendSound.play();
  console.log(":receive");
};

export {
  playSeenSound,
  playNotificationSound,
  playSendSound,
  playReceiveSound,
};
