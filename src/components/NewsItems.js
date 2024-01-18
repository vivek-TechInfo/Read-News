import React, { Component } from 'react'

export class NewsItems extends Component {

  render() {
    let {title, description, imageUrl , newsUrl ,author,date,source} = this.props
    return (
      <div className='my-3'>
       <div className="card">
        <div style={{
          dislay:"flex",
          justifyContent:"flex-end",
          position:"absolute",
          right:"0"
        }

        }>
       <span className=" badge rounded-pill bg-danger " style={{left:'90%', zIndex:1}}>{source}</span>

        </div>
  <img src={!imageUrl?"https://images.news18.com/ibnlive/uploads/2023/10/bigg-boss-17-ankita-lokhande-sushant-singh-rajput-2023-10-5767239e17bbe458cc1d1c9539e859d1-16x9.jpg?impolicy=website&width=1200&height=675": imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title} <span className="badge rounded-pill bg-primary">New</span></h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-danger">By {!author?"Unknow": author} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl}  rel="noreferrer" target="_blank" className="btn btn-sm btn-dark ">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItems

// https://newsapi.org/v2/top-headlines?country=in&apiKey=aeb831bfc39f49e3b2df270ede0b89e1



