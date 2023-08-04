import React from 'react';
import { getPagesArray } from '../../../utils/pages';

const Pagination = function ({ totalPages, page, changePage }) {
    let pagesArray = getPagesArray(totalPages);

    return (
        <div className='page__wrapper'>
            {
                pagesArray.map(pageNumber =>
                    <span
                        onClick={() => changePage(pageNumber)}
                        key={pageNumber}
                        className={pageNumber === page ? 'page page__current' : 'page'}
                    >
                        {pageNumber}
                    </span>
                )
            }
        </div>
    )
}

export default Pagination;