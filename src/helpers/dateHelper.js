import moment from "moment";

export function formatDateTime(time) {
  return moment(time).format("YYYY-MM-DD HH:mm:ss");
}
