import React, { Component } from 'react'
//import axios from 'axios'

export default class Destacados extends Component {
    constructor() {
    super();
    this.state = {
          name: '',
          title: '',
          image: '',
          description: '',
          price: '',
          amount: '',
          amountdos: '',
          amounttres: '',
          _id: '',
          posts: []
        
       
      };
      this.handleChange = this.handleChange.bind(this);
      this.addPost = this.addPost.bind(this);

    }

   addPost(e){
    e.preventDefault();
    if(this.state._id) {
      fetch(`http://localhost:4000/api/post/${this.state._id}`, {
        method: 'PUT',
          //body: JSON.stringify(this.state),
          body: JSON.stringify({
            name: this.state.name,
            title: this.state.title,
            image: this.state.image,
            description: this.state.description,
            price: this.state.price,
            amount: this.state.amount,
            amountdos: this.state.amountdos,
            amounttres: this.state.amounttres

          }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          this.setState({name: '', title: '', image: '', description: '', price: '', amount: '', amountdos: '', amounttres: '',_id: '' });
          this.fetchPosts();
        });

    }else{
           // fetch('https://stelenapp.herokuapp.com/api/post/add',{       
            fetch('http://localhost:4000/api/post/add',{
              method: 'POST',
              body: JSON.stringify(this.state),
          
              headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
              }
            })
            .then(res => res.json(res))
            .then(data => {
                console.log(data)
                this.setState({name: '', title: '', image: '', description: '', price: '', amount: '', amountdos: '', amounttres: ''});
                this.fetchPosts();
     
            })
            .catch(err => console.error(err));
            console.log(this.state);

    }
 
      
   }

   componentDidMount() {
    this.fetchPosts();

  }

   fetchPosts() {
    //fetch('http://localhost:400.com/api/post')
    fetch('http://localhost:4000/api/post')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({posts: data});
        //console.log(this.state.posts)
      });

      
  }

  deletePost(_id){ 
       // fetch(`https://stelenapp.herokuapp.com/api/post/delete/${_id}`, {
          fetch(`http://localhost:4000/api/post/delete/${_id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            this.fetchPosts();
          });
      
    }


    editPost(_id) {
      fetch(`http://localhost:4000/api/post/${_id}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({
            name: data.name,
            title: data.title,
            image: data.image,
            description: data.description,
            price: data.price,
            amount: data.amount,
            amountdos: data.amountdos,
            amounttres: data.amounttres,

            _id: data._id
          });
        });
    }



   handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

    render() {
        return (
            <div >
                <div className="col-md-6 offset-md-3">
                   <div className="card card-body">
                     <h4>Actualizar sus productos</h4>
                       <form onSubmit={this.addPost}>
                    
                    {/* Name */}
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            
                            name="name"
                            onChange={this.handleChange} 
                            value={this.state.name}
                            required />
                    </div>
                    {/* title */}
                    <div className="form-group">
                         <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            name="title"
                            onChange={this.handleChange} 
                            value={this.state.title}
                            required />
                    </div>

                     {/* Image */}
                     <div className="form-group">
                         <input
                            type="text"
                            className="form-control"
                            placeholder="Image"
                            name="image"
                            onChange={this.handleChange} 
                            value={this.state.image}
                            required />
                    </div>

                      {/* description */}
                    <div className="form-group">
                         <input
                            type="text"
                            className="form-control"
                            placeholder="Description"
                            name="description"
                            onChange={this.handleChange} 
                            value={this.state.description}
                            required />
                    </div>

                    {/* price */}
                  <div className="form-group">
                         <input
                            type="text"
                            className="form-control"
                            placeholder="Price"
                            name="price"
                            onChange={this.handleChange} 
                            value={this.state.price}
                            required />
                    </div>

                        {/* amount */}
                  <div className="form-group">
                         <input
                            type="text"
                            className="form-control"
                            placeholder="Amount"
                            name="amount"
                            onChange={this.handleChange} 
                            value={this.state.amount}
                            required />
                    </div>


                        <div className="form-group">
                         <input
                            type="text"
                            className="form-control"
                            placeholder="amountdos"
                            name="amountdos"
                            onChange={this.handleChange} 
                            value={this.state.amountdos}
                            required />
                    </div>

                <div className="form-group">
                         <input
                            type="text"
                            className="form-control"
                            placeholder="amounttres"
                            name="amounttres"
                            onChange={this.handleChange} 
                            value={this.state.amounttres}
                            required />
                    </div>


                    
                  
                    <button className="btn btn-primary">
                        Guardar <i className="material-icons">
                            producto
                             </i>
                    </button>
                </form>
            </div>
          </div>




        <section className="section">
      <h2 className="section-title"></h2>
      <div className="products-center">
          {
         this.state.posts.map(post => (
  <article className="product" key={post._id}>
  <div className="img-container">
    <img src={post.image} alt={post.title || "default title"} />
   
  
  </div>
  <div className="product-footer">
    <p className="product-title">{post.name || "default title"}</p>
    <p className="product-title">{post.title || "default title"}</p>
    <p className="product-price">${post.price || 0}</p>
    <button onClick={() => this.deletePost(post._id)} className="btn light-blue darken-4">
        <i className="btn btn-danger">delete</i> 
    </button>
    <button onClick={() => this.editPost(post._id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
          <i className="btn btn-danger">edit</i>
    </button>
  </div>
  
</article>))

 
}
</div>
 </section>


         
            </div>





        )
    }
}