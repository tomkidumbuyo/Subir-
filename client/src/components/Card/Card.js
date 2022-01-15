import React from 'react';

function Card(props) {
    

  return (
    <div className='col-md-3'>
    <div className="card" style={{width: '18rem'}}>
    <img className="card-img-top" src={props.card.imageUrl} alt="image not loaded"/>
    <div className="card-body">
        <h5 className="card-title">{props.card.title}</h5>
        <p className="card-text">{props.card.description}</p>
        <button className="btn btn-danger" onClick={() => props.onDelete(props.card)}>Delete</button>
    </div>
    </div>
    </div>

    );
}

export default Card;