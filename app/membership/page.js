'use client'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import {useEffect, useState} from 'react';
import Loader from '../components/Loader';

const Membership = () => {
  const [isUserPremium,setIsUserPremium]=useState(false);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    verifyPremiumUser();
  },[])
    
  const verifyPremiumUser=async()=>{
   try {
    setLoading(true);
    const res=await axios.get(BASE_URL+'/premium/verify',{withCredentials:true});
    if(res?.data?.premium){
      setIsUserPremium(true);
    }
   } catch (error) {
    console.log('Error',error);
   }finally{
    setLoading(false);
   }
  }
    const membershipHandler=async(type)=>{
        try {
            const res=await axios.post(BASE_URL + '/payment/create/order',{type:type},{withCredentials:true});
          
           if(res?.data?.success){
              const order=res?.data?.data;
              const options = {
                key: res?.data?.key, 
                amount: order.amount, 
                currency: order.currency,
                name: order.notes.firstName,
                description: 'Membership transaction',
                order_id: order.orderId, 
                handler:verifyPremiumUser, 
                theme: {
                  color: '#F37254'
                },
              };
              const rzp = new Razorpay(options);
              rzp.open();
           }
        } catch (error) {
            console.error(error);
        }
    }

    if(loading){
      return <div><Loader/></div> 
    }

  return isUserPremium ?(<>
    <div className="text-2xl flex justify-center items-center h-screen font-bold">You are premium user</div>
  </>):(
    <div className="mb-18 mt-6">
   <div className="font-bold text-lg text-center mb-8">Silver and Gold Membership </div>
   <div className="flex  flex-col items-center md:flex-row md:justify-center gap-20">
   <div className=" w-84 shadow-sm">
  <figure>
    <img
    className="w-80 pl-10"
      src="https://www.warrandytefc.com/wp-content/uploads/2016/11/Silver-membership-wfc-400x400.jpg"
      alt="Silver Membership" />
  </figure>
  <div className="card-body pt-3 pl-[54px]">
    <h2 className="card-title">Silver MemberShip Benefits</h2>
     <ul className="list-disc">
     <li>Chat with members for 3 months</li>
    <li>Send requests to up to 50 users per day</li>
    <li>Access to exclusive member-only content</li>
    <li>Receive priority customer support</li>
    <li>Discounts on premium features and services</li>
     </ul>
    <div className="card-actions justify-end mt-3">
      <button className="btn btn-secondary w-full" onClick={()=>membershipHandler('silver')}>Buy Now</button>
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
    <h2 className="card-title mt-8">Gold MemberShip Benefits</h2>
     <ul  className="list-disc">
     <li>Chat with members for 9 months</li>
    <li>Send requests to up to 100 users per day</li>
    <li>Access to exclusive member-only content</li>
    <li>Receive priority customer support</li>
    <li>Discounts on premium features and services</li>
     </ul>
    <div className="card-actions justify-end mt-4">
      <button className="btn btn-warning text-white w-full" onClick={()=>membershipHandler('gold')}>Buy Now</button>
    </div>
  </div>
</div>
   </div>
    </div>
 
  )
}

export default Membership;