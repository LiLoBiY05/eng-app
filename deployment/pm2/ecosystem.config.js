/**
 * PM2 Ecosystem Configuration
 * English Learning Portal
 *
 * Usage:
 *   pm2 start deployment/pm2/ecosystem.config.js
 *   pm2 restart english-portal
 *   pm2 stop english-portal
 *   pm2 delete english-portal
 *   pm2 logs english-portal
 *   pm2 monit
 */

module.exports = {
  apps: [
    {
      name: "english-portal",
      script: ".output/server/index.mjs",
      cwd: "/var/www/html/eng-app",
      instances: 1,
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3010,
        HOST: "127.0.0.1",
        // Add any other environment variables here
        // DATABASE_URL: 'your-database-url',
        // API_KEY: 'your-api-key',
      },
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      min_uptime: "10s",
      max_restarts: 10,
      restart_delay: 4000,
    },
  ],
};
