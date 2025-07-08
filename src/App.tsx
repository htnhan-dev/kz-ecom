import "./App.css";

import { useCallback, useEffect, useState } from "react";

// Define proper TypeScript interface for Product
interface Product {
  _id: string;
  name: string;
  price: number;
  inStock: boolean;
  image?: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const { data }: { data: Product[] } = await res.json();
      console.log("☄️ ~ :29 ~ data:", data);
      setProducts(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="app-container">
      <div className="main-board">
        <header className="board-header">
          <h1 className="title">🛍️ Kaizen E-Commerce</h1>
          <p className="subtitle">Discover amazing products</p>
        </header>

        <div className="content-section">
          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading products...</p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <p>❌ Error: {error}</p>
              <button onClick={fetchData} className="retry-btn">
                🔄 Retry
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="products-grid">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product._id} className="product-card">
                    <div className="product-image">
                      <img
                        src={
                          product.image ||
                          `https://cdn.tgdd.vn/Products/Images/42/213033/iphone-12-pro-max-xanh-duong-new-600x600-600x600.jpg`
                        }
                        alt={product.name}
                        loading="lazy"
                        onError={(e) => {
                          (
                            e.target as HTMLImageElement
                          ).src = `https://via.placeholder.com/300x300/f8f9fa/6c757d?text=${encodeURIComponent(
                            product.name
                          )}`;
                        }}
                      />
                    </div>
                    <h3 className="product-name">{product.name}</h3>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>📦 No products found</p>
                  <button onClick={fetchData} className="refresh-btn">
                    🔄 Refresh
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
