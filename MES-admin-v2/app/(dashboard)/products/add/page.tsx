import ProductForm from '@/components/product-formv2';
import { getCategories } from 'app/api/categories';

const AddProduct = async () => {
  const { data } = await getCategories();
  const categories = data.data;
  return (
    <>
      <ProductForm categories={categories} />
    </>
  );
};

export default AddProduct;
