# expo_android_rotating_video
The problem I had was expo-av video was not rotating to landscape on Android with native controls and fullscreen mode.
I researched and researched and found [this solution.](https://github.com/expo/expo/issues/6864)

This solution suggested above did NOT work at first.
However, after a short session of debugging, I realized it did not work because now in 2024,
Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT and
Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS comes as undefined from Video class.
Either these static class methods do not exist or they were replaced with something else.

I traced the fullscreenUpdate event and noticed that it fires twice after entering fullscreen.
Once it comes as 0 and second time as 1 when video enters full screen mode.
And when the video is taken out of fullscreen mode the event fires and this time ( again twice ) comes as 2 and 3.
So I modified the switch statement after the trace as...
```js
const onFullscreenUpdate = async ({ fullscreenUpdate }) => {
    switch (fullscreenUpdate) {
      case 0 || 1:
        // should have been Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT instead of 0 || 1
        // but Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT comes undefined
        // console.log("Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:");
        await ScreenOrientation.unlockAsync(); // only on Android required
        break;
      case 2 || 3:
        // should have been Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS: instead of 2 || 3
        // but Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS: comes undefined
        // console.log("Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:");
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        ); // only on Android required
        break;
    }
  };
```
