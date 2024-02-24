import Logo from "./Logo";

const Footer = () => {
  return (
    <>
      <div className="bg-white flex-col py-5">
        <div className="mb-5 text-indigo-600 font-bold text-2xl hover:text-indigo-500">
          <Logo />
        </div>
        <div className="flex justify-center space-x-4">
          <a href="">About</a>
          <a href="">Careers</a>
          <a href="">Help</a>
          <a href="">Partner</a>
          <a href="">Privacy</a>
          <a href="">Terms</a>
          <a href="">Referral</a>
          <a href="">Text to Speech</a>
          <a href="">About</a>
        </div>
      </div>
    </>
  );
};

export default Footer;
