/**
 * Utility functions for EchoSheild
 */

/**
 * Format timestamp to relative time (e.g., "5 minutes ago")
 */
export const formatTimeAgo = (date) => {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";

  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";

  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";

  return Math.floor(seconds) + " seconds ago";
};

/**
 * Get color based on trust score
 */
export const getTrustScoreColor = (score) => {
  if (score >= 75) return "text-green-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
};

/**
 * Get background color based on trust score
 */
export const getTrustScoreBg = (score) => {
  if (score >= 75) return "bg-green-900";
  if (score >= 50) return "bg-yellow-900";
  return "bg-red-900";
};

/**
 * Get badge color based on status
 */
export const getStatusBadgeColor = (status) => {
  switch (status) {
    case "TRUE":
      return "badge-success";
    case "MISINFORMATION":
      return "badge-danger";
    case "PARTIALLY_TRUE":
      return "badge-warning";
    default:
      return "badge-warning";
  }
};

/**
 * Get icon based on severity
 */
export const getSeverityIcon = (severity) => {
  switch (severity) {
    case "CRITICAL":
      return "🔴";
    case "HIGH":
      return "🟠";
    case "MEDIUM":
      return "🟡";
    case "LOW":
      return "🟢";
    default:
      return "❓";
  }
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, length = 100) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};

/**
 * Format number with thousands separator
 */
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
