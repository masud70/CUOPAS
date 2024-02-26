import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar, LabelList } from 'recharts';
const data = [
  {
    id: '19701070',
    name: 'Masud',
    present: 24,
    absent: 1
  },
  {
    id: '19701070',
    name: 'Masud',
    present: 20,
    absent: 5
  },
  {
    id: '19701077',
    name: 'Masud',
    present: 23,
    absent: 2
  },
  {
    id: '19701070',
    name: 'Masud',
    present: 24,
    absent: 1
  },
  {
    id: '19701070',
    name: 'Masud',
    present: 20,
    absent: 5
  },
  {
    id: '19701071',
    name: 'Masud',
    present: 25,
    absent: 0
  },
  {
    id: '19701072',
    name: 'Masud',
    present: 20,
    absent: 5
  },
  {
    id: '19701076',
    name: 'Masud',
    present: 25,
    absent: 0
  },
  {
    id: '19701077',
    name: 'Masud',
    present: 23,
    absent: 2
  },
  {
    id: '19701072',
    name: 'Masud',
    present: 20,
    absent: 5
  },
  {
    id: '19701073',
    name: 'Masud',
    present: 21,
    absent: 4
  },
  {
    id: '19701074',
    name: 'Masud',
    present: 30,
    absent: 7
  },
  {
    id: '19701075',
    name: 'Masud',
    present: 22,
    absent: 3
  },
  {
    id: '19701076',
    name: 'Masud',
    present: 25,
    absent: 0
  },
  {
    id: '19701071',
    name: 'Masud',
    present: 25,
    absent: 0
  },
  {
    id: '19701072',
    name: 'Masud',
    present: 20,
    absent: 5
  },
  {
    id: '19701073',
    name: 'Masud',
    present: 21,
    absent: 4
  }
];

function Example() {
    return (
        <>
            <ResponsiveContainer width="100%" aspect={3}>
                <BarChart
                width={1500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid  />
                <XAxis dataKey="id"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#000B49" ></Bar>
                <Bar dataKey="absent" fill="red" >
                </Bar>
                </BarChart>
            </ResponsiveContainer>
                <br />
            <LineChart width={1500} height={300} data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <ResponsiveContainer width="100%" aspect={3}/>
                <CartesianGrid  />
                <XAxis dataKey="id"/>
                <YAxis />
                <Legend />
                <Tooltip />
                <Line type="monotone" dataKey="present" stroke="#8884d8" />
                <Line type="monotone" dataKey="absent" stroke="red" />
            </LineChart>
        </>
    );
}

export default Example;