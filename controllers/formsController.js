import {
    getAllCategoriesQuery,
    addNewCategoryQuery,
    addNewItemQuery,
    deleteCategoryQuery,
    deleteItemQueryById,
} from '../db/queries.js';

// rendering new form according to request URL
const newForm = async (req, res) => {
    const allCategories = await getAllCategoriesQuery();

    const { formType: formType, action } = req.params;

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

    const formTemplate = formDetails[formType]?.[action];
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
        itemName: req.body.itemName,
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
        res.status(303).redirect(`/allItems/item/${itemIdToChange}/edit`);
    } else {
        res.status(400).render('404', { message: 'Invalid action' });
    }
};

export {
    newForm,
    handleCategoryAdding,
    handleItemAdding,
    handleCategoryDeleting,
    handleItemChanging,
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
