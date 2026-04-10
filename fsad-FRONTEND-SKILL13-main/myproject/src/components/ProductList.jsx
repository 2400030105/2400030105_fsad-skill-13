import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../services/api";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

function ProductList({ refreshTrigger }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const totalPrice = products.reduce(
    (sum, product) => sum + (Number(product.price) || 0),
    0,
  );

  const handleDelete = async (id) => {
    setError("");
    setDeletingId(id);

    try {
      await deleteProduct(id);
      setProducts((current) => current.filter((product) => product.id !== id));
    } catch (deleteError) {
      setError(deleteError.message || "Unable to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getProducts();
        if (isMounted) {
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || "Unable to fetch products.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [refreshTrigger]);

  return (
    <section className="glass-card list-card">
      <div className="card-header">
        <h2>Cart Products</h2>
        <span className="count-pill">{products.length} items</span>
      </div>

      {loading ? <p className="muted-state">Loading products...</p> : null}
      {error ? <p className="error-text">{error}</p> : null}

      {!loading && !error && products.length === 0 ? (
        <p className="muted-state">No products yet. Add your first one.</p>
      ) : null}

      {!loading && !error && products.length > 0 ? (
        <>
          <ul className="product-list">
            {products.map((product) => (
              <li key={product.id || `${product.name}-${product.price}`}>
                <div className="product-main">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">
                    {currencyFormatter.format(Number(product.price) || 0)}
                  </span>
                </div>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id || !product.id}
                >
                  {deletingId === product.id ? "Deleting..." : "Delete"}
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-total-row">
            <span>Total</span>
            <strong>{currencyFormatter.format(totalPrice)}</strong>
          </div>
        </>
      ) : null}
    </section>
  );
}

export default ProductList;
