import React from 'react';

const Card = ({ children, style }) => {
  return (
    <div style={{ ...styles.card, ...style }}>
      {children}
    </div>
  );
};

const Button = ({ children, onClick, style, type = 'primary', disabled = false }) => {
  const buttonStyle = {
    ...styles.button,
    ...(type === 'primary' ? styles.primaryBtn : styles.secondaryBtn),
    ...(disabled && styles.disabledBtn),
    ...style
  };

  return (
    <button onClick={onClick} style={buttonStyle} disabled={disabled}>
      {children}
    </button>
  );
};

const Input = ({ placeholder, type = 'text', value, onChange, style, required = false }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      style={{ ...styles.input, ...style }}
    />
  );
};

const Select = ({ options, value, onChange, style, placeholder = 'Select...' }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      style={{ ...styles.input, ...style }}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const Alert = ({ message, type = 'info', onClose }) => {
  const alertStyle = {
    ...styles.alert,
    ...(type === 'success' && styles.successAlert),
    ...(type === 'error' && styles.errorAlert),
    ...(type === 'warning' && styles.warningAlert)
  };

  return (
    <div style={alertStyle}>
      <div style={styles.alertContent}>
        <span>{message}</span>
        {onClose && (
          <button onClick={onClose} style={styles.closeBtn}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

const Table = ({ columns, data, onRowClick, loading = false }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data || data.length === 0) {
    return <p style={styles.noData}>No data available</p>;
  }

  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            {columns.map((col) => (
              <th key={col.key} style={styles.tableHeaderCell}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              style={{
                ...styles.tableRow,
                cursor: onRowClick ? 'pointer' : 'default'
              }}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((col) => (
                <td key={col.key} style={styles.tableCell}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div style={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={styles.paginationBtn}
      >
        Previous
      </button>
      <span style={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={styles.paginationBtn}
      >
        Next
      </button>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s',
    margin: '5px'
  },
  primaryBtn: {
    backgroundColor: '#007bff',
    color: 'white'
  },
  secondaryBtn: {
    backgroundColor: '#6c757d',
    color: 'white'
  },
  disabledBtn: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    marginBottom: '10px',
    boxSizing: 'border-box'
  },
  alert: {
    padding: '15px',
    marginBottom: '20px',
    borderRadius: '4px',
    backgroundColor: '#e3f2fd',
    color: '#1976d2'
  },
  successAlert: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32'
  },
  errorAlert: {
    backgroundColor: '#ffebee',
    color: '#c62828'
  },
  warningAlert: {
    backgroundColor: '#fff3e0',
    color: '#e65100'
  },
  alertContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    color: 'inherit'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px'
  },
  tableHeader: {
    backgroundColor: '#f8f9fa'
  },
  tableHeaderCell: {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
    fontWeight: 'bold'
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
    transition: 'background-color 0.2s'
  },
  tableCell: {
    padding: '12px',
    textAlign: 'left'
  },
  noData: {
    textAlign: 'center',
    padding: '20px',
    color: '#999'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginTop: '20px'
  },
  paginationBtn: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'all 0.3s'
  },
  pageInfo: {
    fontSize: '14px',
    color: '#666'
  }
};

export { Card, Button, Input, Select, Alert, Table, Pagination };
