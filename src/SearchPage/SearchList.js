import React from 'react';
import LayoutRow from '../common/LayoutRow';

const Item = (docData) => {
  const coverURL = `https://beatsaver.com${docData.coverURL}`;
  const allVotes = docData.stats.upVotes + docData.stats.downVotes;
  const percentVotes = (~~((docData.stats.upVotes / allVotes) * 1000)) / 10;

   return (
    <LayoutRow hasBorderBottom>
      <div className="doc__container">
        <div className="doc__cover"><img src={coverURL} /></div>
        <div className="doc__mapdata">
          <div className="doc__name">{docData.metadata.songName}</div>
          <div className="doc__author">{docData.metadata.songAuthorName}</div>
          <div className="doc__mapper">{docData.metadata.levelAuthorName}</div>
        </div>
        <div className="doc__saverdata">
          <div className="doc__key">{docData.key} 🔑</div>
          <div className="doc__downloads">{docData.stats.downloads} 💾</div>
        </div>
        <div className="doc__scoredata">
          <div className="doc__score--upvotes">{docData.stats.upVotes} 👍</div>
          <div className="doc__score--downvotes">{docData.stats.downVotes} 👎</div>
          <div className="doc__score--percentvotes">{percentVotes}% 💯</div>
        </div>
        <div className="doc__cta">
          <div>Copypaste</div>
          <div className="doc__key">!bsr {docData.key}</div>
        </div>
      </div>
    </LayoutRow>
   );

};

export default function ItemList({
  documentList
}) {
  const renderedItems = documentList.map(Item);

  return (
    <div className="SearchList__container">
      <LayoutRow style={{ marginTop: "-45px" }} />
      { renderedItems }
      <LayoutRow />
    </div>
  );
}