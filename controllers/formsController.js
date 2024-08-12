import { getAllCategoriesQuery, addNewCategoryQuery } from '../db/queries.js';

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
    });
};

const handleCategoryAdding = async (req, res) => {
    const newCategory = capitalizeFirstLetter(req.body.newCategoryName);
    addNewCategoryQuery(newCategory);

    res.status(200).redirect('/allItems');
};

export { newForm, handleCategoryAdding };

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
