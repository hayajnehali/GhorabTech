import { GroupByChartResult } from "@shared/Enum/group-by-chart-result";
import { FilterBase } from "./filter-base";

export class ChartResult {
  date!: Date ;
  totalSales!: number;
  endDate: Date | undefined;
  groupBy!: GroupByChartResult; // مثال: "day", "week", "month"
  id: string | undefined;
}
export class ChartResultFilter  extends FilterBase {
  date?: Date |string;
  groupBy?: GroupByChartResult; // مثال: "day", "week", "month"
}
