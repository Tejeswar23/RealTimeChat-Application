import SockJS from "sockjs-client";
import { WS_ENDPOINT } from "../utils/constants";

export function createSocket() {
  return new SockJS(WS_ENDPOINT);
}
