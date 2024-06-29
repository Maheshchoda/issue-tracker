'use client';
import { Card } from '@radix-ui/themes';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts';
import { StatusCountType } from './page';

const IssueChart = ({ statusCount }: { statusCount: StatusCountType }) => {
  const data = [
    { label: 'Open', value: statusCount.OPEN },
    { label: 'In-Progress', value: statusCount.IN_PROGRESS },
    { label: 'Closed', value: statusCount.CLOSED },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar barSize="50" dataKey="value" style={{ fill: 'var(--accent-9)' }} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
