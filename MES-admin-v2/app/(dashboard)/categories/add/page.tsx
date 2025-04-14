import CategoryForm from '@/components/category-form';
import { getCategoryDropdown } from 'app/api/categories';

const AddCategory = async () => {
  const { data } = await getCategoryDropdown();
  const categoryDropdown = data;
  return (
    <>
      <CategoryForm categoryDropdown={categoryDropdown} />
    </>
  );
};

export default AddCategory;
