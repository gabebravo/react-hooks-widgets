import React, { Fragment, useState, useEffect } from "react";

export default function HackerNews() {
  const [state, setState] = useState({ news: [] });

  useEffect(() => {
    fetch("https://news-proxy-server.appspot.com/topstories")
      .then(res => res.json())
      .then(json => setState({ ...state, news: json }));
  }, []);

  const Article = ({ by, time, title, url }) => (
    <div className="Stories">
      <a href={url}>{title}</a>
      <div>
        {by} - {new Date(time * 1000).toLocaleString()}
      </div>
    </div>
  );

  const RenderNews = () => (
    <Fragment>
      <h3>Stories</h3>
      {state.news.map((article, index) => (
        <Article key={article.id} {...article} />
      ))}
    </Fragment>
  );

  return state.news.length > 0 ? <RenderNews /> : <div>Loading...</div>;
}
