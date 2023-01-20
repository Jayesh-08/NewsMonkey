import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import image1 from './image1.jpg'


const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}&sortBy=publishedAt`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

useEffect(() => {
  document.title = `${capitalize(props.category)} - NewsMonkey`
  updateNews();
  // eslint-disable-next-line
},[]);


  // const handlePreviousClick = async () => {
  //   setPage(page-1);
  //   updateNews();
  // }

  // const handleNextClick = async () => {
  //   setPage(page+1);
  //   updateNews();
  // }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}&sortBy=publishedAt`;
    setPage(page + 1);
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
  };
  return (
    <>
      <h1 className='text-center' style={{ margin: '35px 0px', marginTop: '90px'}}>NewMonkey - Top <span style={{ textDecoration: "underline" }}>{capitalize(props.category)}</span>  Headlines</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}>
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title && element.title.length > 40 ? element.title.slice(0, 40) + "..." : element.title} description={element.description && element.description.length > 80 ? element.description.slice(0, 80) + "..." : element.description} imageUrl={element.urlToImage ? element.urlToImage : image1} newsUrl={element.url} author={element.author ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News