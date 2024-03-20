import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const activeTab = location.pathname.split('/')[2]; 
  return (
    <div className="bg-gray-800 h-full w-[341px] fixed top-0 left-0 flex flex-col justify-between">
      <div className="mt-4 mb-8 px-4">
        <h1 className="text-white text-2xl font-bold mb-4">{'<EchoBlog/>/Admin'}</h1>
        <ul className="space-y-10 mt-32">
          <li>
            <Link
              to="/admin"
              className={`hover:text-red-500 transition duration-300 p-2 rounded-lg w-full ${
                location.pathname === '/admin' ? 'font-semibold bg-white text-black' : 'text-white'
              }`}
            >User Management
            </Link>
          </li>
          <li>
            <Link
              to="/admin/user-management"
              
              className={`text-white hover:text-red-500 transition duration-300 ${
                activeTab === 'user' ? 'font-semibold' : ''
              }`}
            >
              Post Management
            </Link>
          </li>
          <li>
            <Link
              to="/admin/post-management"
              className={`text-white hover:text-red-500 transition duration-300 ${
                activeTab === 'post' ? 'font-semibold' : ''
              }`}
            >
              Post Management
            </Link>
          </li>
          <li>
            <Link
              to="/admin/reports-management"
              className={`text-white hover:text-red-500 transition duration-300 ${
                activeTab === 'reports' ? 'font-semibold' : ''
              }`}
            >
              Reports Management
            </Link>
          </li>
          <li>
            <Link
              to="/admin/premium-management"
              className={`text-white hover:text-red-500 transition duration-300 ${
                activeTab === 'premium' ? 'font-semibold' : ''
              }`}
            >
              Premium Management
            </Link>
          </li>
        </ul>
      </div>
      <div className="px-4 pb-8">
        <p className="text-red-500 text-xs">&copy; Echo Blog</p>
      </div>
    </div>
  );
};

export default Sidebar;
