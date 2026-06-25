// 好：提取子组件
function ProductCard({ product }) {
  return (
    <div className="product-card">
      <ProductImage src={product.image} />
      <ProductInfo name={product.name} price={product.price} />
      <ProductActions productId={product.id} />
    </div>
  );
}