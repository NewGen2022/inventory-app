import pool from './pool.js';

// Block to get something from database
const getAllItemsQuery = async () => {
    try {
        const allItems = await pool.query(`
                SELECT 
                    items.id,
                    items.name, 
                    items.price, 
                    items.image_url 
                FROM 
                    items
            `);
        return allItems.rows;
    } catch (err) {
        console.error('Error executing query', err.stack);
    }
};

const getAllCategoryItemsByIdQuery = async (id) => {
    try {
        const query = `
            SELECT 
                items.id,
                items.name, 
                items.price, 
                items.image_url
            FROM 
                items
            WHERE 
                category_id = $1;
        `;

        const allCategoryItemsById = await pool.query(query, [id]);

        return allCategoryItemsById.rows;
    } catch (err) {
        console.error('Error executing query', err.stack);
    }
};

const getItemByIdQuery = async (id) => {
    try {
        const query = `
            SELECT 
                items.id,
                items.name, 
                items.description, 
                items.price, 
                items.image_url, 
                categories.name AS category_name 
            FROM 
                items 
            INNER JOIN 
                categories 
            ON 
                items.category_id = categories.id
            WHERE 
                items.id = $1;
        `;

        const itemById = await pool.query(query, [id]);

        return itemById.rows;
    } catch (err) {
        console.error('Error executing query', err.stack);
    }
};

const getAllCategoriesQuery = async () => {
    const allCategories = await pool.query('SELECT * FROM categories');
    return allCategories.rows;
};

// Block to submit something to database
const addNewCategoryQuery = async (categoryName) => {
    try {
        const query =
            'INSERT INTO categories(name) VALUES($1) ON CONFLICT (name) DO NOTHING RETURNING id';
        const values = [categoryName];

        await pool.query(query, values);

        return true;
    } catch (err) {
        console.error('Error inserting category:', error);
        throw error;
    }
};

export {
    getAllItemsQuery,
    getAllCategoryItemsByIdQuery,
    getItemByIdQuery,
    getAllCategoriesQuery,
    addNewCategoryQuery,
};
