import Logo from '../components/Logo'
const navbar = () => {
  return (
    <nav className="bg-indigo-600 p-4 fixed w-full">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-2xl hover:text-gray-300">
            <Logo/>
          </div>
            <div className='w-2/3'>
            <input className='rounded-full p-2 w-2/4 h-8 float-right' type="text" placeholder='Search' />
            </div>
          <div className="flex space-x-4">
            <a href="/profile" className="text-white hover:text-gray-300">Profile</a>
            <a href="#" className="text-white hover:text-gray-300">About</a>
            <a href="#" className="text-white hover:text-gray-300">Contact</a>
            <a href="#" className="text-white hover:text-gray-300">Logout</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default navbar