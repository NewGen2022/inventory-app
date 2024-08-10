import pool from './pool.js';

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

export {
    getAllItemsQuery,
    getAllCategoryItemsByIdQuery,
    getItemByIdQuery,
    getAllCategoriesQuery,
};
