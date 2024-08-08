// SQL query to populate table with start data
const seedSQL = `
INSERT INTO categories (name) VALUES
('Fruits'),
('Vegetables'),
('Meat')
ON CONFLICT (name) DO NOTHING;

INSERT INTO items (category_id, name, description, price, image_url) VALUES
(1, 'Grape', 'Sweet and juicy grapes.', 2.50, 'https://www.foodrepublic.com/img/gallery/15-types-of-grapes-to-know-eat-and-drink/intro-1684769284.jpg'),
(2, 'Potato', 'Versatile root vegetable.', 2.00, 'https://cdn.mos.cms.futurecdn.net/iC7HBvohbJqExqvbKcV3pP-1200-80.jpg'),
(3, 'Veal', 'Tender meat from young cattle.', 12.33, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVHjioBUG2K1iK2mFsWZ8hJkbRHA2nO5E-SQ&s')
ON CONFLICT (name) DO NOTHING;
`;

export default seedSQL;
