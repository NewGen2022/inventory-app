import {
    getAllCategoriesQuery,
    getItemByIdQuery,
    addNewCategoryQuery,
    addNewItemQuery,
    deleteCategoryQuery,
    deleteItemQueryById,
    updateItemQueryById,
} from '../db/queries.js';

// rendering new form according to request URL
const newForm = async (req, res) => {
    const allCategories = await getAllCategoriesQuery();

    let { formType, action, id } = req.params;

    const formDetails = {
        category: {
            create: 'addCategoryForm',
            delete: 'deleteCategoryForm',
        },
        item: {
            create: 'addItemForm',
            delete: 'deleteItemForm',
            edit: 'editItemForm',
        },
    };

    let formTemplate = formDetails[formType]?.[action];

    let item = [];
    if (id) {
        item = await getItemByIdQuery(id);
        if (!item) {
            return res.status(404).render('404', { message: 'Item Not Found' });
        }
    }

    if (!formTemplate || formTemplate === 'deleteItemForm') {
        return res.status(404).render('404', { message: 'Page Not Found' });
    }
    const message = formTemplate
        ? `${capitalizeFirstLetter(action)} ${formType}`
        : 'Page Not Found 404';

    res.status(200).render('index', {
        form: formTemplate,
        title: message,
        allCategories: allCategories,
        activePage: formTemplate,
        item: item[0],
    });
};

// Block controller to add something
const handleCategoryAdding = async (req, res) => {
    const newCategory = capitalizeFirstLetter(req.body.newCategoryName);

    const success = await addNewCategoryQuery(newCategory);
    if (!success) {
        return res
            .status(400)
            .render('404', { message: 'Failed to add category.' });
    }

    res.status(200).redirect('/allItems');
};

const handleItemAdding = async (req, res) => {
    const newItem = {
        itemName: capitalizeFirstLetter(req.body.itemName),
        itemCategory: req.body.categoryId,
        itemDescription: req.body.itemDescription,
        itemPrice: req.body.itemPrice,
        itemImageUrl: req.body.itemImageUrl,
    };
    const success = await addNewItemQuery(newItem);

    if (!success) {
        return res
            .status(400)
            .render('404', { message: 'Failed to add item.' });
    }

    res.status(200).redirect('/allItems');
};

// Block controller to delete something
const handleCategoryDeleting = async (req, res) => {
    const newCategory = req.body.categoryId;
    await deleteCategoryQuery(newCategory);

    res.status(200).redirect('/allItems');
};

const handleItemChanging = async (req, res) => {
    const itemIdToChange = req.params.id;
    const action = req.body.action;

    if (!itemIdToChange || isNaN(itemIdToChange)) {
        return res.status(400).render('404', { message: 'Invalid item ID.' });
    }

    if (action === 'delete') {
        try {
            await deleteItemQueryById(itemIdToChange);
            res.status(200).redirect('/allItems');
        } catch (err) {
            console.err('Error deleting item: ', err);
            res.status(500).send('Error deleting item');
        }
    } else if (action === 'edit') {
        res.status(303).redirect(`/form/item/edit/${itemIdToChange}`);
    } else {
        res.status(400).render('404', { message: 'Invalid action' });
    }
};

// Block controller to update something
const handleItemEditing = async (req, res) => {
    const itemIdToEdit = req.params.id;

    if (!itemIdToEdit || isNaN(itemIdToEdit)) {
        return res.status(400).render('404', { message: 'Invalid item ID.' });
    }

    const updatedItem = {
        itemName: capitalizeFirstLetter(req.body.itemName),
        itemCategory: req.body.categoryId,
        itemDescription: req.body.itemDescription,
        itemPrice: req.body.itemPrice,
        itemImageUrl: req.body.itemImageUrl,
        itemId: itemIdToEdit,
    };

    try {
        const result = await updateItemQueryById(updatedItem);

        if (result) {
            res.status(200).redirect('/allItems');
        } else {
            res.status(404).render('404', {
                message: 'Item not found or not updated.',
            });
        }
    } catch (err) {
        console.error('Error updating item:', err.stack);
        res.status(500).send('Error updating item');
    }
};

export {
    newForm,
    handleCategoryAdding,
    handleItemAdding,
    handleCategoryDeleting,
    handleItemChanging,
    handleItemEditing,
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
