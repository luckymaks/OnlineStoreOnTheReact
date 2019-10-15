import React from 'react';
import { arrayOf } from 'prop-types';
import { Route } from 'react-router-dom';
import { productPropTypes } from '../../common/propTypes';
import { ProductLink } from '../../components/ProductLink/ProductLink';
import { routes } from '../../routes';
import { ProductContainer } from '../../components/ProductContainer/ProductContainer';
import s from './admin.module.css';

export class AdminPage extends React.Component{
    render() {
        const { productList, match, updateProduct, onDeleted, onOpenModal } = this.props;
        return(
            <>
                <button onClick={onOpenModal}>Add</button>
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
                                    <button className={s.btnClose} onClick={() => onDeleted(id)} ></button>
                                </div>
                            );
                        })
                    }
                />
                <Route
                    path={routes.adminProduct}
                    exact
                    render={(renderProps) => {
                        return (
                            <>
                            <ProductContainer
                                productList={ productList }
                                updateProduct={updateProduct}
                                {...renderProps}
                            />
                            </>
                        )
                    }}
                />
            </>
        )
    }
}

AdminPage.protoType = {
    productList: arrayOf(productPropTypes).isRequired
}