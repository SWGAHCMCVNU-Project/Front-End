import { Avatar, Spin, Tag, Typography } from "antd";
import {  HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import imgDefaultMajor from "../../../assets/images/majority.png";
import Empty from "../../../ui/Empty";
import Modal from "../../../ui/Modal";
import { ButtonAction } from "../../../ui/custom/Button/Button";
import ConfirmDeleteItem from "../../../ui/custom/Modal/ModalConfirm";
import { TableItem } from "../../../ui/custom/Table/TableItem";
import { formatDate, useImageValidity } from "../../../utils/helpers";
import { useDeleteMajor } from "./useDeleteMajor";
import { useMajors } from "./useMajors";

function MajorList() {
    const { Title } = Typography;
    const {
        isLoading,
        majors,
        page,
        limit,
        handlePageChange,
        handleLimitChange,
        setSort
    } = useMajors();
    const { isDeleting, removeMajor, isModalVisible, setIsModalVisible } = useDeleteMajor();
    const navigate = useNavigate();

    const majorImages = majors?.result?.map(major => major.image);
    const isValidImages = useImageValidity(majors?.result, majorImages);

    //Hàm xử lí việc sort store theo corresponding fields
    const handleSort = (pagination, filters, sorter) => {
        const sortOrder = sorter.order === "ascend" ? "asc" : "desc";

        switch (sorter.field) {
            case "MajorName":
                setSort(`${sorter.field},${sortOrder}`);
                break;
            default:
                // Xử lý các trường hợp khác
                break;
        }
    };

    // table code start
    const columns = [
        {
            title: "STT",
            dataIndex: "number",
            key: "number",
            align: "center"
        },
        {
            title: "Chuyên ngành học",
            dataIndex: "MajorName",
            key: "MajorName",
            width: "18%",
            sorter: true
        },
        {
            title: "Mô tả",
            dataIndex: "Description",
            key: "Description"
        },
        {
            title: "Ngày tạo",
            dataIndex: "DateCreated",
            key: "DateCreated",
            align: "center"
        },
        {
            title: "Trạng thái",
            key: "State",
            dataIndex: "State",
            align: "center"
        },
        {
            title: "Hành động",
            key: "action",
            dataIndex: "action"
        },
    ];

    if (isLoading) {
        return (
            <Spin>
                <TableItem
                    columns={columns}
                    dataSource={[]}
                    pagination={false}
                />
            </Spin>
        );
    }
    if (!majors?.result?.length) return <Empty resourceName="chuyên ngành học" />

    const data = majors?.result?.map((major, index) => {
        const dataIndex = (page - 1) * limit + index + 1;
        const isValid = isValidImages[index];
        const avatarSrc = isValid ? major.image : imgDefaultMajor;

        return {
            key: major.id,
            number: (
                <>
                    <div className="number-header">
                        <span>{dataIndex}</span>
                    </div>
                </>
            ),
            MajorName: (
                <>
                    <Avatar.Group>
                        <Avatar
                            className="shape-avatar-product"
                            shape="square"
                            src={avatarSrc}
                        />
                        <div className="avatar-info">
                            <Title className="title-product-name" level={5}>{major.majorName}</Title>
                        </div>
                    </Avatar.Group>
                </>
            ),
            Description: (
                <>
                    {major.description ? (
                        <p className="description-major">
                            {major.description}
                        </p>
                    ) : (
                        <p className="description-major">Chưa cập nhật</p>
                    )}
                </>
            ),
            DateCreated: (
                <>
                    {formatDate(major.dateCreated)}
                </>
            ),
            State: (
                <>
                    <Tag className="status-tag" color={major.state ? "cyan" : "error"}>
                        {major.state ? "Hoạt động" : "Không hoạt động"}
                    </Tag>
                </>
            ),
            action: (
                <>
                    <div className="ant-employed-actions">
                        {/* <div>
                            <MyModal>
                                <MyModal.Open opens="edit">
                                    <ButtonAction>
                                        <HiPencil />
                                    </ButtonAction>
                                </MyModal.Open>
                                <MyModal.Window name="edit">
                                    <MajorForm majorToEdit={major} />
                                </MyModal.Window>
                            </MyModal>
                        </div> */}
                        <div>
                            <Modal>
                                <Modal.Open opens="delete">
                                    <ButtonAction>
                                        <HiTrash />
                                    </ButtonAction>
                                </Modal.Open>
                                <Modal.Window name="delete">
                                    <ConfirmDeleteItem
                                        resourceName="chuyên ngành"
                                        disabled={isDeleting}
                                        onConfirm={() => removeMajor(major.id)}
                                        visible={isModalVisible}
                                        setVisible={setIsModalVisible}
                                    />
                                </Modal.Window>
                            </Modal>
                        </div>
                    </div>
                </>
            )
        }
    });

    const handleRowClick = (record, columnKey) => {
        if (columnKey.target.tagName === "BUTTON"
            || columnKey.target.tagName === "INPUT"
            || columnKey.target.tagName === "TEXTAREA"
            || columnKey.target.tagName === "SELECT"
            || columnKey.target.tagName === "SPAN"
            || columnKey.target.tagName === "DIV"
            || columnKey.target.tagName === "IMG"
            || columnKey.target.tagName === "svg"
            || columnKey.target.tagName === "path") {
            return; // Không thực hiện chuyển hướng
        }

        navigate(`/majors/${record.key}`);
    };

    return (
        <>
            <Spin spinning={isLoading}>
                <TableItem
                    columns={columns}
                    dataSource={data}
                    handleSort={handleSort}
                    limit={limit}
                    label="Chuyên ngành / Trang"
                    page={page}
                    elements={majors?.totalCount}
                    setPage={handlePageChange}
                    setLimit={handleLimitChange}
                    handleRowClick={handleRowClick}
                />
            </Spin>
        </>
    );
};

export default MajorList;

