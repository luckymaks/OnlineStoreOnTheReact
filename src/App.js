import React from 'react';
import { Link, Route } from 'react-router-dom';

import './App.css';
import { routes } from './routes';
import { AdminPage } from './scenes/admin/admin';
import { products } from './data/products';

const getProducts = async () => products;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    }
  };

  async componentDidMount() {
    const prods = await getProducts(); 
    this.setState({
      products: prods,
    })
  };
  render() {
    return (
      <div className="App">
          <p>
            <Link to={routes.admin}>Admin</Link>
          </p>
        <Route
          exact
          path={routes.admin}
          render={
            (renderProps) => (<AdminPage productList={this.state.products} {...renderProps} />)
          }
        />
      </div>
    );
  }
};

export default App;
