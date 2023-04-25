import React, { useState } from 'react';
import styles from './scss/Table.module.css';
import moment from 'moment'
import { DataItem } from './TableComponent';
interface FilterComponentProps {
    onFilter: (params: {
        searchTerm: string;
        status: string;
        startDate: Date | null;
        endDate: Date | null;
    }) => void;
    data: DataItem[];
}

const FilterComponent: React.FC<FilterComponentProps> = ({ onFilter }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        if (name === 'searchTerm') {
            setSearchTerm(value);
        } else if (name === 'status') {
            setStatus(value);
        } else if (name === 'startDate' || name === 'endDate') {
            // Check if the value is a valid date string
            if (value && !isNaN(Date.parse(value))) {
                const date = new Date(value);
                if (name === 'startDate') {
                    setStartDate(date);
                } else {
                    setEndDate(date);
                }
            } else {
                if (name === 'startDate') {
                    setStartDate(null);
                } else {
                    setEndDate(null);
                }
            }
        }
    };


    const handleApplyFilter = () => {
        onFilter({ searchTerm, status, startDate, endDate });
        console.log("filter");
    };

    return (
        <div className="filter-component">
            <input
                type="text"
                name="searchTerm"
                className="form-control"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search"
            />
            <select
                className={`form-select ${styles.customSelect} mt-2 mb-2`}
                name="status"
                value={status}
                onChange={handleInputChange}
            >
                <option value="">Status</option>
                <option value="Pending">Pending</option>
                <option value="Fullfilled">Fullfilled</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
                <option value="Received">Received</option>
            </select>
            <input
                type="date"
                name="startDate"
                className="form-control"
                value={startDate ? moment(startDate).format('YYYY-MM-DD') : ''}
                onChange={handleInputChange}
                placeholder="Start Date"
            />

            <input
                type="date"
                name="endDate"
                className="form-control mb-2"
                value={endDate ? moment(endDate).format('YYYY-MM-DD') : ''}
                onChange={handleInputChange}
                placeholder="End Date"
            />

            <button className="btn btn-primary mb-2" onClick={handleApplyFilter}>
                Apply
            </button>
        </div>
    );
};

export default FilterComponent;
