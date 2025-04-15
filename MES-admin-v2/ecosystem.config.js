module.exports = {
    apps: [
      {
        name: "mes-admin",
        script: "npm",
        args: "start -- --port 3998",
        env: {
          NODE_ENV: "production",
          PORT: 3998 
        }
      }
    ]
  }
  