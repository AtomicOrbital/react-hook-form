import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTable } from '../../../intl/redux/Action/tableAction';
import styles from './scss/Table.module.css';
import ConfirmModal from "./ConfirmModal";
import EditDataModal from "./EditDataModal";
import { updateData, deleteData } from "../../../intl/redux/Action/tableAction";
import FilterComponent from './FilterComponent';
import moment from 'moment';

export interface DataItem {
    id: number,
    status: string,
    date: string,
    client: string,
    currency: string,
    total: number
}


const TableComponent = () => {
    const dispatch = useDispatch();
    const { data } = useSelector((state: any) => state.tableReducer);
    const [filteredData, setFilteredData] = useState([]);
    const [sortDirection, setSortDirection] = useState("asc");
    const [selectedData, setSelectedData] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState<DataItem | null>(null);
    const [showEditDataModal, setShowEditDataModal] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPage = 10;
    const indexOfLastItem = currentPage * itemsPage;
    const indexOfFirstItem = indexOfLastItem - itemsPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPage);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);

        }
    };

    const Pagination = () => {
        const maxPagesToShow = 2;
        const arrayPages = [];
        const firstPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const lastPage = Math.min(totalPages, firstPage + maxPagesToShow - 1);
        for (let i = firstPage; i <= lastPage; i++) {
            arrayPages.push(
                <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
                    <a className="page-link" href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(i);
                        }}>
                        {i}
                    </a>
                </li>
            );
        }
        return (
            <nav className="d-flex justify-content-center" aria-label="Page navigation example">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <a className="page-link" href="#" aria-label="Previous"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) handlePageChange(currentPage - 1)
                            }}>
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>
                    {arrayPages}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <a className="page-link" href="#" aria-label="Next"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages) handlePageChange(currentPage + 1)
                            }}>
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
    useEffect(() => {
        dispatch(fetchTable());
    }, [dispatch]);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const handleFilter = (params: {
        searchTerm: string;
        status: string;
        startDate: Date | null;
        endDate: Date | null;
    }) => {

        let filtered = data.filter((item: any) => {
            const matchesStatus = params.status
                ? item.status.toLowerCase() === params.status.toLowerCase()
                : true;
            const matchesSearch = params.searchTerm
                ? item.client
                    .toLowerCase()
                    .includes(params.searchTerm.toLowerCase())
                : true;
            const itemDate = moment(item.date);
            const matchesStartDate = params.startDate
                ? itemDate.isSameOrAfter(moment(params.startDate))
                : true;
            const matchesEndDate = params.endDate
                ? itemDate.isSameOrBefore(moment(params.endDate))
                : true;
            return matchesStatus && matchesSearch && matchesStartDate && matchesEndDate;
        });

        setFilteredData(filtered);
    };

    const handleSortByTotal = () => {
        const sortedData = [...filteredData].sort((a: DataItem, b: DataItem) => {
            if (sortDirection === "asc") {
                return a.total - b.total;
            } else {
                return b.total - a.total;
            }
        });

        setFilteredData(sortedData);
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    };

    const handleRowClick = (rowData: any) => {
        setSelectedData(rowData);
        setShowEditDataModal(true);
    };

    const handleDeleteClick = (rowData: any) => {
        setSelectedData(rowData);
        setShowConfirmModal(true);
    };

    const handleUpdateData = (updatedData: any) => {
        setShowEditDataModal(false);
        dispatch(updateData(updatedData));
    };

    const handleDeleteData = () => {
        setShowConfirmModal(false);
        dispatch(deleteData(selectedData.id));
    };

    const handleCancel = () => {
        setShowConfirmModal(false);
        setShowEditDataModal(false);
        setSelectedData(null);
    };

    return (
        <div style={{ backgroundColor: '#f6f7fb' }} className="container">
            {showConfirmModal && (
                <ConfirmModal onCancel={handleCancel} onDelete={handleDeleteData} />
            )}
            {showEditDataModal && (
                <EditDataModal
                    data={selectedData}
                    onCancel={handleCancel}
                    onUpdate={(updatedData: any) => dispatch(updateData(updatedData))}
                />
            )}
            <FilterComponent onFilter={handleFilter} />
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Status</th>
                            <th scope="col">Date</th>
                            <th scope="col">Client</th>
                            <th scope="col">Currency</th>
                            <th scope="col" onClick={handleSortByTotal}>
                                Total {sortDirection === "asc" ? "▲" : "▼"}
                            </th>
                            <th scope="col">Invoice#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item: DataItem, index) => (
                            <tr key={index}>
                                <td className={styles[item.status.toLowerCase()]}>
                                    {item.status}
                                </td>
                                <td>{moment(item.date).format('MM-DD-YYYY')}</td>
                                <td>{item.client}</td>
                                <td>{item.currency}</td>
                                <td>{item.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                                {/* <td>{item.invoiceNumber}</td> */}
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary"
                                        onClick={() => handleRowClick(item)}
                                    >
                                        View Details
                                    </button>
                                </td>
                                <td className="text-danger">
                                    <i className="fa fa-trash" onClick={() => handleDeleteClick(item)}></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <Pagination />
            </div>
        </div>
    );
};
export default TableComponent;
