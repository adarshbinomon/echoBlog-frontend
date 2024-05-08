import UsersPerMonth from "./NewUsersPerMonth";
import PostsPerMonth from "./PostsPerMonth";

const AdminHomeComponent = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="ms-10 border shadow-sm w-1/2">
        <PostsPerMonth />
      </div>
      <div className="ms-10 border shadow-sm w-1/2">
        <UsersPerMonth />
      </div>
    </div>
  );
};

export default AdminHomeComponent;
