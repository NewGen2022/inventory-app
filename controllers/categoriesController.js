import {
    getAllItemsQuery,
    getAllCategoryItemsByIdQuery,
    getItemByIdQuery,
    getAllCategoriesQuery,
} from '../db/queries.js';

const getAllItems = async (req, res) => {
    try {
        const [allItems, allCategories] = await Promise.all([
            getAllItemsQuery(),
            getAllCategoriesQuery(),
        ]);

        res.render('index', {
            items: allItems,
            allCategories: allCategories,
            activePage: 'all-items',
        });
    } catch (error) {
        console.error('Error fetching items or categories:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getAllCategoryItems = async (req, res) => {
    try {
        const [allCategoryItems, allCategories] = await Promise.all([
            getAllCategoryItemsByIdQuery(req.params.id),
            getAllCategoriesQuery(),
        ]);

        res.render('index', {
            items: allCategoryItems,
            allCategories: allCategories,
            activePage: req.params.id,
        });
    } catch (error) {
        console.error('Error fetching items or categories:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getItem = async (req, res) => {
    try {
        const [itemById, allCategories] = await Promise.all([
            getItemByIdQuery(req.params.id),
            getAllCategoriesQuery(),
        ]);

        res.render('index', { items: itemById, allCategories: allCategories });
    } catch (error) {
        console.error('Error fetching items or categories:', error);
        res.status(500).send('Internal Server Error');
    }
};

export { getAllItems, getAllCategoryItems, getItem };
