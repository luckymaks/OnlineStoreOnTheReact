import React from 'react';
import { number, string } from 'prop-types';
import { Link } from 'react-router-dom';
import { formatRoute } from 'react-router-named-routes';
import { routes } from '../../routes';


export const AdminProductLink = ({ id, title }) => (
    <>
        <Link to={formatRoute(routes.adminProduct, { id })}>{title}</Link>
    </>
);

export const UserProductLink = ({id, title, image, price, styles}) => (
    <>
        <Link to={formatRoute(routes.product, { id })} >
            <div className={styles.image}>
                <img src={image} alt={title} title={title} />
            </div>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.price}>
                {price}
            </div>
        </Link>
    </>
)

AdminProductLink.propTypes = {
    id: number.isRequired,
    title: string.isRequired
};