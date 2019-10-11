import React from 'react';
import { Link, Route } from 'react-router-dom';

import './App.css';
import { routes } from './routes';
import { AdminPage } from './scenes/admin/admin';
import { products } from './data/products';

const getProducts = async () => new Promise(
  (resolve) => {
    setTimeout(() => resolve(products), 1000)
  }
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
    };
    this.updateProduct = this.updateProduct.bind(this);
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

  render() {
    if(this.state.loading) {
      return <h1>Please wait...</h1>
    }
    return (
      <div className="App">
          <p>
            <Link to={routes.admin}>Admin</Link>
          </p>
        <Route
          path={routes.admin}
          render={(renderProps) => (<AdminPage productList={this.state.products} updateProduct={this.updateProduct} {...renderProps} />)}
        />
      </div>
    );
  }
};

export default App;
