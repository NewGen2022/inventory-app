import {
    getAllCategoriesQuery,
    addNewCategoryQuery,
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

const handleCategoryAdding = async (req, res) => {
    const newCategory = capitalizeFirstLetter(req.body.newCategoryName);
    await addNewCategoryQuery(newCategory);

    res.status(200).redirect('/allItems');
};

const handleCategoryDeleting = async (req, res) => {
    const newCategory = req.body.categoryId;
    await deleteCategoryQuery(newCategory);

    res.status(200).redirect('/allItems');
};

const handleItemChanging = async (req, res) => {
    const itemIdToChange = req.params.id;
    const action = req.body.action;

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
        res.status(400).send('Invalid action');
    }
};

export {
    newForm,
    handleCategoryAdding,
    handleCategoryDeleting,
    handleItemChanging,
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
