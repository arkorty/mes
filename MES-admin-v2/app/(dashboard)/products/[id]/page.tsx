import ProductForm from '@/components/product-form';
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

  return (
    <>
      <ProductForm initialProduct={product} initialVariations={variations} />
    </>
  );
};

export default ProductDetails;
