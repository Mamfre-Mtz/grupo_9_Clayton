INSERT INTO collectibles (product_id)  
SELECT id from products
WHERE type='collectible';

INSERT INTO comics (product_id)  
SELECT id from products
WHERE type='comic';