export const Config = {
  env: {
    app: {
      app_url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      api_url: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
      auth_url:
        process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3002/auth",
    },
  },
};
