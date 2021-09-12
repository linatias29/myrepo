import React, {Component} from 'react';
import './ShopProducts.css';

import Event from '../NewShopProduct/Event';


export default class ShopProducts extends Component {
    constructor(props, context) {
        super(props, context);
      
    }
 

      render() {
      
    return (
      
    <div className='products-details-e'>

      { this.props.products.map((item,index)=>{
          return  <Event product={item} user={this.props.user} setTotal={this.props.setTotal} updateUser={this.props.updateUser} updateShopProduct={this.props.updateShopProduct}/>

        })}
      

    </div>

    );
  }
}
