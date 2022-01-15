import React from 'react';
import './App.css';
import './components/Card/Card.js'
import Card from './components/Card/Card.js';
import { useForm } from "react-hook-form";


let baseUrl = "http://localhost:5000"


function App() {

  const [cards, cardsSet] = React.useState([]);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {

    // $("#exampleModal").modal("hide");
    console.log(data)

    fetch(baseUrl + "/api/card/create", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data)

    })
      .then((res) => res.json())
      .then((data) => {
        cardsSet(cards => [...cards, data]);
      })
      .catch((err) => console.log(err))
  }

  const onDelete = card => {

    fetch(baseUrl + "/api/card/" + card._id, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        cardsSet(cards.filter(c => c._id != card._id));
      })
      .catch((err) => console.log(err))
  }

  React.useEffect(() => {
    async function fetchCards() {
      const fullResponse = await fetch(baseUrl + "/api/card");
      const responseJson = await fullResponse.json();
      console.log(responseJson);
      cardsSet(responseJson);
    }
    fetchCards();
  }, []);

  

  return (
    <div className="App" >
      <div className='cards' >
        <div className='container'>
          <div className='row'>
          {
            cards.map((card, index) => 
              <Card 
                key={index}
                card={card}
                onDelete={onDelete}></Card>
            )
          }
          </div>
        </div>
      </div>
      <div className='footer'>
        <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal">New Card</button>
      </div>


      <div className="modal" tabIndex="-1" id="exampleModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">New Card</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" className="form-control" placeholder="Enter title" {...register("title", { required: true })}/>
                  {errors.title && <span>This field is required</span>}
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea className="form-control"  placeholder="Enter description" {...register("description", { required: true })}></textarea>
                  {errors.description && <span>This field is required</span>}
                </div>
                <div className="form-group">
                  <label>Image Url</label>
                  <input type="text" className="form-control" placeholder="Enter image url" {...register("imageUrl", { required: true })}/>
                  {errors.imageUrl && <span>This field is required</span>}
                </div>
              
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary">Save changes</button>
            </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
