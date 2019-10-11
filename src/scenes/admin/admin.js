import React from 'react';
import { arrayOf } from 'prop-types';

import { productPropTypes } from '../../common/propTypes';
import { ProductLink } from '../../components/ProductLink/ProductLink';

export const AdminPage = ({ productList }) => (
    <div>
        {productList.map(({id, title}) => <ProductLink key={id} id={id} title={title} />)}
    </div>
);

AdminPage.prototype = {
    productList: arrayOf(productPropTypes).isRequired
}