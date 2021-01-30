module.exports = {
  apps: [{
    name: "socket",
    script: "src/socket.js",
    ignore_watch: ["node_modules"],
    watch_delay: 1000,
    max_memory_restart: '100M',
    exp_backoff_restart_delay: 100,
  }]
};
