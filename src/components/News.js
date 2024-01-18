import React, { Component } from "react";

import Newsitems from "./NewsItems";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
  };

  static proptype = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capital = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  // articles = [];

  constructor(props) {
    super(props);
    console.log("Jai Sri Ram");

    this.state = {
      // articles: this.articles,
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capital(this.props.category)} - NewsMonkey `;
  }

  async componentDidMount() {
    this.props.setProgress(10);

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);


    let parseData = await data.json();
    this.props.setProgress(70);


    console.log(parseData.articles);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    console.log(parseData.totalResults);
    this.props.setProgress(100);
  }

  handleNextClick = async () => {
    console.log("Next");

    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country
        }&category=${this.props.category
        }&apiKey=${this.props.apiKey}&page=${this.state.page + 1
        }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);

      let parseData = await data.json();

      // console.log(parseData)

      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
        loading: false,
      });
    }

  };

  handlePrevClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country
      }&category=${this.props.category
      }&apiKey=${this.props.apiKey}&page=${this.state.page - 1
      }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);

    let parseData = await data.json();

    console.log(parseData);

    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
      loading: false,
    });
  };


   fetchMoreData = async () => {
    this.setState({page:this.state.page+1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country
  }&category=${this.props.category
  }&apiKey=${this.props.apiKey}&page=${this.state.page - 1
  }&pageSize=${this.props.pageSize}`;

let data = await fetch(url);

let parseData = await data.json();

console.log(parseData);

this.setState({
  articles: this.state.articles.concat(parseData.articles),
  loading: false,
});

  };


  render() {
    return (
      <>
        <h2 className="text-center">News - Top Headlines</h2>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading && <Spinner />}
        >
          <div className="container my-3 ">
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitems
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
        
      </>
    );
  }
}

export default News;
