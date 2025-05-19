function formatLastSeen(timestamp) {
  if (!timestamp) return "offline";
  const now = new Date();
  const lastSeen = new Date(timestamp);
  const diffMs = now - lastSeen;

  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths =
    now.getMonth() -
    lastSeen.getMonth() +
    12 * (now.getFullYear() - lastSeen.getFullYear());

  if (diffHours < 24) {
    return `last seen at ${lastSeen.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}`;
  } else if (diffDays < 2) {
    return `last seen yesterday ${lastSeen.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}`;
  } else if (diffDays < 7) {
    return `last seen ${diffDays} days ago`;
  } else if (diffWeeks < 4) {
    return `last seen ${diffWeeks} week${diffWeeks === 1 ? "" : "s"} ago`;
  } else if (diffMonths < 3) {
    return `last seen ${diffMonths} month${diffMonths === 1 ? "" : "s"} ago`;
  } else {
    return `last seen at ${lastSeen.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    })}th`;
  }
}

export { formatLastSeen };
