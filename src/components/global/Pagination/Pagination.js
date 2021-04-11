import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Pagination as BootstrapPagination } from "react-bootstrap";

const Pagination = ({ active, total, perPage, eachSide, onChange }) => {
  const lastPage = useMemo(() => Math.ceil(total / perPage), [total, perPage]);
  const startPage = useMemo(() => (active > eachSide ? active - eachSide : 1), [
    active,
    eachSide,
  ]);
  const endPage = useMemo(() => {
    if (active > eachSide) {
      return active + eachSide;
    }

    let last = 0;
    for (
      let number = startPage;
      number <= startPage + (perPage - 1);
      number++
    ) {
      if (number > lastPage) {
        break;
      }

      last = number;
    }

    return last;
  }, [startPage, active, eachSide, perPage, lastPage]);

  const PaginationItems = useMemo(() => {
    const items = [];

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <BootstrapPagination.Item
          key={number}
          active={active === number}
          onClick={() => onChange(number)}
        >
          {number}
        </BootstrapPagination.Item>
      );
    }

    return items;
  }, [active, startPage, endPage, onChange]);

  return (
    <BootstrapPagination>
      {startPage > 1 && (
        <>
          <BootstrapPagination.First onClick={() => onChange(1)} />
          <BootstrapPagination.Prev onClick={() => onChange(active - 1)} />
          <BootstrapPagination.Item onClick={() => onChange(1)}>
            {1}
          </BootstrapPagination.Item>
          <BootstrapPagination.Ellipsis />
        </>
      )}

      {PaginationItems.map((PaginationItem) => PaginationItem)}

      {endPage < lastPage && (
        <>
          <BootstrapPagination.Ellipsis />
          <BootstrapPagination.Item onClick={() => onChange(lastPage)}>
            {lastPage}
          </BootstrapPagination.Item>
          <BootstrapPagination.Next onClick={() => onChange(active + 1)} />
          <BootstrapPagination.Last onClick={() => onChange(lastPage)} />
        </>
      )}
    </BootstrapPagination>
  );
};

Pagination.defaultProps = {
  eachSide: 3,
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  eachSide: PropTypes.number,
  onChange: PropTypes.func,
};

export default Pagination;
