module.exports = {
  apps: [{
    name: "provider-binance",
    script: "./src/providers/binance.js",
    ignore_watch: ["node_modules"],
    watch_delay: 1000,
    max_memory_restart: '100M',
    exp_backoff_restart_delay: 100,
  }, {
    name: "provider-paribu",
    script: "./src/providers/paribu.restful.js",
    ignore_watch: ["node_modules"],
    watch_delay: 1000,
    max_memory_restart: '100M',
    exp_backoff_restart_delay: 100,
  }, {
    name: "provider-btcturk",
    script: "./src/providers/btcturk.js",
    ignore_watch: ["node_modules"],
    watch_delay: 1000,
    max_memory_restart: '100M',
    exp_backoff_restart_delay: 100,
  }, {
    name: "scheduled-coins-grow",
    script: "./src/scheduled/coins-grow.js",
    ignore_watch: ["node_modules"],
    watch_delay: 1000,
    max_memory_restart: '100M',
    exp_backoff_restart_delay: 100,
  }, {
    name: "scheduled-coins-history",
    script: "./src/scheduled/coins-history.js",
    ignore_watch: ["node_modules"],
    watch_delay: 1000,
    max_memory_restart: '100M',
    exp_backoff_restart_delay: 100,
  }, {
    name: "scheduled-currency",
    script: "./src/currency/currency.js",
    ignore_watch: ["node_modules"],
    watch_delay: 1000,
    max_memory_restart: '100M',
    exp_backoff_restart_delay: 100,
  }
  ]
};
