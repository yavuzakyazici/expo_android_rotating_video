import * as ScreenOrientation from "expo-screen-orientation";

  const onFullscreenUpdate = async ({ fullscreenUpdate }) => {
    switch (fullscreenUpdate) {
      case (0, 1):
        await ScreenOrientation.unlockAsync(); // only on Android required
        break;
      case (2, 3):
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        ); // only on Android required
        break;
    }
  };
  <Video
    ref={video}
    source={{
      uri: www.example.com,
    }}
    useNativeControls
    resizeMode={ResizeMode.CONTAIN}
    isLooping
    onFullscreenUpdate={onFullscreenUpdate}
  />
