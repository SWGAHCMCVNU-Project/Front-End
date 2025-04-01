/* eslint-disable react/prop-types */
import {
  HiOutlineAcademicCap ,
  HiOutlineTag,
  HiOutlineTicket,
  HiOutlineUsers,
} from "react-icons/hi2";
import Stat from "./Stat";

export default function Stats({ titles }) {
  return (
    <>
      <Stat
        title="Thương hiệu"
        color="blue"
        icon={<HiOutlineTag />}
        value={titles?.numberOfBrands || 0}
      />
      <Stat
        title="Chiến dịch"
        color="green"
        icon={<HiOutlineTicket />}
        value={titles?.numberOfCampaigns || 0}
      />
      <Stat
        title="Sinh viên"
        color="indigo"
        icon={<HiOutlineUsers />}
        value={titles?.numberOfStudents || 0}
      />
      <Stat
        title="Campus"
        color="yellow"
        icon={<HiOutlineAcademicCap  />}
        value={titles?.numberOfCampuses || 0}
      />
    </>
  );
}