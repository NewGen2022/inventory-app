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
        throw err;
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
            ORDER BY 
                    items.name;
        `;

        const allCategoryItemsById = await pool.query(query, [id]);

        return allCategoryItemsById.rows;
    } catch (err) {
        console.error('Error executing query', err.stack);
        throw err;
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
        throw err;
    }
};

const getAllCategoriesQuery = async () => {
    const allCategories = await pool.query(
        'SELECT * FROM categories ORDER BY name'
    );
    return allCategories.rows;
};

// Block to add something to database
const addNewCategoryQuery = async (categoryName) => {
    try {
        const query =
            'INSERT INTO categories(name) VALUES($1) ON CONFLICT (name) DO NOTHING RETURNING name;';
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
        console.error('Error adding category:', err.stack);
        throw err;
    }
};

const addNewItemQuery = async (newItem) => {
    try {
        const query = `INSERT INTO 
                items(category_id, name, description, price, image_url) 
            VALUES 
                ($1, $2, $3, $4, $5) 
            ON CONFLICT
                (name) 
            DO NOTHING RETURNING 
                name;
            `;
        const itemToAdd = [
            newItem.itemCategory,
            newItem.itemName,
            newItem.itemDescription,
            newItem.itemPrice,
            newItem.itemImageUrl,
        ];

        const result = await pool.query(query, itemToAdd);
        const itemAdded = result.rows[0]?.name;

        if (itemAdded) {
            console.log(`${itemAdded} successfully added to item`);
            return true;
        } else {
            console.log(`Item "${itemAdded}" already exists or was not added`);
            return false;
        }
    } catch (err) {
        console.error('Error adding item:', err.stack);
        throw err;
    }
};

// Block to delete something from database
const deleteCategoryQuery = async (categoryId) => {
    try {
        const query = `DELETE FROM categories WHERE id = $1 RETURNING name`;
        const categoryToDelete = [categoryId];

        const result = await pool.query(query, categoryToDelete);
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
        console.error('Error deleting category:', err.stack);
        throw err;
    }
};

const deleteItemQueryById = async (itemId) => {
    try {
        const query = `DELETE FROM items WHERE id = $1 RETURNING name`;
        const itemToDelete = [itemId];

        const result = await pool.query(query, itemToDelete);
        const itemDeleted = result.rows[0]?.name;

        if (itemDeleted) {
            console.log(`${itemDeleted} successfully deleted from items`);
            return true;
        } else {
            console.log(`No category found with ID ${itemId}`);
            return false;
        }
    } catch (err) {
        console.error('Error deleting category:', err.stack);
        throw err;
    }
};

// Block to update something in database
const updateItemQueryById = async (updatedItem) => {
    try {
        const query = `
            UPDATE items
            SET
                category_id = $1,
                name = $2,
                description = $3,
                price = $4,
                image_url = $5
            WHERE
                id = $6
            RETURNING name;
        `;

        const values = [
            updatedItem.itemCategory,
            updatedItem.itemName,
            updatedItem.itemDescription,
            updatedItem.itemPrice,
            updatedItem.itemImageUrl,
            updatedItem.itemId,
        ];

        const result = await pool.query(query, values);
        const itemUpdated = result.rows[0]?.name;

        if (itemUpdated) {
            console.log(`${itemUpdated} successfully updated in items`);
            return true;
        } else {
            console.log(
                `Item with ID "${updatedItem.itemId}" not found or not updated`
            );
            return false;
        }
    } catch (err) {
        console.error('Error updating item:', err.stack);
        throw err;
    }
};

export {
    getAllItemsQuery,
    getAllCategoryItemsByIdQuery,
    getItemByIdQuery,
    getAllCategoriesQuery,
    addNewCategoryQuery,
    addNewItemQuery,
    deleteCategoryQuery,
    deleteItemQueryById,
    updateItemQueryById,
};
