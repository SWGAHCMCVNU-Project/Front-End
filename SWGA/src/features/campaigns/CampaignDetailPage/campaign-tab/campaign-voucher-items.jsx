import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Pagination } from "antd";
import { useCampaignVoucherItem } from "../useCampaignVoucherItem";
import Table from "../../../../ui/Table";
import Spinner from "../../../../ui/Spinner";
import Empty from "../../../../ui/Empty";
import { formatCurrency } from "../../../../utils/helpers";
import Button from "../../../../ui/Button";
import ButtonGroup from "../../../../ui/ButtonGroup";
import DataItem from "../../../../ui/DataItem";

function CampaignVoucherItems() {
    const navigate = useNavigate();
    const { 
        isLoading, 
        error, 
        campaignVoucherItems,
        voucherGroups,
        selectedVoucherId,
        pagination,
        page,
        limit,
        handlePageChange,
        handleLimitChange
    } = useCampaignVoucherItem();

    if (isLoading) return <Spinner />;
    if (error) return <div>Error: {error.message}</div>;
    if (!campaignVoucherItems?.length) return <Empty resource="voucher items" />;

    // Lấy thông tin voucher hiện tại
    const currentVoucherGroup = voucherGroups[selectedVoucherId] || {};
    const currentVoucherInfo = currentVoucherGroup.voucher || {};

    // Định nghĩa columns cho Table
    const columns = "5rem 15rem 20rem 15rem 15rem 15rem 10rem";

    return (
        <div className="table-container">
            <div className="voucher-info">
                <h3>{currentVoucherInfo.name || currentVoucherInfo.voucherName || 'Chưa có tên voucher'}</h3>
                <p>Tổng số: {currentVoucherGroup.items?.length || 0} voucher items</p>
            </div>
            <Table columns={columns}>
                <Table.Header>
                    <div>STT</div>
                    <div>Mã</div>
                    <div>Tên</div>
                    <div>Giá trị</div>
                    <div>Ngày tạo</div>
                    <div>Trạng thái</div>
                    <div>Thao tác</div>
                </Table.Header>

                <Table.Body
                    data={campaignVoucherItems}
                    render={(item, index) => {
                        const displayedIndex = (page - 1) * limit + index + 1;
                        const voucherCode = `VI${index.toString().padStart(6, '0')}`;
                        return (
                            <Table.Row key={item.id}>
                                <div>{displayedIndex}</div>
                                <div>
                                    <DataItem
                                        image={currentVoucherInfo.image}
                                        title={voucherCode}
                                    />
                                </div>
                                <div>{currentVoucherInfo.name || currentVoucherInfo.voucherName || 'Chưa có tên voucher'}</div>
                                <div>{formatCurrency(currentVoucherInfo.price || 0)}</div>
                                <div>{format(new Date(item.createdAt), "dd/MM/yyyy")}</div>
                                <div>{item.status}</div>
                                <div>
                                    <ButtonGroup>
                                        <Button
                                            variation="secondary"
                                            size="small"
                                            onClick={() => navigate(`/voucher-items/${item.id}`)}
                                        >
                                            <FaRegEdit />
                                        </Button>
                                        <Button
                                            variation="danger"
                                            size="small"
                                        >
                                            <MdDelete />
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </Table.Row>
                        );
                    }}
                />
            </Table>
            <Pagination
                current={pagination?.currentPage}
                total={campaignVoucherItems?.length || 0}
                pageSize={10}
                onChange={handlePageChange}
                disabled={!campaignVoucherItems?.length || campaignVoucherItems?.length <= 10}
                showSizeChanger={false}
                style={{ marginTop: '1rem', textAlign: 'right' }}
            />
        </div>
    );
}

export default CampaignVoucherItems;