import { NativeModules } from "react-native";

NativeModules.BlobModule = {
  ...NativeModules.BlobModule,
  addNetworkingHandler: jest.fn()
};
//missing mock from 0.54