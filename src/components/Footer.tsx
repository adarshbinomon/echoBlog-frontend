import LogoSmall from "./LogoSmall";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
    <div className="mt-10"></div>
      <div className="bg-gray-200 flex-col py-5 space-y-5 text-gray-800">
        <div className="mb-5 text-indigo-600 font-bold text-2xl hover:text-indigo-500">
          <LogoSmall />
        </div>
        <div className="flex flex-row justify-center space-x-52">
          <div className="flex flex-col justify-center space-y-3 ">
            <a href="">About</a>
            <a href="">Careers</a>
          </div>
          <div className="flex flex-col justify-center space-y-3">
            <a href="">Help</a>
            <a href="">Partner</a>
          </div>
          <div className="flex flex-col justify-center space-y-3">
            <a href="">Privacy</a>
            <a href="">Terms</a>
          </div>
          <div className="flex flex-col justify-center space-y-3">
            <a href="">Referral</a>
            <a href="">Text to Speech</a>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <p>© {currentYear}, {'<EchoBlog/>'} Amplifying Thoughts, Resonating Ideas - All Rights Reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
