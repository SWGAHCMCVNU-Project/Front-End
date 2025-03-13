// import { Upload } from "antd";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import Form from "../../../ui/Form";
// import FormRow from "../../../ui/FormRow";
// import Input from "../../../ui/Input";
// import Textarea from "../../../ui/Textarea";
// import ButtonCustom from "../../../ui/custom/Button/ButtonCustom";
// import { useUpdateAdmin } from "./useUpdateAdmin";

// function AdminModalUpdate({ adminToEdit = {}, onCloseModal }) {
//     const { isEditing, editAdmin } = useUpdateAdmin();
//     const [avatar, setAvatar] = useState(null);

//     const {
//         id: editId,
//         ...editValues
//     } = adminToEdit;

//     const { register, handleSubmit, reset, getValues, setValue, formState } =
//         useForm({
//             defaultValues: editValues
//         });
//     const { errors } = formState;

//     const handleChangeImage = (e) => {
//         const file = e && e.fileList[0];
//         if (file) {
//             setAvatar(e.file);
//         } else {
//             setAvatar(null);
//         }
//     };

//     function onSubmit(data) {
//         editAdmin(
//             { adminData: { ...data, avatar } },
//             {
//                 onSuccess: (data) => {
//                     reset();
//                     onCloseModal?.();
//                 },
//             }
//         );
//     }
//     function onError(errors) {
//         console.log(errors);
//     }

//     return (
//         <Form
//             onSubmit={handleSubmit(onSubmit, onError)}
//             type={onCloseModal ? "modal" : "regular"}>
//             <FormRow label="Tên quản trị viên" error={errors?.fullName?.message}>
//                 <Input
//                     type="text"
//                     id="fullName"
//                     placeholder="Nhập tên quản trị viên..."
//                     disabled={isEditing}
//                     {...register("fullName", {
//                         required: "Vui lòng nhập tên quản trị viên",
//                         validate: {
//                             noWhiteSpace: (value) =>
//                                 value.trim().length >= 3 ||
//                                 "Tên quản trị viên phải chứa ít nhất 3 kí tự"
//                         },
//                         maxLength: {
//                             value: 50,
//                             message: "Tên quản trị viên tối đa 50 kí tự"
//                         }
//                     })}>
//                 </Input>
//             </FormRow>


//             <FormRow label="Ảnh đại diện">
//                 <Upload
//                     accept="image/*"
//                     id="avatar"
//                     listType="picture-card"
//                     beforeUpload={() => false}
//                     onChange={handleChangeImage}
//                     showUploadList={false}
//                     disabled={isEditing}
//                 >
//                     {avatar && avatar.name ? (
//                         <img src={URL.createObjectURL(new Blob([avatar]))} alt="avatar" style={{ width: '100%' }} />
//                     ) : (
//                         <img src={editValues?.avatar} alt="avatar" />
//                     )}
//                 </Upload>
//             </FormRow>

//             <FormRow label="Mô tả" error={errors?.description?.message}>
//                 <Textarea
//                     type="text"
//                     id="description"
//                     placeholder="Nhập mô tả..."
//                     disabled={isEditing}
//                     {...register("description", {
//                         required: "Vui lòng nhập mô tả",
//                         validate: {
//                             noWhiteSpace: (value) =>
//                                 value.trim().length >= 3 ||
//                                 "Mô tả ít nhất 3 kí tự"
//                         },
//                         maxLength: {
//                             value: 500,
//                             message: "Mô tả tối đa 500 kí tự"
//                         }
//                     })}>
//                 </Textarea>
//             </FormRow>

//             <FormRow>
//                 <ButtonCustom
//                     $variations="secondary"
//                     type="reset"
//                     onClick={() => onCloseModal?.()}
//                     disabled={isEditing}>
//                     Hủy bỏ
//                 </ButtonCustom>
//                 <ButtonCustom
//                     disabled={isEditing}
//                     onClick={handleSubmit(onSubmit, onError)}>
//                     Lưu thay đổi
//                 </ButtonCustom>
//             </FormRow>
//         </Form>
//     );
// };

// export default AdminModalUpdate;