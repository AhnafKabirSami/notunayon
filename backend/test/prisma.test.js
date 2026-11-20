'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

test('Prisma client loads without connecting to MySQL', () => {
  const originalDatabaseUrl = process.env.DATABASE_URL;
  process.env.DATABASE_URL = 'mysql://test-user:test-password@127.0.0.1:3306/test_database';

  try {
    const { prisma } = require('../src/lib/prisma');

    assert.equal(typeof prisma.$connect, 'function');
    assert.equal(typeof prisma.$disconnect, 'function');
  } finally {
    if (originalDatabaseUrl === undefined) {
      delete process.env.DATABASE_URL;
    } else {
      process.env.DATABASE_URL = originalDatabaseUrl;
    }
  }
});
