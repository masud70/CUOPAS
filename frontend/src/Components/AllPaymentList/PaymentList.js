import React, { Component } from 'react';
import { Table, Input, Button, Space, Form } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import './new.css'
const data = [  
    {key: '1', id: 19701070,date: '21/11/2020', name: 'Md. Masud Mazumder', total: 3500, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '2', id: 19701071,date: '21/11/2020', name: 'Tonmoy Das', total: 3000, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '3', id: 19701072,date: '21/11/2020', name: 'Tareq Rahman', total: 3200, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '4', id: 19701073,date: '21/11/2020', name: 'Palash Hossen', total: 5500, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '5', id: 19701074,date: '21/11/2020', name: 'Hamza Mohtadee', total: 6500, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '6', id: 19701075,date: '21/11/2020', name: 'Nu Sai Mong', total: 3550, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '7', id: 19701070,date: '21/11/2020', name: 'Md. Masud Mazumder', total: 3500, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '8', id: 19701071,date: '21/11/2020', name: 'Tonmoy Das', total: 3000, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '9', id: 19701072,date: '21/11/2020', name: 'Tareq Rahman', total: 3200, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '10', id: 19701073,date: '21/11/2020', name: 'Palash Hossen', total: 5500, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '11', id: 19701074,date: '21/11/2020', name: 'Hamza Mohtadee', total: 6500, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '12', id: 19701075,date: '21/11/2020', name: 'Nu Sai Mong', total: 3550, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '13', id: 19701070,date: '21/11/2020', name: 'Md. Masud Mazumder', total: 3500, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '14', id: 19701071,date: '21/11/2020', name: 'Tonmoy Das', total: 3000, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '15', id: 19701072,date: '21/11/2020', name: 'Tareq Rahman', total: 3200, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '16', id: 19701073,date: '21/11/2020', name: 'Palash Hossen', total: 5500, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '18', id: 19701074,date: '21/11/2020', name: 'Hamza Mohtadee', total: 6500, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '19', id: 19701075,date: '21/11/2020', name: 'Nu Sai Mong', total: 3550, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '20', id: 19701070,date: '21/11/2020', name: 'Md. Masud Mazumder', total: 3500, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '21', id: 19701071,date: '21/11/2020', name: 'Tonmoy Das', total: 3000, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '22', id: 19701072,date: '21/11/2020', name: 'Tareq Rahman', total: 3200, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '23', id: 19701073,date: '21/11/2020', name: 'Palash Hossen', total: 5500, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '24', id: 19701074,date: '21/11/2020', name: 'Hamza Mohtadee', total: 6500, fields: [{detail: 'Masud', amount: 3000}]},
    {key: '25', id: 19701075,date: '21/11/2020', name: 'Nu Sai Mong', total: 3550, fields: [{detail: 'Masud', amount: 3000}]},
];

const onFinish = values => {
    console.log('Received values of form:', values);
  };
 

const expandable = { expandedRowRender: (record) => 
    <div>
        <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
            <Form.List name="users" initialValue={record.fields}>
                {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space className='row w-100 d-flex justify-content-center' key={key} style={{ display: 'flex' }} align="baseline">
                        <Form.Item
                        className='col-12'
                        {...restField}
                        name={[name, 'detail']}
                        fieldKey={[fieldKey, 'detail']}
                        rules={[{ required: true, message: 'Missing field detail' }]}
                        >
                        <Input placeholder="Detail" />
                        </Form.Item>
                        <Form.Item
                        {...restField}
                        name={[name, 'amount']}
                        fieldKey={[fieldKey, 'amount']}
                        rules={[{ required: true, message: 'Missing amount' }]}
                        >
                        <Input placeholder="Amount" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                    ))}
                    <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add field
                    </Button>
                    </Form.Item>
                </>
                )}
            </Form.List>
            <Form.Item>
                <Space align='center' className=' w-100 text-right d-flex justify-content-end'>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Space>
                
            </Form.Item>
        </Form>
    </div>
};
const pagination = { position: 'bottomCenter',pageSize: 10, };

class PaymentList extends Component {
  state = {
    searchText: '',
    searchedColumn: '',
    bordered: false,
    loading: false,
    pagination,
    size: 'default',
    expandable,
    title: undefined,
    // rowSelection: {},
    scroll: undefined,
    hasData: true,
    tableLayout: undefined,
    top: 'none',
    bottom: 'bottomCenter',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 , maxWidth: '250px', backgroundColor: '#ddd', display: 'block'}}>
        <Input className='searchInput'
            prefix={<SearchOutlined className="site-form-item-icon" />}
            ref={node => {
                this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            onKeyUp={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8}}
        />
        <Space style={{ width: '100%', display: 'flex'}}>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 100 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 100 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm({closeDropdown: false});
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '10%',
        ...this.getColumnSearchProps('id'),
      },
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: '50%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'due date',
        dataIndex: 'date',
        key: 'date',
        width: '20%',
        ...this.getColumnSearchProps('date'),
      },
      {
        title: 'total',
        dataIndex: 'total',
        key: 'total',
        width: '20%',
        ...this.getColumnSearchProps('total'),
        sorter: (a, b) => a.total - b.total,
        sortDirections: ['descend', 'ascend'],
      },
    ];
    return (
        <div className='mainDivPaymentList'>
            <Table {...this.state} className='table-main' columns={columns} dataSource={data} pagination={{ position: [this.state.top, this.state.bottom] }}/>
        </div>
    );
  }
}


export default PaymentList;