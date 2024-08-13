import {
    getAllCategoriesQuery,
    addNewCategoryQuery,
    deleteCategoryQuery,
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
    addNewCategoryQuery(newCategory);

    res.status(200).redirect('/allItems');
};

const handleCategoryDeleting = async (req, res) => {
    const newCategory = req.body.categoryId;
    deleteCategoryQuery(newCategory);

    res.status(200).redirect('/allItems');
};

export { newForm, handleCategoryAdding, handleCategoryDeleting };

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
