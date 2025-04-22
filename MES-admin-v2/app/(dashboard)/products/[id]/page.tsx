import ProductForm from '@/components/product-formv2';
import { getCategories } from 'app/api/categories';
import { getProductById } from 'app/api/products';

const ProductDetails = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data } = await getProductById(id);
  const product = data._doc;
  const variations = data.variations;
  const response = await getCategories();
  const categories = response.data.data;

  return (
    <>
      <ProductForm
        initialProduct={product}
        initialVariations={variations}
        categories={categories}
      />
    </>
  );
};

export default ProductDetails;
