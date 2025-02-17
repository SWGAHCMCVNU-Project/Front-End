import {
  HiOutlineBuildingStorefront,
  HiOutlineCalendarDays,
  HiOutlineSquare3Stack3D,
  HiOutlineTicket,
} from "react-icons/hi2";
import { useQuery } from "@tanstack/react-query";
import { mockTitles } from './mockData';
import Stat from "./Stat";
import StatBalanceBean from "./StatBalanceBean";

export default function Stats() {
  const { data: titles } = useQuery({
    queryFn: () => Promise.resolve(mockTitles.result),
    queryKey: ["titles"],
  });

  return (
    <>
      <Stat
        title="Chiến dịch"
        color="blue"
        icon={<HiOutlineCalendarDays />}
        value={titles?.numberOfCampagins}
      />
      <Stat
        title="Cửa hàng"
        color="green"
        icon={<HiOutlineBuildingStorefront />}
        value={titles?.numberOfStores}
      />
      <Stat
        title="Phiếu ưu đãi"
        color="indigo"
        icon={<HiOutlineTicket />}
        value={titles?.numberOfVoucherItems}
      />
      <StatBalanceBean
        title="Ví"
        color="yellow"
        icon={<HiOutlineSquare3Stack3D />}
        value={titles?.balance}
      />
    </>
  );
}
