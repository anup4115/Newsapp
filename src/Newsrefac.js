import React, { Component } from 'react'
import Newsitem from '../Newsitem'
import PropTypes from 'prop-types'

export class News extends Component {
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  static defaultProps={
    country:'nl',
    category: 'general',
    pageSize:6
  }
  static propTypes={
    country:PropTypes.string,
    category:PropTypes.string,
    pageSize:PropTypes.number,
  }

  constructor(props){
    super(props);
    console.log("constructor called");
    this.state={
      articles: [],
      loading:false,
      page:1,
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - News`
  }
  async updateNews(){
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e526e7f48c0f45e38fd2eaa1899900a1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({articles: parsedData.articles , totalResults:parsedData.totalResults})
  
  }
  async componentDidMount(){
    this.updateNews();
  }
  handlePrevClick= async ()=>{
    this.setState({page:this.state.page-1});
    this.updateNews();
  }
  handleNextClick= async ()=>{
    
    
    this.setState({
      page:this.state.page+1})
      this.updateNews();
    }
  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{margin: '35px 0px', marginTop:'90px' }}>{this.capitalizeFirstLetter(this.props.category)} - News !!! </h1>
        <div className="row">
          {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} publishedAt={element.publishedAt} author={element.author}/>
            </div>
          })}
          
        </div>
        <div className="container d-flex justify-content-between my-4">
          <button disabled = {this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled = {(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>

      </div>
    )
  }
}

export default News