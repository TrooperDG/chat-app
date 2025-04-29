const playSeenSound = () => {
  const seenSound = new Audio("/sounds/message-seen.mp3");
  seenSound.volume = 0.3;
  seenSound.play();
};
const playNotificationSound = () => {
  const notificationSound = new Audio("/sounds/droplet.mp3");
  notificationSound.volume = 0.3;
  notificationSound.play();
};
const playSendSound = () => {
  const sendSound = new Audio("/sounds/message-send.wav");
  sendSound.volume = 0.3;
  sendSound.play();
};

export { playSeenSound, playNotificationSound, playSendSound };
