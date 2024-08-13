const validateAddCategoryForm = () => {
    document
        .querySelector('.add-form.category-form')
        .addEventListener('submit', function (event) {
            const inputField = document.getElementById('category-name');
            const trimmedValue = inputField.value.trim();

            // Regular expression to check for numbers
            const containsNumbers = /\d/.test(trimmedValue);

            if (trimmedValue === '') {
                // Prevent form submission if input is empty after trimming
                event.preventDefault();
                alert('Category name cannot be empty or whitespace.');
            } else if (containsNumbers) {
                // Prevent form submission if input contains numbers
                event.preventDefault();
                alert('Category name cannot contain numbers.');
            } else {
                // Set the value to the trimmed version
                inputField.value = trimmedValue;
            }
        });
};

const validateDeleteCategoryForm = () => {
    document
        .querySelector('.delete-form.category-form')
        .addEventListener('submit', function (event) {
            const categorySelect =
                document.getElementById('category-to-delete');

            // Check if the select element exists and has options
            if (!categorySelect) {
                // Prevent form submission if there are no categories to select
                event.preventDefault();
                alert('Cannot delete nothing. No categories available.');
            }
        });
};

const validateDeleteItemForm = () => {
    const form = document.getElementById('single-card-form');
    if (!form) return;

    const deleteButton = form.querySelector('.delete');
    const itemName = form.querySelector('h1').textContent;

    deleteButton.addEventListener('click', (event) => {
        const confirmDelete = confirm(
            `Are you sure you want to delete the item: "${itemName}"?`
        );

        if (!confirmDelete) {
            event.preventDefault();
        }
    });
};

export {
    validateAddCategoryForm,
    validateDeleteCategoryForm,
    validateDeleteItemForm,
};
