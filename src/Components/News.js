import React, { Component } from 'react'
import NewsItems from './NewsItems'
import   Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        country: 'in',
        category: 'general'
      }

      static propTypes = {
          country: PropTypes.string,
          category: PropTypes.string
      }

      capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    constructor(props){
        super(props);
        console.log("Hello i am constructor from news component");
        this.state = {
            articles: [],
            loading: false,
            page:1,
            totalResults: 0
        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)} - Sama4`;
    }

    async updateNews() {
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=9`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles , totalResults: parsedData.totalResults,loading: false})
    }


    async componentDidMount() {
      
        this.updateNews();
    }

    handleNextClick = async () =>{
        console.log("Next")
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aba2a3f279eb4473a230d524d6afb68e&page=${this.state.page + 1}&pageSize=9`;
        // this.setState({loading:true})
        //  let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);  
        //     this.setState ({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading: false
        //     })
            this.setState({page: this.state.page + 1 });
            this.updateNews();
    }

    handlePrevClick = async ()=>{

        console.log("Previous");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page - 1}&pageSize=9`;
        // this.setState({loading:true})
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);  
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })

        // this.setState({page: this.state.page-1});
        // this.updateNews();
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }
    
    fetchMoreData = async () => {  
        this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=9`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
      };

    render() {
        return (
            <div>
                <h1 className="text-center" style={{margin:'30px 0px'}}>Sama4-Top Headlines</h1>
                {this.state.loading && <Spinner></Spinner>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                > 
                <div className="container my-3">
                    <div className="row">
                      {
                           this.state.articles.map((element)=>{
                              return<div className="col-md-4" key={element.url}>
                                    <NewsItems title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                              </div>
                          })
                      }  
                         
                    </div>
                </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}> &#8592; Previous</button>
                    <button disabled={this.state.page === Math.ceil(this.state.totalResults/9)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &#8594;</button>
                </div> */}

            </div>
        )
    }
}

export default News
