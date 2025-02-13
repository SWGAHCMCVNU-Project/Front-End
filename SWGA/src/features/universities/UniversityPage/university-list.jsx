import { Avatar, Spin, Tag, Typography } from "antd";
import {  HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import imgDefaultUniversity from "../../../assets/images/university.png";
import Empty from "../../../ui/Empty";
import Modal from "../../../ui/Modal";
import { ButtonAction } from "../../../ui/custom/Button/Button";
import ConfirmDeleteItem from "../../../ui/custom/Modal/ModalConfirm";
// import MyModal from "../../../ui/custom/Modal/MyModal";
import { TableItem } from "../../../ui/custom/Table/TableItem";
import { formatDate, formatPhoneNumber, useImageValidity } from "../../../utils/helpers";
// import UniversityFormUpdate from "../ModalUniversityUpdate/university-form-update";
import { useDeleteUniversity } from "./useDeleteUniversity";
import { useUniversities } from "./useUniversities";

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 1.4rem;
`;

function UniversityList() {
    const { Title } = Typography;
    const {
        isLoading,
        universities,
        page,
        limit,
        handlePageChange,
        handleLimitChange,
        setSort
    } = useUniversities();
    const { isDeleting, removeUniversity, isModalVisible, setIsModalVisible } = useDeleteUniversity();
    const navigate = useNavigate();

    const universityImages = universities?.result?.map(university => university.image);
    const isValidImages = useImageValidity(universities?.result, universityImages);

    //Hàm xử lí việc sort store theo corresponding fields
    const handleSort = (pagination, filters, sorter) => {
        const sortOrder = sorter.order === "ascend" ? "asc" : "desc";

        switch (sorter.field) {
            case "UniversityName":
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
            title: "Đại học",
            dataIndex: "UniversityName",
            key: "UniversityName",
            width: "18%",
            sorter: true
        },
        {
            title: "Liên hệ",
            dataIndex: "Contact",
            key: "Contact"
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
            title: <div className="header-login">Hành động</div>,
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
    if (!universities?.result?.length) return <Empty resourceName="trường đại học" />

    const data = universities?.result?.map((university, index) => {
        const dataIndex = (page - 1) * limit + index + 1;
        const isValid = isValidImages[index];
        const avatarSrc = isValid ? university.image : imgDefaultUniversity;

        return {
            key: university.id,
            number: (
                <>
                    <div className="number-header">
                        <span>{dataIndex}</span>
                    </div>
                </>
            ),
            UniversityName: (
                <>
                    <Avatar.Group>
                        <Avatar
                            className="shape-avatar-product"
                            shape="square"
                            src={avatarSrc}
                        />
                        <div className="avatar-info">
                            <Title className="title-product-name" level={5}>{university.universityName}</Title>
                        </div>
                    </Avatar.Group>
                </>
            ),
            Contact: (
                <>
                    <Stacked>
                        {
                            university.email === null && university.phone === null ? (
                                <>
                                    <p className="style-p-contact">Chưa cập nhật</p>
                                </>
                            ) : (
                                <>
                                    <p className="style-p-contact">{university.email !== null
                                        ? university.email
                                        : "Chưa cập nhật Email"}
                                    </p>
                                    <p>{university.phone !== null
                                        ? formatPhoneNumber(university.phone)
                                        : "Chưa cập nhật số điện thoại"}
                                    </p>
                                </>
                            )
                        }
                    </Stacked>
                </>
            ),
            DateCreated: (
                <>
                    {formatDate(university.dateCreated)}
                </>
            ),
            State: (
                <>
                    <Tag className="status-tag" color={university.state ? "cyan" : "error"}>
                        {university.state ? "Hoạt động" : "Không hoạt động"}
                    </Tag>
                </>
            ),
            action: (
                <>
                    <div className="ant-employed-actions">
                        <div>
                            {/* <MyModal>
                                <MyModal.Open opens="edit">
                                    <ButtonAction>
                                        <HiPencil />
                                    </ButtonAction>
                                </MyModal.Open>
                                <MyModal.Window name="edit">
                                    <UniversityFormUpdate universityToEdit={university} />
                                </MyModal.Window>
                            </MyModal> */}
                        </div>
                        <div>
                            <Modal>
                                <Modal.Open opens="delete">
                                    <ButtonAction>
                                        <HiTrash />
                                    </ButtonAction>
                                </Modal.Open>
                                <Modal.Window name="delete">
                                    <ConfirmDeleteItem
                                        resourceName="trường đại học"
                                        disabled={isDeleting}
                                        onConfirm={() => removeUniversity(university.id)}
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

        navigate(`/universities/${record.key}`);
    };

    return (
        <>
            <Spin spinning={isLoading}>
                <TableItem
                    columns={columns}
                    dataSource={data}
                    handleSort={handleSort}
                    limit={limit}
                    label="Trường / Trang"
                    page={page}
                    elements={universities?.totalCount}
                    setPage={handlePageChange}
                    setLimit={handleLimitChange}
                    handleRowClick={handleRowClick}
                />
            </Spin>
        </>
    );
};

export default UniversityList;

