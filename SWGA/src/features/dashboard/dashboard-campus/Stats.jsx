/* eslint-disable react/prop-types */
import { HiOutlineUsers, HiOutlineTicket, HiOutlineAcademicCap, HiOutlineCreditCard } from "react-icons/hi2";
import Stat from "./Stat";

export default function Stats({ titles }) {
  return (
    <>
      <Stat
        title="Sinh viên"
        color="indigo"
        icon={<HiOutlineUsers />}
        value={titles?.numberOfStudents}
      />
      <Stat
        title="Giảng viên"
        color="blue"
        icon={<HiOutlineAcademicCap />}
        value={titles?.numberOfLecturers}
      />
      <Stat
        title="Giao dịch"
        color="yellow"
        icon={<HiOutlineCreditCard />}
        value={titles?.numberOfPointPackages}
      />
    </>
  );
}