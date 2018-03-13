## Installation
1. Install package via npm: `npm install -save ...niox-vero`

## Android

1. Put following code to `android\app\src\main\AndroidManifest.xml`:

<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />

2. Add to `android\settings.gradle`:

include ':niox-vero'
project(':niox-vero').projectDir = new File(rootProject.projectDir, '../node_modules/niox-vero/android')

3. Add to `android\app\src\main\java\...\MainApplication.java`:

import com.nvpsogtware.RCTNioxVero.RCTNioxVeroPackage;
...
new RCTNioxVeroPackage()

4. Add to `android\app\build.gradle`:
dependencies {
    compile project(':niox-vero')
