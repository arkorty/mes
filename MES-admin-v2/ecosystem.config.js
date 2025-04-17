module.exports = {
  apps: [
    {
      name: "mes-admin",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3998
      }
    }
  ]
};
