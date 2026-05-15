export type DoughnutProps = {
  percentage: number;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  };
};
