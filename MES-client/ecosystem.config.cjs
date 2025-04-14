module.exports = {
    apps: [
      {
        name: "mes-client",
        script: "npm",
        args: "preview",
        env: {
          NODE_ENV: "production",
          PORT: 3999 
        }
      }
    ]
  }
  