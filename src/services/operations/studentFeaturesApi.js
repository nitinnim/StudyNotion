import {toast} from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from '../../assets/Logo/rzp_logo.png';
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

export async function buyCourse( 
  token,
  courses,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...");

  try {
    // load the script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Razorpay SDK failed to load");
      return;
    }
    // initiate the order
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      { Authorization: `Bearer ${token}` }
    );
    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }
    // console.log("PRINTING orderResponse", orderResponse);

    const options = {
      key: process.env.RAZORPAY_KEY,
      currency: orderResponse.data.message.currency,
      amount: `${orderResponse.data.message.amount}`,
      order_id: orderResponse.data.message.id,
      name: "StudyNotion",
      description: "Thank You for Purchasing the Course",
      image: rzpLogo,
      prefill: {
        name: `${userDetails.firstName}`,
        email: userDetails.email,
      },
      handler: function (response) {
        // send success mail
        sendPaymentSuccessMail(response, orderResponse.data.message.amount, token);
        // verify payment
        verifyPayment({...response, courses}, token, navigate, dispatch);
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("oops, payment failed");
      console.log(response.error);
    });

  } catch (err) {
    console.log("Payment api error - ", err);
    toast.error("Could not make payment");
  }
  toast.dismiss(toastId);
}

async function sendPaymentSuccessMail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (err) {
    console.log("Payment success email error...", err);
  }
}

// verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...");
  dispatch(setPaymentLoading(true));
  console.log("Before verify")
  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });
  console.log("After verify")
    console.log("printing the respojse - ", response)
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Payment Successful, You are added to the course");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (err) {
    console.log("Payment Verification error...", err);
    toast.error("Could not verify payment");
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}
