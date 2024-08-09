import {
    getAllItemsQuery,
    getAllCategoryItemsById,
    getItemById,
} from '../db/queries.js';

const getAllItems = async (req, res) => {
    const allItems = await getAllItemsQuery();
    res.render('index', { items: allItems });
};

const getAllCategoryItems = async (req, res) => {
    const allCategoryItems = await getAllCategoryItemsById(req.params.id);

    res.render('index', { items: allCategoryItems });
};

const getItem = async (req, res) => {
    const itemById = await getItemById(req.params.id);
    res.render('index', {
        items: itemById,
    });
};

export { getAllItems, getAllCategoryItems, getItem };
