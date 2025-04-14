import CategoryForm from '@/components/category-form';
import { getCategoryById, getCategoryDropdown } from 'app/api/categories';

const CategoryDetails = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data } = await getCategoryById(id);
  const dropdownData = await getCategoryDropdown();
  const categoryDropdown = dropdownData.data;
  return (
    <>
      <CategoryForm
        initialCategory={data}
        categoryDropdown={categoryDropdown}
      />
    </>
  );
};

export default CategoryDetails;
