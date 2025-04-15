module.exports = {
    apps: [
      {
        name: "mes-client",
        script: "npm",
        args: "run preview --port 3999",
        env: {
          NODE_ENV: "production",
          PORT: 3999 
        }
      }
    ]
  }
  