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

const validateAddItemForm = () => {
    const form = document.querySelector('.add-item-form');

    form.addEventListener('submit', function (event) {
        let isValid = true;

        // Validate item name (ensure it's not empty and has at least 3 characters)
        const itemName = document.getElementById('item-name').value.trim();
        if (itemName.length < 3) {
            alert('Item name must be at least 3 characters long.');
            isValid = false;
        }

        // Validate item category (ensure a category is selected)
        const categoryId = document.getElementById(
            'item-category-select'
        ).value;
        if (categoryId === '') {
            alert('Please select a category.');
            isValid = false;
        }

        // Validate item description (ensure it's within the character limit)
        const itemDescription = document
            .getElementById('item-description')
            .value.trim();
        if (itemDescription.length < 20 || itemDescription.length > 500) {
            alert('Item description must be between 20 and 500 characters.');
            isValid = false;
        }

        // Validate item price (ensure it's a positive number)
        const itemPrice = document.getElementById('item-price').value;
        if (isNaN(itemPrice) || itemPrice <= 0) {
            alert('Please enter a valid price greater than 0.');
            isValid = false;
        }

        // Validate item image URL (basic URL validation)
        const itemImageUrl = document.getElementById('item-img').value.trim();
        const urlPattern = /^https:\/\/.+$/;
        if (itemImageUrl.length <= 10 || !urlPattern.test(itemImageUrl)) {
            alert(
                'Please enter a valid image URL that begins with "https://" and is longer than 10 characters.'
            );
            isValid = false;
        }

        // If any validation fails, prevent the form from being submitted
        if (!isValid) {
            event.preventDefault();
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

const validateEditItemForm = () => {
    const form = document.querySelector('.update-item-form');

    form.addEventListener('submit', function (event) {
        let isValid = true;

        // Validate item name (ensure it's not empty and has at least 3 characters)
        const itemName = document.getElementById('item-name').value.trim();
        if (itemName.length < 3) {
            alert('Item name must be at least 3 characters long.');
            isValid = false;
        }

        // Validate item category (ensure a category is selected)
        const categoryId = document.getElementById(
            'item-category-select'
        ).value;
        if (categoryId === '') {
            alert('Please select a category.');
            isValid = false;
        }

        // Validate item description (ensure it's within the character limit)
        const itemDescription = document
            .getElementById('item-description')
            .value.trim();
        if (itemDescription.length < 20 || itemDescription.length > 500) {
            alert('Item description must be between 20 and 500 characters.');
            isValid = false;
        }

        // Validate item price (ensure it's a positive number)
        const itemPrice = document.getElementById('item-price').value;
        if (isNaN(itemPrice) || itemPrice <= 0) {
            alert('Please enter a valid price greater than 0.');
            isValid = false;
        }

        // Validate item image URL (basic URL validation)
        const itemImageUrl = document.getElementById('item-img').value.trim();
        const urlPattern = /^https:\/\/.+$/;
        if (itemImageUrl.length <= 10 || !urlPattern.test(itemImageUrl)) {
            alert(
                'Please enter a valid image URL that begins with "https://" and is longer than 10 characters.'
            );
            isValid = false;
        }

        // If any validation fails, prevent the form from being submitted
        if (!isValid) {
            event.preventDefault();
        }
    });
};

export {
    validateAddCategoryForm,
    validateAddItemForm,
    validateDeleteCategoryForm,
    validateDeleteItemForm,
    validateEditItemForm,
};
