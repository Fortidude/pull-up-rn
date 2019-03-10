package com.pullup;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.imagepicker.ImagePickerPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.bluroverly.SajjadBlurOverlayPackage;
import com.bugsnag.BugsnagReactNative;
import com.henninghall.date_picker.DatePickerPackage;
import com.reactlibrary.RNReactNativeHapticFeedbackPackage;
import com.horcrux.svg.SvgPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ImagePickerPackage(),
            new ReactNativePushNotificationPackage(),
            new KCKeepAwakePackage(),
            new BlurViewPackage(),
            new SajjadBlurOverlayPackage(),
            BugsnagReactNative.getPackage(),
            new DatePickerPackage(),
            new RNReactNativeHapticFeedbackPackage(),
            new SvgPackage(),
            new LinearGradientPackage(),
            new RNI18nPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
