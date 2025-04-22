import UserForm from '@/components/user-form';
import { getUserById } from 'app/api/users';

const UserDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data } = await getUserById(id);
  return (
    <>
      <UserForm initialUser={data} />
    </>
  );
};

export default UserDetails;
