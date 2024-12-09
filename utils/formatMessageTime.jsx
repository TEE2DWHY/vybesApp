export const formatMessageTime = (messageTime) => {
  const messageDate = new Date(messageTime);
  const now = new Date();
  const diffTime = Math.abs(now - messageDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays > 1) {
    return messageDate.toLocaleDateString("en-GB");
  } else {
    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
};
