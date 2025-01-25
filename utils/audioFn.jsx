import { Audio } from "expo-av";

export const playAudio = async (
  uri,
  sound,
  setIsPlaying,
  setPlayingMessageId,
  setPlaybackPosition,
  playbackPosition
) => {
  if (sound) {
    await sound.playFromPositionAsync(playbackPosition * 1000);
    setIsPlaying(true);
  } else {
    const { sound: newSound } = await Audio.Sound.createAsync({ uri });
    setSound(newSound);
    await newSound.playFromPositionAsync(playbackPosition * 1000);
    setIsPlaying(true);

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.isPlaying) {
        setPlaybackPosition(status.positionMillis / 1000);
      } else {
        setIsPlaying(false);
      }

      if (status.didJustFinish) {
        setIsPlaying(false);
        setPlayingMessageId(null);
        setPlaybackPosition(0);
        newSound.unloadAsync();
        setSound(null);
      }
    });
  }
};

export const pauseAudio = async (sound, setPlaybackPosition) => {
  if (sound) {
    await sound.pauseAsync();
    setIsPlaying(false);
    const status = await sound.getStatusAsync();
    setPlaybackPosition(status.positionMillis / 1000);
  }
};
