import Meteor from  'react-meteor-client';
import { createContainer } from 'meteor/react-meteor-data';
import { OrdersCollection } from '../../../../api/orders.js';
import { Ad } from '../../../../api/ad.js';
import { PaymentInfo } from '../../../../api/payment_info.js';
import ConfirmationOrder from '../components/ConfirmationOrder.jsx';


let container = (props) => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  let order_id = props.match.params.orderId

  var handleOrder = Meteor.subscribe("order", order_id)
  var handlePaymentInfo = Meteor.subscribe("payment_info", order_id, props.currentUser._id);

  console.log(props.match.params.orderId)


  console.log(PaymentInfo.findOne({ 'order_id': order_id }))
  console.log(OrdersCollection.findOne({ '_id': order_id }), '<--- COLLECTION() ')

  return {
    currentUser: props.currentUser,
    loading: !handleOrder.ready() || !handlePaymentInfo.ready(),
    order: OrdersCollection.findOne({ '_id': props.match.params.orderId }),
    ad: Ad.find({}).fetch(),
    payment_info: PaymentInfo.findOne({ 'order_id': props.match.params.orderId })
  };
};

export default OrderContainer = createContainer(container, ConfirmationOrder);
