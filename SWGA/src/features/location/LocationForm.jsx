import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import useCreateLocation from "../../hooks/location/useCreateLocation";
import useUpdateLocation from "../../hooks/location/useUpdateLocation";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useState } from "react";

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  padding: 0.8rem 1.2rem;
  border-radius: 5px;
  box-shadow: var(--shadow-sm);
`;

const MapContainer = styled.div`
  height: 400px;
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 5px;
  overflow: hidden;
`;

const LocationForm = ({ locationToEdit = {}, onCloseModal }) => {
  const { id: editId, name, latitue, longtitude, qrcode, status } = locationToEdit;
  const isEditSession = Boolean(editId);

  const { mutate: create, isLoading: isCreating } = useCreateLocation();
  const { mutate: update, isLoading: isUpdating } = useUpdateLocation();
  const queryClient = useQueryClient();

  const [markerPosition, setMarkerPosition] = useState({
    lat: latitue || 0,
    lng: longtitude || 0,
  });

  const { register, handleSubmit, reset, formState, setValue } = useForm({
    defaultValues: isEditSession
      ? {
          name: name || "",
          latitue: latitue ? latitue.toString().replace(',', '.') : "0",
          longtitude: longtitude ? longtitude.toString().replace(',', '.') : "0",
          qrcode: qrcode || "",
          status: status ?? true,
        }
      : {
          status: true,
          latitue: "0",
          longtitude: "0",
        },
  });
  const { errors } = formState;

  const onSubmit = (data) => {
    const formData = {
      name: data.name?.trim() || "",
      latitue: Number(data.latitue.replace(',', '.')),
      longtitude: Number(data.longtitude.replace(',', '.')),
      qrcode: data.qrcode?.trim() || "",
      status: data.status ?? true,
    };

    if (!formData.name) {
      toast.error("Vui lòng nhập tên địa điểm");
      return;
    }

    if (isEditSession) {
      update(
        { id: editId, ...formData },
        {
          onSuccess: () => {
            toast.success("Cập nhật địa điểm thành công");
            reset();
            onCloseModal?.();
            queryClient.invalidateQueries(["locations"]);
          },
          onError: (error) => {
            toast.error("Cập nhật địa điểm thất bại: " + error.message);
          },
        }
      );
    } else {
      create(formData, {
        onSuccess: () => {
          toast.success("Tạo địa điểm thành công");
          reset();
          onCloseModal?.();
          queryClient.invalidateQueries(["locations"]);
        },
        onError: (error) => {
          toast.error("Tạo địa điểm thất bại: " + error.message);
        },
      });
    }
  };

  const isWorking = isCreating || isUpdating;

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
    setValue("latitue", lat.toString().replace(',', '.'), { shouldValidate: true });
    setValue("longtitude", lng.toString().replace(',', '.'), { shouldValidate: true });
  };

  const handleInputChange = (field, value) => {
    const formattedValue = value.replace(',', '.'); // Thay dấu phẩy thành dấu chấm khi người dùng nhập
    setValue(field, formattedValue, { shouldValidate: true });
    setMarkerPosition({
      lat: field === "latitue" ? Number(formattedValue) : markerPosition.lat,
      lng: field === "longtitude" ? Number(formattedValue) : markerPosition.lng,
    });
  };

  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  const defaultCenter = {
    lat: latitue || 10.7769, // Default to Hanoi, Vietnam if no latitude
    lng: longtitude || 106.7009, // Default to Hanoi, Vietnam if no longitude
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Tên địa điểm" error={errors?.name?.message}>
        <StyledInput
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "Hãy nhập tên địa điểm",
            minLength: {
              value: 3,
              message: "Tên địa điểm ít nhất 3 ký tự",
            },
            maxLength: {
              value: 100,
              message: "Tên địa điểm tối đa 100 ký tự",
            },
          })}
        />
      </FormRow>
      <FormRow label="Chọn vị trí trên bản đồ">
        <MapContainer>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={10}
            center={defaultCenter}
            onClick={handleMapClick}
          >
            <Marker position={markerPosition} />
          </GoogleMap>
        </MapContainer>
      </FormRow>
      <FormRow label="Vĩ độ" error={errors?.latitue?.message}>
        <StyledInput
          type="text"
          id="latitue"
          disabled={isWorking}
          {...register("latitue", {
            required: "Hãy nhập vĩ độ",
            pattern: {
              value: /^-?\d*\.?\d+$/,
            },
            validate: {
              range: (value) =>
                (Number(value) >= -90 && Number(value) <= 90) ||
                "Vĩ độ phải từ -90 đến 90",
            },
          })}
          onChange={(e) => handleInputChange("latitue", e.target.value)}
        />
      </FormRow>
      <FormRow label="Kinh độ" error={errors?.longtitude?.message}>
        <StyledInput
          type="text"
          id="longtitude"
          disabled={isWorking}
          {...register("longtitude", {
            required: "Hãy nhập kinh độ",
            pattern: {
              value: /^-?\d*\.?\d+$/,
            },
            validate: {
              range: (value) =>
                (Number(value) >= -180 && Number(value) <= 180) ||
                "Kinh độ phải từ -180 đến 180",
            },
          })}
          onChange={(e) => handleInputChange("longtitude", e.target.value)}
        />
      </FormRow>
      <FormRow label="QR Code" error={errors?.qrcode?.message}>
        <StyledInput
          type="text"
          id="qrcode"
          disabled={isWorking}
          {...register("qrcode", {
            required: "Hãy nhập mã QR",
            maxLength: {
              value: 200,
              message: "Mã QR tối đa 200 ký tự",
            },
          })}
        />
      </FormRow>
      {isEditSession && (
        <FormRow label="Trạng thái">
          <StyledInput
            type="checkbox"
            id="status"
            disabled={isWorking}
            {...register("status")}
          />
        </FormRow>
      )}
      <FormRow>
        <Button
          $variations="secondary"
          type="reset"
          disabled={isWorking}
          onClick={() => onCloseModal?.()}
        >
          Hủy bỏ
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Cập nhật địa điểm" : "Tạo địa điểm mới"}
        </Button>
      </FormRow>
    </Form>
  );
};

LocationForm.propTypes = {
  locationToEdit: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    latitue: PropTypes.number,
    longtitude: PropTypes.number,
    qrcode: PropTypes.string,
    status: PropTypes.bool,
  }),
  onCloseModal: PropTypes.func,
};

export default LocationForm;