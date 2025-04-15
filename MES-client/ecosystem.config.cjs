module.exports = {
  apps: [
    {
      name: "mes-client",
      script: "node_modules/vite/bin/vite.js",
      args: "preview --port 4175",
      env: {
        NODE_ENV: "production",
        PORT: 4175
      }
    }
  ]
};
