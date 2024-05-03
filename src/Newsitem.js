import React from 'react';

const Newsitem =(props)=> {
  
 
    const { title, description, imageUrl,newsUrl,publishedAt,author } = props; // Added 'imageUrl' prop
    return (
      <div>
        <div className="card">
          <img src={!imageUrl?"https://d.newsweek.com/en/full/2380155/bryan-kohberger.jpg":imageUrl} className="card-img-top" alt=".." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(publishedAt).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-navy btn-dark">Read more...</a>
          </div>
        </div>
      </div>
    );
  
}

export default Newsitem;
