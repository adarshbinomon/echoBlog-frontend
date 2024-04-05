// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { PostData, UserData } from "../../utils/interfaces/inteface";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const SavedPosts = () => {
//   const postServiceBaseUrl: string = "http://localhost:4002/api/post";
//   const [posts,setPosts] = useState<PostData[]>()

//   const userData = useSelector(
//     (state: UserData) => state.persisted.user.userData
//   );
//   useEffect(() => {
//     const data = userData.savedPosts;
//     axios
//       .post(`${postServiceBaseUrl}/get-saved-posts`, data, {
//         withCredentials: true,
//       })
//       .then((res) => {
//         setPosts(res.data.posts)
//       });
//   }, []);

//   return(
//     <>
//       <div>
//         {posts?.length !== 0 ? (
//             posts?
//               .map((post: PostData, i: number) => (
//                 <div
//                   key={i}
//                   className="w-[700px] border p-10 text-center m-[20px] relative text-gray-600 bg-white rounded-md"
//                 >
//                   <div className="flex space-x-3 -ms-8 -mt-8">
//                     <div className="w-12 border rounded-full overflow-hidden">
//                       <img
//                         src={post?.createdBy?.profilePicture}
//                         alt="profilePicture"
//                       />
//                     </div>
//                     <div className="flex flex-col text-start">
//                       <p>{post.createdBy?.name}</p>
//                       <p className="font-mono">@{post?.createdBy?.userName}</p>
//                     </div>
//                   </div>
//                   {/* Rest of your post rendering code */}
//                 </div>
//               ))
//         ) : (
//           <div className="flex items-center">
//             <p>No posts to show</p>
//           </div>
//         )}
//       </div>
//     </>
//     )
// };

// export default SavedPosts;
