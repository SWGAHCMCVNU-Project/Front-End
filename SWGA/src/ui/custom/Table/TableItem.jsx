import { Table } from "antd";
import "./TableItem.scss";

export const TableItem = ({ columns, dataSource, handleSort, limit, setLimit, label, elements, page, setPage, handleRowClick, expandable }) => {

    return (
        <div className="table-responsive">
            <Table
                columns={columns}
                dataSource={dataSource}
                onChange={handleSort}
                pagination={{
                    pageSize: limit,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20', '30'],
                    onShowSizeChange: (current, size) => setLimit(size),
                    locale: { items_per_page: label },
                    current: page,
                    total: elements,
                    onChange: (page) => setPage(page)
                }}
                onRow={(record) => ({
                    onClick: (columnKey) => handleRowClick(record, columnKey)
                })}
                expandable={expandable}
                className="ant-border-space custom-table"
            />
        </div>
    );
}