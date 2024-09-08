const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',        // El nombre de usuario que creaste en PostgreSQL
  host: 'localhost',         // O la IP de tu servidor PostgreSQL
  database: 'foly',          // El nombre de tu base de datos
  password: '123',   // La contraseña de tu usuario PostgreSQL
  port: 5432,                // El puerto por defecto de PostgreSQL
});

module.exports = pool;
