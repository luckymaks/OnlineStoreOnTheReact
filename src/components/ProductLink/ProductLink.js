import React from 'react';
import { number, string } from 'prop-types';
import { Link } from 'react-router-dom';
import { formatRoute } from 'react-router-named-routes';
import { routes } from '../../routes';


export const ProductLink = ({ id, title }) => (
    <>
        <Link to={formatRoute(routes.adminProduct, { id })}>{title}</Link>
    </>
);

ProductLink.propTypes = {
    id: number.isRequired,
    title: string.isRequired
};