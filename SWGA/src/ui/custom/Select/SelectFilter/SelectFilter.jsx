import { Select } from "antd";
import { useEffect, useState } from "react";
import "./SelectFilter.scss";

export const SelectFilter = ({ label, optionFilter, optionLabelFilter, value,
    width, placeholder, onDeselect, onChange, onClear }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    //Nếu option thay đổi
    useEffect(() => {
        setSelectedOptions(value);
    }, [value]);

    //Định nghĩa các option cho Select
    const optionSelect = optionFilter.map((option) => ({
        id: option.id,
        label: option[optionLabelFilter], //Truyền name
        value: option.id
    }));

    //Khi người dùng chọn option
    const handleChange = (selectedValues) => {
        //Set lại SelectedOption
        setSelectedOptions(selectedValues); 

        //Lọc ra những trong ds optionSelect có những giá trị nào được chọn
        const selectedOptions = optionSelect.filter((option) => selectedValues.includes(option.value));

        //Lấy id của những option đã chọn đó để gán vào format
        const ids = selectedOptions.map((option) => option.id);
        const format = ids.length > 0 ? ids : null;

        //Gọi các setState để render và cập nhật
        onChange(format);
    };

    //Hàm dùng để sắp xếp các option đc chọn lên đầu
    const sortOptions = (options, selectedValues) => {
        const sortedOptions = [...options];
        sortedOptions.sort((a, b) => {
            if (selectedValues?.includes(a.value) && !selectedValues?.includes(b.value)) {
                return -1; // a nằm trước b
            }
            else if (!selectedValues?.includes(a.value) && selectedValues?.includes(b.value)) {
                return 1; // b nằm trước a
            }
            return 0; // giữ nguyên thứ tự
        });
        return sortedOptions;
    };

    const sortedOptions = sortOptions(optionSelect, selectedOptions);

    //Hàm dùng để clear option
    const handleClear = () => {
        onClear([]);
    }

    return (
        <>
            {label ? (
                <label className="filter-label">{label}</label>
            ) : null}
            <Select
                maxTagCount='responsive'
                value={value}
                mode="multiple"
                allowClear
                style={{
                    width: width
                }}
                placeholder={placeholder}
                className="select-main-filter"
                onDeselect={onDeselect}
                onChange={handleChange}
                options={sortedOptions}
                onClear={handleClear}
            />
        </>
    );
}