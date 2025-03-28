import {
    addHours,
    format,
    isAfter,
    startOfHour,
    formatDistance,
    parseISO,
    differenceInDays,
  } from "date-fns";
  import { vi } from "date-fns/locale";
  import { useEffect, useState } from "react";
  
  // We want to make this function work for both Date objects and strings (which come from Supabase)
  export const subtractDates = (dateStr1, dateStr2) =>
    differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));
  
  export const formatDistanceFromNow = (dateStr) =>
    formatDistance(parseISO(dateStr), new Date(), {
      addSuffix: true,
    })
      .replace("about ", "")
      .replace("in", "In");
  
  // Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
  export const getToday = function (options = {}) {
    const today = new Date();
  
    // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
    if (options?.end)
      // Set to the last second of the day
      today.setUTCHours(23, 59, 59, 999);
    else today.setUTCHours(0, 0, 0, 0);
    return today.toISOString();
  };
  
  export const formatCurrency = (value) => {
    if (value === undefined || value === null) return "0";
    return value.toLocaleString("it-IT");
  };
  
 // helpers.js
export const formattedHours = (hours) => {
  // Kiểm tra nếu hours là null, undefined, không phải chuỗi, hoặc không đúng định dạng HH:mm:ss
  if (!hours || typeof hours !== "string" || !/^\d{2}:\d{2}:\d{2}$/.test(hours)) {
    return "Chưa thiết lập"; // Giá trị mặc định khi thời gian không hợp lệ
  }

  try {
    const date = new Date(`2000-01-01T${hours}`);
    return format(date, "h:mm a"); // Định dạng thành "9:00 AM"
  } catch (error) {
    console.error("Error formatting hours:", error);
    return "Lỗi định dạng"; // Thông báo nếu có lỗi bất ngờ
  }
};
  
  export const formatDateTime = (dateString) => {
    const dateCreated = new Date(dateString);
    const modifiedDate = addHours(dateCreated, 7);
    let formattedDate;
    if (isAfter(modifiedDate, addHours(startOfHour(modifiedDate), 24))) {
      formattedDate = format(
        addHours(startOfHour(modifiedDate), 24),
        "dd/MM/yyyy, HH:mm",
        { locale: vi }
      );
    } else {
      formattedDate = format(modifiedDate, "dd/MM/yyyy, HH:mm", { locale: vi });
    }
    return formattedDate;
  };
  
  export const formatDate = (dateString) => {
    const dateCreated = new Date(dateString);
    const modifiedDate = addHours(dateCreated, 7);
    let formattedDate;
    if (isAfter(modifiedDate, addHours(startOfHour(modifiedDate), 24))) {
      formattedDate = format(
        addHours(startOfHour(modifiedDate), 24),
        "dd MMM yyyy",
        { locale: vi }
      );
    } else {
      formattedDate = format(modifiedDate, "dd MMM yyyy", { locale: vi });
    }
    return formattedDate;
  };
  
  export const formatDateCampaign = (dateString) => {
    const dateCreated = new Date(dateString);
    let formattedDate = format(dateCreated, "dd/MM/yyyy", { locale: vi });
    return formattedDate;
  };
  
  export const handleValidImageURL = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve(true); // Hình ảnh đã tải thành công
      };
      img.onerror = () => {
        resolve(false); // Hình ảnh không tải thành công
      };
      img.src = url;
    });
  };
  
  export const useImageValidity = (items, itemImages) => {
    const [isValidImages, setIsValidImages] = useState([]);
  
    useEffect(() => {
      const checkImageValidity = async () => {
        try {
          if (itemImages && Array.isArray(itemImages)) {
            const validityArray = await Promise.all(
              itemImages.map((imageUrl) => handleValidImageURL(imageUrl))
            );
            setIsValidImages(validityArray);
          } else {
            const validity = await handleValidImageURL(itemImages);
            setIsValidImages([validity]);
          }
        } catch (error) {
          console.error("Error checking image validity:", error);
        }
      };
  
      checkImageValidity();
    }, [items]);
  
    return isValidImages;
  };
  
  export const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "";
  
    if (phoneNumber.length === 10) {
      return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(
        3,
        6
      )} ${phoneNumber.slice(6, 8)} ${phoneNumber.slice(8)}`;
    } else if (phoneNumber.length === 11) {
      return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(
        3,
        7
      )} ${phoneNumber.slice(7, 11)}`;
    }
  
    return phoneNumber;
  };
  