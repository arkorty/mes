module.exports = {
    apps: [
      {
        name: "mes-api",
        script: "dist/index.js", // or index.ts with ts-node
        watch: false,
        instances: 1,
        autorestart: true,
        env: {
          NODE_ENV: "production"
        }
      }
    ]
  };
  