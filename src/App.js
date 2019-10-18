import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Modal from 'react-modal';
import s from './App.module.css';
import { routes } from './routes';
import { AdminPage } from './scenes/admin/admin';
import { products } from './data/products';
import { UserPage } from './scenes/user/user';

const getProducts = async () => new Promise(
  (resolve) => {
    setTimeout(() => resolve(products), 1000)
  }
);

const customStyleModal = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    height: '40%',
    border: '2px solid #317996',
    borderRadius: '5px',
  }
};

Modal.setAppElement('#root');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
      modalIsOpen: false,
    };
    this.updateProduct = this.updateProduct.bind(this);
    this.onDeleted = this.onDeleted.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleAddProduct = this.handleAddProduct.bind(this);
  };

  async componentDidMount() {
    const prods = await getProducts(); 
    this.setState({
      products: prods,
      loading: false,
    });
  };

  updateProduct(newProduct) {
    this.setState({
        products: this.state.products.map((oldProduct) => {
            if(oldProduct.id === newProduct.id) {
                return newProduct;
            }
            return oldProduct;
        }),

    })
  }

  onDeleted(id) {
    const newProdList = this.state.products.filter((i) => i.id !== id);
    this.setState({
      products: newProdList,
    });
  };

  openModal() {
    this.setState({
      modalIsOpen: true,
    });
  };

  closeModal() {
    this.setState({
      modalIsOpen: false,
    });
  };

  handleAddProduct(item) {
    let newProducts = this.state.products;
    newProducts.push(item);
    this.setState({
      products: newProducts,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const idValue = this.state.products.length + 1;
    const titleValue = e.target.title.value;
    const priceValue = Number(e.target.price.value);
    const descriptionValue = e.target.description.value;
    const imageValue = e.target.image.value;
    const product = {
      id: idValue,
      title: titleValue,
      price: priceValue,
      description: descriptionValue,
      image: imageValue,
    }
    this.handleAddProduct(product);
    this.closeModal();
  }
  
  render() {
    if(this.state.loading) {
      return <h1>Please wait...</h1>
    }
    return (
      <>
        <div className={s.App}>
          <div className={s.nav}>
            <Link to={routes.home}>Home</Link>
            <Link to={routes.admin}>Admin</Link>
          </div>
          <Switch>
            <Route
              path={routes.admin}
              render={(renderProps) => (<AdminPage
                productList={this.state.products}
                updateProduct={this.updateProduct}
                onDeleted={this.onDeleted}
                onOpenModal={this.openModal}
                {...renderProps} />)
              }
            />
            <Route path={routes.home}>
              <UserPage products={this.state.products} />
            </Route>
          </Switch>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyleModal}
            contentLabel='Add product.'   
          >
            <form className={s.form} onSubmit={this.onSubmit} name='addProduct'>
              <button className={s.btn} onClick={this.closeModal}></button>
              <h3>Add product</h3>
              <label>
                <span>Enter title: </span>
                <input name='title' type='text' defaultValue='' placeholder='Title' />
              </label>
              <label>
                <span>Enter description: </span>
                <input name='description' type='textArea' defaultValue='' placeholder='Description' />
              </label>
              <label>
                <span>Enter image: </span>
                <input name='image' type='text' defaultValue='' placeholder='Write link on image' />
              </label>
              <label></label>
              <label>
                <span>Enter price: </span>
                <input name='price' type='text' defaultValue='' placeholder='Price' />
              </label>
              <button>Add product</button>
              
            </form>
          </Modal>
        </div>
      </>
    );
  }
};

export default App;
