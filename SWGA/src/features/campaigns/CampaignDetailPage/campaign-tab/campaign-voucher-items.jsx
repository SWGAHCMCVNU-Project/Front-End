import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Pagination } from "antd";
import { useCampaignVoucherItem } from "../useCampaignVoucherItem";
import Table from "../../../../ui/Table";
import Spinner from "../../../../ui/Spinner";
import Empty from "../../../../ui/Empty";
import { formatCurrency } from "../../../../utils/helpers";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

function CampaignVoucherItems() {
    const navigate = useNavigate();
    const { 
        isLoading, 
        error, 
        campaignVoucherItems,
        voucherGroups,
        selectedVoucherId,
        pagination,
        handlePageChange,
        handlePageSizeChange,
        pageSize,
        isBought,
        isUsed
    } = useCampaignVoucherItem();

    if (isLoading && !campaignVoucherItems?.length) return <Spinner />;
    if (error) return <div>Error: {error.message}</div>;

    // Lấy danh sách items thuộc voucher được chọn
    const currentVoucherGroup = voucherGroups[selectedVoucherId] || {};
    const currentVoucherInfo = currentVoucherGroup.voucher || {};
    let filteredItems = currentVoucherGroup.items || [];

    // Nếu không có items nào cho voucher được chọn
    if (!filteredItems.length && selectedVoucherId) return <Empty resource="voucher items for this voucher" />;
    if (!selectedVoucherId) return <Empty resource="voucher (please select a voucher)" />;

    // Áp dụng bộ lọc trạng thái phía client
    filteredItems = filteredItems.filter(item => {
        if (isBought === null && isUsed === null) return true; // "Tất cả"
        if (isBought === false && isUsed === false) return item.status === "Khả dụng"; // "Khả dụng"
        if (isBought === true && isUsed === false) return item.status === "Đã mua"; // "Đã mua"
        if (isBought === true && isUsed === true) return item.status === "Đã sử dụng"; // "Đã sử dụng"
        return false;
    });

    // Giới hạn số lượng items hiển thị dựa trên pageSize và trang hiện tại
    const startIndex = (pagination.currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);

    const columns = "5rem 30rem 20rem 15rem 15rem 15rem";

    const allItemsForVoucher = currentVoucherGroup.items || [];
    const availableCount = allItemsForVoucher.filter(item => item.status === "Khả dụng").length;
    const boughtCount = allItemsForVoucher.filter(item => item.status === "Đã mua").length;
    const usedCount = allItemsForVoucher.filter(item => item.status === "Đã sử dụng").length;

    const rawChartData = [
        { name: "Khả dụng", value: availableCount, displayValue: availableCount },
        { name: "Đã mua", value: boughtCount, displayValue: boughtCount },
        { name: "Đã sử dụng", value: usedCount, displayValue: usedCount },
    ];

    const chartData = rawChartData.map(item => ({
        ...item,
        value: item.value === 0 ? 0.001 : item.value,
    }));

    const COLORS = ["#36A2EB", "#FFCE56", "#FF6384"];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const total = rawChartData.reduce((sum, entry) => sum + entry.displayValue, 0);
            const value = payload[0].payload.displayValue;
            const percentage = total === 0 ? 0 : ((value / total) * 100).toFixed(2);
            return (
                <div style={{ backgroundColor: "#fff", padding: "5px", border: "1px solid #ccc" }}>
                    <p>{`${payload[0].name}: ${value} (${percentage}%)`}</p>
                </div>
            );
        }
        return null;
    };

    const renderLegend = () => {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                {rawChartData.map((entry, index) => (
                    <div key={`legend-${index}`} style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
                        <div
                            style={{
                                width: "12px",
                                height: "12px",
                                backgroundColor: COLORS[index % COLORS.length],
                                marginRight: "5px",
                            }}
                        />
                        <span>{entry.name}</span>
                    </div>
                ))}
            </div>
        );
    };

    // Xác định xem có cần disable nút chuyển trang không
    const totalPages = Math.ceil(filteredItems.length / pageSize);
    const disablePaginationButtons = filteredItems.length <= pageSize;

    return (
        <div className="table-container">
            <div className="voucher-info">
                <h3>{currentVoucherInfo.name || currentVoucherInfo.voucherName || 'Chưa có tên voucher'}</h3>
                <p>Tổng số: {filteredItems.length} voucher items</p>
            </div>
            <Table columns={columns}>
                <Table.Header>
                    <div>STT</div>
                    <div>Mã</div>
                    <div>Tên</div>
                    <div>Giá Trị</div>
                    <div>Ngày tạo</div>
                    <div>Trạng thái</div>
                </Table.Header>
                <Table.Body
                    data={paginatedItems} // Sử dụng paginatedItems thay vì filteredItems
                    render={(item, index) => {
                        const displayedIndex = startIndex + index + 1;
                        return (
                            <Table.Row key={item.id}>
                                <div>{displayedIndex}</div>
                                <div>{item.id || "N/A"}</div>
                                <div>{currentVoucherInfo.name || currentVoucherInfo.voucherName || 'Chưa có tên voucher'}</div>
                                <div>{formatCurrency(currentVoucherInfo.price || 0)}</div>
                                <div>{format(new Date(item.createdAt), "dd/MM/yyyy")}</div>
                                <div>{item.status}</div>
                            </Table.Row>
                        );
                    }}
                />
            </Table>
            <Pagination
                current={pagination.currentPage}
                total={filteredItems.length}
                pageSize={pageSize}
                onChange={handlePageChange}
                onShowSizeChange={handlePageSizeChange}
                showSizeChanger
                pageSizeOptions={['10', '20', '50']}
                disabled={disablePaginationButtons} // Disable nút chuyển trang nếu không cần phân trang
                showSizeChangerDisabled={false} // Đảm bảo showSizeChanger không bị disable
                style={{ marginTop: '1rem', textAlign: 'right' }}
            />
            <div style={{ marginTop: '2rem', textAlign: 'center', maxWidth: '400px', margin: '2rem auto' }}>
                <h4>Tỉ lệ trạng thái</h4>
                {renderLegend()}
                <PieChart width={430} height={400}>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label={({ name, value, payload }) => {
                            const total = rawChartData.reduce((sum, entry) => sum + entry.displayValue, 0);
                            const displayValue = payload.displayValue;
                            const percentage = total === 0 ? 0 : ((displayValue / total) * 100).toFixed(2);
                            return displayValue > 0 ? `${name}: ${percentage}%` : null;
                        }}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </div>
        </div>
    );
}

export default CampaignVoucherItems;