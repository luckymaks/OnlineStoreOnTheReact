import React from 'react';
import { arrayOf } from 'prop-types';
import { productPropTypes } from '../../common/propTypes';
import { routes } from '../../routes';
import { ProductComponent } from './../ProductComponent/ProductComponent';

export class ProductContainer extends React.Component {
    constructor(props) {
        super(props);
        const { match: { params }, productList } = this.props;
        const product = productList.find(({ id }) => Number(params.id) === id);
        this.state = {
            ...product,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }

    onChange(name) {
        return ({target: { value }}) => {
            this.setState({
                [name]: value,
            })
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.updateProduct(this.state);
        this.props.history.push(routes.admin);
    }

    render() {
        return (
            <ProductComponent
                {...this.state}
                onSubmit={this.onSubmit}
                onChange={this.onChange}
                onClick={this.onGoBack}
            />
        )
    }
}

ProductComponent.propTypes = {
    ProductList: arrayOf(productPropTypes).isRequired
}