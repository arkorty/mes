module.exports = {
  apps: [
    {
      name: "mes-client",
      script: "node_modules/vite/bin/vite.js",
      args: "preview --port 3999",
      env: {
        NODE_ENV: "production",
        PORT: 3999
      }
    }
  ]
};
