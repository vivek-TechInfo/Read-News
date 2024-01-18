import React, { Component } from 'react'
import loading from './loading.gif'

export class spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt=""  style={{height:"90px",fontWeight:"bold"}}/>
      </div>
    )
  }
}

export default spinner
