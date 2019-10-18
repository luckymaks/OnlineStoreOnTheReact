import React from 'react';
import s from './ProductComponent.module.css';
import { productPropTypes } from '../../common/propTypes';

export const ProductComponent = ({ id, title, description, onChange, onSubmit, image, price }) => (
    <form onSubmit={onSubmit} className={s.form}>
        <label>
            <input className={s.title} type='text' name="title" value={title} onChange={onChange('title')} />
        </label>
        <label>
            <textarea className={s.description} name="description" value={description} onChange={onChange('description')}></textarea>        
        </label>
        <label>
            <input className={s.price} name="price" value={price} onChange={onChange('price')} />
        </label>
        <label>
            <input className={s.image} name="image" value={image} onChange={onChange('image')} />
        </label>
        <div className={s.btnContainer}>
            <button className={s.btn} type='submit'>Save</button>
        </div>
    </form>
);

ProductComponent.propTypes = productPropTypes;