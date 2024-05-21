import { loadStripe, Stripe } from "@stripe/stripe-js";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { UserData } from "../../utils/interfaces/inteface";
import { addUser } from "../../redux/slices/userSlices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const userServiceBaseUrl = import.meta.env.VITE_USER_SERVICE_BASEURL;

const EditProfilePremium = () => {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentProcessing, setPaymentProcessing] = useState<string>();

  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );
  useEffect(() => {
    setTimeout(() => {
      setPaymentProcessing("false");
      localStorage.setItem("buttonClicked", "false");
    }, 60000);
  }, [paymentProcessing]);

  useEffect(() => {
    axios
      .get(`${userServiceBaseUrl}/user-profile/${userData?._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status) {
          dispatch(addUser(res.data.user));
        }
      })
      .catch((error) => {
        console.log(error.response.status);
      });
  }, [navigate, dispatch, userData?._id]);

  useEffect(() => {
    const fetchStripe = async () => {
      const stripeObj = await loadStripe(
        "pk_test_51PAterSHCEnCTktIIVUdZG0hA1oJfwWoD62dQ2UEOqqb7QAoiDPt8TrDIJNnJ956ckPaeCWA0l1FmYfoXjjevfax00zmQE4XKi"
      );
      setStripe(stripeObj);
    };
    fetchStripe();
  }, []);

  const handlePayment = async () => {
    const buttonClicked = localStorage.getItem("buttonClicked");
    if (buttonClicked === "false") {
      localStorage.setItem("buttonClicked", "true");
      setPaymentProcessing("true");

      if (!stripe) return;

      const body = {
        monthlySubscription: 199,
      };

      try {
        const response = await axios.post(
          `${userServiceBaseUrl}/create-checkout-session`,
          JSON.stringify(body)
        );

        const sessionId = response.data.id;

        const result = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });
        if (result.error) {
          console.log(result.error);
        }
      } catch (error) {
        console.error("Error creating checkout session:", error);
      }
    } else if (buttonClicked === "true") {
      toast.error("Payment processing");
    }
  };

  return (
    <div className="min-h-screen flex justify-center">
      {userData.isPremium ? (
        <div>
          <h2 className="text-2xl font-semibold">You are already a member✅</h2>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div>
            <p className="text-2xl my-10 font-serif">
              Support Writers and Access all stories on{" "}
              <span className="font-bold text-indigo-600">EchoBlog</span>
            </p>
          </div>
          <div className="card w-96 bg-white text-primary-content shadow-xl border border-indigo-600">
            <div className="card-body">
              <h2 className="card-title">Get Premium with One time Payment!</h2>
              <p>Get the verified Badge for just 1999/- </p>
              <div className="card-actions justify-end">
                <button
                  onClick={handlePayment}
                  className={`flex space-x-1 items-center text-indigo-700 hover:text-white border border-indigo-700 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2 transition duration-300 ease-in-out bg-white  dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 hover:bg-indigo-700`}
                >
                  Pay ₹ 1999 Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfilePremium;
