import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import image1 from './image1.jpg'


const News = (props) => {

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsdata.io/api/1/news?apikey=${props.apiKey}&language=en&country=${props.country}&category=${props.category}`;
    setLoading(true)

    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    setResults(parseData.results);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
    setPage(parseData.nextPage);
  }

  useEffect(() => {
    document.title = `${capitalize(props.category)} - NewsMonkey`
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsdata.io/api/1/news?apikey=${props.apiKey}&language=en&country=${props.country}&category=${props.category}&page=${page}`
    let data = await fetch(url);
    let parseData = await data.json();
    setPage(parseData.nextPage);
    setResults(results.concat(parseData.results));
    setTotalResults(parseData.totalResults);
  };
  return (
    <>
      <h1 className='text-center' style={{ margin: '35px 0px', marginTop: '90px' }}>NewMonkey - Top <span style={{ textDecoration: "underline" }}>{capitalize(props.category)}</span>  Headlines</h1>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={results.length}
        next={fetchMoreData}
        hasMore={results.length !== totalResults}
        loader={<Spinner />}>
        <div className="container">
          <div className="row">{
            results.map((element) => {
              return <div className="col-md-4" key={element.link}>
                <NewsItem title={element.title && element.title.length > 40 ? element.title.slice(0, 40) + "..." : element.title} description={element.description && element.description.length > 80 ? element.description.slice(0, 80) + "..." : element.description} imageUrl={element.image_url ? element.image_url : image1} newsUrl={element.link} author={element.creator ? element.creator : "Unknown"} date={element.pubDate} source={element.source_id} />
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
  category: 'top'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News