// SQL query to populate table with start data
const seedSQL = `
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM categories) THEN
        INSERT INTO categories (name) VALUES
        ('Fruits'),
        ('Vegetables'),
        ('Meat');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM items) THEN
        INSERT INTO items (category_id, name, description, price, image_url) VALUES
        (1, 'Grape', 'Sweet and juicy grapes, bursting with flavor and perfect for snacking or adding to salads.', 2.50, 'https://www.foodrepublic.com/img/gallery/15-types-of-grapes-to-know-eat-and-drink/intro-1684769284.jpg'),
        (1, 'Banana', 'A ripe, delicious banana with a creamy texture and natural sweetness. Ideal for snacking, blending into smoothies, or baking into your favorite recipes.', 3.626, 'https://www.foodandwine.com/thmb/4fzQW9u60XlhTk52CIuM1BlLhcc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/amazonfreebananas-em-86304874-2000-5a276309cf1944349fb55818c98c7b1b.jpg'),
        (2, 'Potato', 'A versatile root vegetable that can be prepared in countless ways. Ideal for making fries, mashed potatoes, or as a hearty addition to stews and soups.', 2.00, 'https://cdn.mos.cms.futurecdn.net/iC7HBvohbJqExqvbKcV3pP-1200-80.jpg'),
        (2, 'Garlic', 'Fresh, aromatic garlic cloves that add a robust flavor to any dish. Perfect for enhancing sauces, marinades, and roasted vegetables, garlic is a kitchen staple known for its bold taste and health benefits. Each bulb is packed with natural goodness to elevate your culinary creations.', 0.99, 'https://www.health.com/thmb/FAT5LSHXPSScbsi50u9EUw22rlo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Garlic-547276b9a356409eacef7284682b594a.jpg'),
        (3, 'Veal', 'Tender meat from young cattle, offering a delicate flavor and smooth texture. Perfect for elegant dishes like veal schnitzel or a classic veal stew.', 12.33, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVHjioBUG2K1iK2mFsWZ8hJkbRHA2nO5E-SQ&s'),
        (3, 'Pork', 'Succulent and flavorful pork cuts, ideal for grilling, roasting, or slow-cooking. Whether you are preparing a hearty pork roast, savory stir-fry, or delicious pork chops, our pork delivers tender, juicy results every time. Sourced from high-quality farms to ensure the best taste and texture.', 8.99, 'https://gipsfarmfresh.in/wp-content/uploads/2023/08/Pork-Curry-Cut-Boneless.jpg');
    END IF;
END $$;

`;

export default seedSQL;
