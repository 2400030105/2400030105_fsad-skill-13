import { useState } from "react";
import { addProduct } from "../services/api";

function AddProduct({ onProductAdded }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const numericPrice = Number(price);

    if (!trimmedName || Number.isNaN(numericPrice) || numericPrice < 0) {
      setError("Please enter a valid product name and price.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await addProduct({ name: trimmedName, price: numericPrice });
      setName("");
      setPrice("");
      onProductAdded();
    } catch (submitError) {
      setError(submitError.message || "Unable to add product.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="glass-card add-card">
      <h2>Add Product</h2>
      <p className="card-copy">Create a new product in your catalog.</p>

      <form onSubmit={handleSubmit} className="product-form">
        <label htmlFor="product-name">Product Name</label>
        <input
          id="product-name"
          value={name}
          placeholder="Wireless Keyboard"
          onChange={(event) => setName(event.target.value)}
          autoComplete="off"
          disabled={submitting}
        />

        <label htmlFor="product-price">Price (INR)</label>
        <input
          id="product-price"
          value={price}
          placeholder="1499"
          onChange={(event) => setPrice(event.target.value)}
          inputMode="decimal"
          disabled={submitting}
        />

        {error ? <p className="error-text">{error}</p> : null}

        <button type="submit" disabled={submitting}>
          {submitting ? "Adding..." : "Add Product"}
        </button>
      </form>
    </section>
  );
}

export default AddProduct;
