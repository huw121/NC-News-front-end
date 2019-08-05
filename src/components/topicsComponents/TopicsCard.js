import React from 'react';

const TopicsCard = ({ slug, description }) => {
  return (
    <article className="article-card">
      <h2>{slug}</h2>
      <p>{description}</p>
    </article>
  );
};

export default TopicsCard;