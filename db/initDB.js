import pool from './pool.js';
import schemaSQL from './createSchema.js';
import seedSQL from './populateDB.js';

async function initDB() {
    const client = await pool.connect(); // Get a client from the pool

    try {
        await client.query('BEGIN'); // Start transaction

        console.log('Creating schema...');
        await client.query(schemaSQL); // Execute schema creation
        console.log('Schema created successfully');

        console.log('Populating data...');
        await client.query(seedSQL); // Execute data population
        console.log('Data populated successfully');

        await client.query('COMMIT'); // Commit transaction
    } catch (error) {
        await client.query('ROLLBACK'); // Rollback transaction on error
        console.error('Error populating database:', error);
    } finally {
        client.release(); // Release the client back to the pool
    }
}

export default initDB;
