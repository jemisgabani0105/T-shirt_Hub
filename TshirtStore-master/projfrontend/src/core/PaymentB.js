import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/CartHelper';
import { createOrder } from './helper/orderHelper';
import { getmeToken, processPayment } from './helper/paymentBHelper';

import DropIn from "braintree-web-drop-in-react";

const PaymentB = ({products, setReload =f =>f , reload = undefined}) => {
   
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken : null,
        error:"",
        instance: {}

    });
    const userId =isAuthenticated() && isAuthenticated().user._id;
    const token =isAuthenticated() && isAuthenticated().token;
    
    const getToken =(userId, token) => {
        getmeToken(userId, token)
        .then(info => {
            console.log("INFORMATION",info)
            if(info && info?.error){
                setInfo({...info, error: info?.error})
            }
            else{
                const clientToken =  info.clientToken
                setInfo({clientToken:clientToken })
            }
        })
    }

    const showBTdropin = () => {
        return(
            <div>
                {info.clientToken !==null && products.length >0 ? (
                   <div>
                   <DropIn
                     options={{ authorization: info.clientToken }}
                     onInstance={(instance) => (info.instance = instance)}
                   />
                   <button className="btn btn-block btn-success" onClick={onPurchase}>Buy</button>
                 </div>
                ): (<h3>Please login or add something to cart</h3>)}
            </div>
        )
    }

    useEffect(() => {
       getToken(userId,token)
    }, [])

    const onPurchase = () => {
        setInfo({...info,loading: true})
        let nonce;
        let getNonce = info?.instance
        ?.requestPaymentMethod()
        ?.then( data => {
            nonce = data.nonce
            const paymentData = {
                paymentMethodNonce: nonce,
                amount:getAmount()
            };
            processPayment(userId,token,paymentData)
            .then(response => {
                setInfo({...info, success : response.success,loading:false})
            })
            console.log("PAYMENT SUCCESS")
        })
        .catch(err => {setInfo({...info, loading: false, success: false})
        console.log("PAYMENT SUCCESS")
        
    })


    }
    const getAmount = () => {
        let amount =0
        products.map(p=> {
            amount = amount + p.price
        })
        return amount
    }
   
    return (
        <div>
            <h2>Cart total is {getAmount()}</h2>
            {showBTdropin()}
        </div>
    )
}
export default PaymentB;