import React, { Fragment } from "react";
import { useFetch } from '../customHooks';

export default function HackerNews() {
  const stories = useFetch('https://news-proxy-server.appspot.com/topstories', []);

  const Article = ({ by, time, title, url }) => (
    <div className="Stories">
      <a href={url}>{title}</a>
      <div>
        {by} - {new Date(time * 1000).toLocaleString()}
      </div>
    </div>
  );

  const RenderNews = ({ stories }) => (
    <Fragment>
      <h3>Stories</h3>
      {stories.map( article => (
        <Article key={article.id} {...article} />
      ))}
    </Fragment>
  );

  return stories ? <RenderNews stories={stories} /> : <div>Loading...</div>;
}
