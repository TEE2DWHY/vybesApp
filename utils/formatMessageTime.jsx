import { format, isToday } from "date-fns";

export const formatMessageTime = (messageTime) => {
  const messageDate = new Date(messageTime);

  if (isToday(messageDate)) {
    return format(messageDate, "HH:mm"); // 24-hour format
  } else {
    return format(messageDate, "dd/MM/yyyy HH:mm"); // Date and time
  }
};
