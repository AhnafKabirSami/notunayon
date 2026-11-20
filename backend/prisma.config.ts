import "dotenv/config";
import { defineConfig, env } from "prisma/config";

const datasourceUrl = process.env.DATABASE_URL;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  ...(datasourceUrl ? { datasource: { url: env("DATABASE_URL") } } : {}),
});
