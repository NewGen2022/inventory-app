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
                ORDER BY 
                    items.name;
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
            LEFT JOIN 
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
    const allCategories = await pool.query(
        'SELECT * FROM categories ORDER BY name'
    );
    return allCategories.rows;
};

// Block to submit something to database
const addNewCategoryQuery = async (categoryName) => {
    try {
        const query =
            'INSERT INTO categories(name) VALUES($1) ON CONFLICT (name) DO NOTHING RETURNING name';
        const categoryToAdd = [categoryName];

        const result = await pool.query(query, categoryToAdd);
        const categoryAdded = result.rows[0]?.name;

        if (categoryAdded) {
            console.log(`${categoryAdded} successfully added to categories`);
            return true;
        } else {
            console.log(
                `Category "${categoryName}" already exists or was not added`
            );
            return false;
        }
    } catch (err) {
        console.error('Error inserting category:', err);
        throw err;
    }
};

// Block to add from database
const deleteCategoryQuery = async (categoryId) => {
    try {
        const query = `DELETE FROM categories WHERE id = $1 RETURNING name`;
        const values = [categoryId];

        const result = await pool.query(query, values);
        const categoryDeleted = result.rows[0]?.name;

        if (categoryDeleted) {
            console.log(
                `${categoryDeleted} successfully deleted from categories`
            );
            return true;
        } else {
            console.log(`No category found with ID ${categoryId}`);
            return false;
        }
    } catch (err) {
        console.error('Error deleting category:', err);
        throw err;
    }
};

export {
    getAllItemsQuery,
    getAllCategoryItemsByIdQuery,
    getItemByIdQuery,
    getAllCategoriesQuery,
    addNewCategoryQuery,
    deleteCategoryQuery,
};
