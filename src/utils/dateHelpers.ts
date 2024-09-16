const calculateDateDifference = (targetDate: Date): string => {
  const now = new Date();
  const timeDifference = Math.abs(targetDate.getTime() - now.getTime());

  // Calculate seconds
  const seconds = Math.floor(timeDifference / 1000);
  if (seconds < 60) {
    return `${seconds}s`;
  }

  // Calculate minutes
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m`;
  }

  // Calculate hours
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h`;
  }

  // Calculate days
  const days = Math.floor(hours / 24);
  if (days < 365) {
    return `${days}d`;
  }

  // Calculate years
  const years = Math.floor(days / 365);
  return `${years}y`;
};

const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const dateHelpers = {
  calculateDateDifference,
  isToday,
  formatDate,
};
