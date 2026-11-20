'use strict';

require('dotenv').config();

const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
const { PrismaClient } = require('@prisma/client');

// Parse components from DATABASE_URL (mysql://user:password@host:port/database).
// Using Node's built-in URL class avoids an extra dependency and handles
// percent-encoded characters in passwords correctly via decodeURIComponent.
const dbUrl = new URL(process.env.DATABASE_URL);

const adapter = new PrismaMariaDb({
  host:            dbUrl.hostname,
  port:            parseInt(dbUrl.port, 10) || 3306,
  user:            decodeURIComponent(dbUrl.username),
  password:        decodeURIComponent(dbUrl.password),
  database:        dbUrl.pathname.slice(1), // remove leading '/'
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

module.exports = { prisma };
