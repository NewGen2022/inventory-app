const addNew = (req, res) => {
    const type = req.params.formType;

    switch (type) {
        case 'category':
            res.render('index', { text: `Form for adding new ${type} QWERTY` });
            break;
        case 'item':
            res.render('index', { text: `Form for adding new ${type}` });
            break;
        default:
            res.render('index', { text: `Page Not Found 404` });
            break;
    }
};

export { addNew };
