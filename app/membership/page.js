'use client'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'

const Membership = () => {

    const membershipHandler=async(type)=>{
        try {
            const res=await axios.post(BASE_URL + '/payment/create/order',{type:type},{withCredentials:true});
            console.log(res);
           if(res?.data?.success){
              const order=res?.data?.data;
              console.log('order',order.orderId)
              const options = {
                key: res?.data?.key, 
                amount: order.amount, 
                currency: order.currency,
                name: order.notes.firstName,
                description: 'Test Transaction',
                order_id: order.orderId, // This is the order_id created in the backend
                callback_url: 'http://localhost:3000/payment-success', // Your success URL
                theme: {
                  color: '#F37254'
                },
              };
              const rzp = new Razorpay(options);
              console.log('rzp',rzp)
              rzp.open();
           }
        } catch (error) {
            console.error(error);
        }
    }


  return (
    <div className="mb-18 mt-6">
   <div className="font-bold text-lg text-center mb-8">Silver and Gold Membership </div>
   <div className="flex justify-center gap-20">
   <div className=" w-84 shadow-sm">
  <figure>
    <img
    className="w-80 pl-10"
      src="https://www.warrandytefc.com/wp-content/uploads/2016/11/Silver-membership-wfc-400x400.jpg"
      alt="Silver Membership" />
  </figure>
  <div className="card-body pt-0">
    <h2 className="card-title">Silver MemberShip Benefits</h2>
     <ul>
     <li>Chat with members for 3 months</li>
    <li>Send requests to up to 50 users per day</li>
    <li>Access to exclusive member-only content</li>
    <li>Receive priority customer support</li>
    <li>Discounts on premium features and services</li>
     </ul>
    <div className="card-actions justify-end mt-3">
      <button className="btn btn-secondary" onClick={()=>membershipHandler('silver')}>Buy Now</button>
    </div>
  </div>
</div>
  <div className=" w-84 shadow-sm">
  <figure>
    <img
    className="w-80  p-3 mt-10"
      src="https://static.vecteezy.com/system/resources/previews/041/646/741/non_2x/vip-membership-card-with-gold-elements-free-vector.jpg"
      alt="Silver Membership" />
  </figure>
  <div className="card-body ">
    <h2 className="card-title mt-4">Gold MemberShip Benefits</h2>
     <ul>
     <li>Chat with members for 9 months</li>
    <li>Send requests to up to 100 users per day</li>
    <li>Access to exclusive member-only content</li>
    <li>Receive priority customer support</li>
    <li>Discounts on premium features and services</li>
     </ul>
    <div className="card-actions justify-end mt-3">
      <button className="btn btn-warning text-white" onClick={()=>membershipHandler('gold')}>Buy Now</button>
    </div>
  </div>
</div>
   </div>
    </div>
 
  )
}

export default Membership;