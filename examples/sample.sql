-- SQL sample for checking theme colors.
/* Block comment: schema and queries for a simple shop. */

CREATE TABLE IF NOT EXISTS customers (
    id          SERIAL PRIMARY KEY,
    email       VARCHAR(255) NOT NULL UNIQUE,
    name        TEXT,
    is_active   BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
    id           BIGSERIAL PRIMARY KEY,
    customer_id  INTEGER REFERENCES customers (id) ON DELETE CASCADE,
    amount       NUMERIC(10, 2) CHECK (amount >= 0),
    status       VARCHAR(20) DEFAULT 'pending'
);

CREATE INDEX idx_orders_customer ON orders (customer_id);

INSERT INTO customers (email, name)
VALUES ('alice@example.com', 'Alice'),
       ('bob@example.com', NULL);

WITH monthly AS (
    SELECT
        c.id,
        c.name,
        DATE_TRUNC('month', o.created_at) AS month,
        SUM(o.amount)                     AS total
    FROM customers AS c
    INNER JOIN orders AS o ON o.customer_id = c.id
    WHERE c.is_active = TRUE
      AND o.status IN ('paid', 'shipped')
    GROUP BY c.id, c.name, month
)
SELECT
    name,
    month,
    total,
    RANK() OVER (PARTITION BY month ORDER BY total DESC) AS rank
FROM monthly
WHERE total > 1000.50
ORDER BY month DESC, rank
LIMIT 10;

UPDATE orders SET status = 'cancelled' WHERE amount = 0 AND status <> 'paid';
