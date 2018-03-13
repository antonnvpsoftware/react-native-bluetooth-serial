const ReactNative = require('react-native')
const { Buffer } = require('buffer')
const { TimerMixin } = require('react-timer-mixin')
const { NativeModules, DeviceEventEmitter } = ReactNative
const NioxVero = NativeModules.NioxVero

const Rijndael = require("rijndael-js");
const NIOX_VERO_Length = 0x80;
const error_to_alert = [9999, 22];
const iconv = require('iconv-lite');

const NioxVeroId = "E4:7F:B2:69:8B:6D";
const NioxVeroIdTest = "60:C5:47:92:8C:2F";

NioxVero.sync = (promise) => {
  Promise.all([
      NioxVero.isEnabled(),
      NioxVero.list()
    ])
    .then((values) => {
      const [ isEnabled, devices ] = values
      if (isEnabled) {
        for (var i = 0; i < devices.length; i++) {
          if (devices[i].id == NioxVeroIdTest) {
            NioxVero.connect(devices[i].id)
            .then((res) => {
              setTimeout(() => {
                lockMMI(() => {
                  setTimeout(() => {
                    latestMeasurement(() => {
                      counter = 0;
                      timer = setInterval(() => {
                        NioxVero.available()
                        .then((res) => {
                          if (res > 0) {
                            NioxVero.readFromDevice()
                            .then((data) => {
                              parseData(data);
                              NioxVero.clear();
                            })
                            .catch((error) => {
                              console.log("NioxVero.error " + error.message);
                            })
                          } else {
                            counter += 1;
                            if (counter >= 10) {
                              clearTimeout(timer);
                              unlockMMI(() => {
                                NioxVero.disconnect()
                                .then(() => {
                                  NioxVero.onDisconnect();
                                })
                                .catch((error) => {
                                  console.log("NioxVero.error " + error.message);
                                })
                              });
                              NioxVero.onFinish();
                            }
                          }
                        })
                      }, 500);
                    })
                  }, 1000);
                })
              }, 1000);
            })
            .catch((error) => {
              console.log("NioxVero.error " + error.message);
            })
          }
        }
        promise();
      } else {
        promise();
      }
    })
}

NioxVero.onData = (data) => {
  console.log("override NioxVero.onData");
}

NioxVero.onDisconnect = () => {
  console.log("override NioxVero.onDisconnect");
}

const lockMMI = (promise) => {
  promise();
}

const unlockMMI = (promise) => {
  promise();
}

const latestMeasurement = (promise) => {
  promise();
}

const parseData = (data, promise) => {
  console.log("parseData " + data);
}

/**
 * Listen for available events
 * @param  {String} eventName Name of event one of connectionSuccess, connectionLost, data, rawData
 * @param  {Function} handler Event handler
 */
NioxVero.on = (eventName, handler) => {
  DeviceEventEmitter.addListener(eventName, handler)
}

/**
 * Stop listening for event
 * @param  {String} eventName Name of event one of connectionSuccess, connectionLost, data, rawData
 * @param  {Function} handler Event handler
 */
NioxVero.removeListener = (eventName, handler) => {
  DeviceEventEmitter.removeListener(eventName, handler)
}

/**
 * Write data to device, you can pass string or buffer,
 * We must convert to base64 in RN there is no way to pass buffer directly
 * @param  {Buffer|String} data
 * @return {Promise<Boolean>}
 */
NioxVero.write = (data) => {
  if (typeof data === 'string') {
    data = new Buffer(data)
  }
  return NioxVero.writeToDevice(data.toString('base64'))
}

module.exports = NioxVero
