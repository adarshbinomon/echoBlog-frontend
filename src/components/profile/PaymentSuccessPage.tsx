import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const [countdown, setCountdown] = useState<number>(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prevCount) => prevCount - 1);
      }
    }, 1000);
    setTimeout(() => {
      navigate("/edit-profile/premium");
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center h-screen">
      <div>
        <img
          src="https://www.lappymaker.com/images/greentick-unscreen.gif"
          alt="Success"
          className="w-48"
        />
      </div>
      <div>
        <p className="text-lg font-semibold">Premium Subscription Successful</p>
        <p>{countdown}</p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
