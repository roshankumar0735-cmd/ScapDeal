// Simple logger abstraction – can be swapped for Winston/Datadog etc. later

const info = (message, meta) => {
  if (meta) {
    // eslint-disable-next-line no-console
    console.log(`[INFO] ${message}`, meta);
  } else {
    // eslint-disable-next-line no-console
    console.log(`[INFO] ${message}`);
  }
};

const error = (message, meta) => {
  if (meta) {
    // eslint-disable-next-line no-console
    console.error(`[ERROR] ${message}`, meta);
  } else {
    // eslint-disable-next-line no-console
    console.error(`[ERROR] ${message}`);
  }
};

module.exports = { info, error };
