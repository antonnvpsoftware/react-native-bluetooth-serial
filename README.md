## Installation
1. Install package via npm: `npm install -save ...niox-vero`

## Android

1. Put following code to `android\app\src\main\AndroidManifest.xml`:

<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
...
<uses-sdk
    android:minSdkVersion="19"
    android:targetSdkVersion="26" />

2. Add to `android\settings.gradle`:

include ':niox-vero'
project(':niox-vero').projectDir = new File(rootProject.projectDir, '../node_modules/niox-vero/android')

3. Add to `android\app\src\main\java\...\MainApplication.java`:

import com.nvpsogtware.RCTNioxVero.RCTNioxVeroPackage;
...
new RCTNioxVeroPackage()

4. Add to `android\app\build.gradle`:

android {
  compileSdkVersion 26
  buildToolsVersion "26.0.2"

  defaultConfig {
    minSdkVersion 19
    targetSdkVersion 26

...
dependencies {
    compile project(':niox-vero')

5. Set `android\gradle\wrapper\gradle-wrapper.properties`:
distributionUrl=https\://services.gradle.org/distributions/gradle-4.1-all.zip

6. Add to `android\build.gradle` google() to `repositories`
