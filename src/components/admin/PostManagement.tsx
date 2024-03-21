import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import { PostData } from "../../utils/interfaces/inteface";

const PostManagement = () => {
  const postServiceBaseUrl: string = "http://localhost:4002/api/post";
  const [posts, setPosts] = useState<PostData[]>([]);
  const [reload, setReload] = useState(false);

  const columns = [
    {
      name: "ID",
      selector: (row: any) => row._id,
    },
    {
      name: "Title",
      selector: (row: any) => row.title,
    },
    {
      name: "Author",
      selector: (row: any) => row.name,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <div>
          {row.visibility ? (
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-300"
              onClick={() => handleStatusChange(row._id)}
            >
              Block
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-300"
              onClick={() => handleStatusChange(row._id)}
            >
              Unblock
            </button>
          )}
        </div>
      ),
    },
  ];

  const handleStatusChange = (postId: string) => {
    axios
      .put(`${postServiceBaseUrl}/update-post-status/${postId}`)
      .then(() => {
        setReload(!reload);
        toast.success("Post status updated successfully");
      })
      .catch((error) => {
        console.error("Error updating post status:", error);
        toast.error("Failed to update post status");
      });
  };

  useEffect(() => {
    console.log(`${postServiceBaseUrl}/all-posts`);
    
    axios
      .get(`${postServiceBaseUrl}/all-posts`)
      .then((res) => {
        console.log(res);
        const mappedData = res.data.posts.map((post: PostData) => ({
          _id: post._id,
          title: post.title,
          content: post.content,
          name: post.createdBy.name,
          visibility: post.visibility,
        }));
        setPosts(mappedData);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [reload]);

  return (
    <div className="flex flex-col items-center">
    <h1 className="text-2xl font-bold">Post Management</h1>
    <div className="w-4/5 mt-16 border justify-center">
      <DataTable columns={columns} data={posts} pagination highlightOnHover />
    </div>
  </div>
  );
};

export default PostManagement;
