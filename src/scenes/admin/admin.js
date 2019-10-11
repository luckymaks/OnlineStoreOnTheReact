import React from 'react';
import { arrayOf } from 'prop-types';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { productPropTypes } from '../../common/propTypes';
import { ProductLink } from '../../components/ProductLink/ProductLink';
import { routes } from '../../routes';
import { ProductContainer } from '../../components/ProductContainer/ProductContainer';

export class AdminPage extends React.Component{
    constructor(props) {
        super(props);
        this.onDeleted = this.onDeleted.bind(this);
    }
    
    onDeleted(id) {
        console.log(id);
        
    }

    render() {
        const { productList, match, updateProduct } = this.props;
        return(
            <div>
                <Route
                    path={match.path}
                    exact
                    render={
                        () => productList.map(({id, title}) => {
                            return (
                                <div>
                                    <ProductLink
                                        key={id}
                                        id={id}
                                        title={title}
                                    />
                                </div>
                            )
                        }
                        )
                    }
                />
                <Route
                    path={routes.adminProduct}
                    render={(renderProps) => <ProductContainer productList={ productList } updateProduct={updateProduct} {...renderProps} />}
                />
            </div>
        )
    }
}

AdminPage.protoType = {
    productList: arrayOf(productPropTypes).isRequired
}