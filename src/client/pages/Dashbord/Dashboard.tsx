import React, { useState } from 'react';
import { Layout, Menu, Input, Button, Drawer } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FormGroup, Form, Label } from 'reactstrap';
import Request from './Request';
import  Table from './Statistics';
import { FaHome } from 'react-icons/fa';
import Logout from '.././../Logout';









const { SubMenu } = Menu;
const { Header, Content } = Layout;

const Rent: React.FC = () => {
  const [rent, setRent] = useState<number>(0);
  const [year, setYear] = useState<number>(0);




  const [totalYearly, setTotalYearly] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('option1');
  const [visible, setVisible] = useState<boolean>(false);


  const handleRent = (e: any) => {
    setRent(e.target.value);
  };

  const handleYear = (e: any) => {
    setYear(e.target.value);
  };


  const handleTotalYearly = () => {
    setTotalYearly(rent * 12 * year);

  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1" onClick={showDrawer}>
            <FaHome style={{ fontSize: 30 }} />
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Drawer
          title="Tools"
          placement="left"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Tools" >
              <Menu.Item key="1" onClick={() => setSelectedOption('option1')}>
                SIMULATION
              </Menu.Item>
              <Menu.Item key="5" onClick={() => setSelectedOption('option2')}>
                REQUETES
              </Menu.Item>
              <Menu.Item key="6" onClick={() => setSelectedOption('option3')}>
                Statistics
              </Menu.Item>
              <Logout />


            </SubMenu>
            <Button style={{ margin: 20 }} onClick={onClose} id="close">❌</Button>
          </Menu>

        </Drawer>
        <Layout style={{ padding: '0 24px 24px', backgroundImage: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)' }}>

          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              height: "auto"

            }}
          >
            {selectedOption === 'option1' && (
              <div>
                <Form>
                  <FormGroup>
                    <Label for="exampleEmail">Loyer Mensuel</Label>
                    <Input
                      type="number"
                      name="rent"
                      id="exampleEmail"
                      placeholder="Enter Rent"
                      value={rent}
                      onChange={handleRent}
                      style={{ marginBottom: 30, marginTop: 30 }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Annuel</Label>
                    <Input
                      type="number"
                      name="year"
                      id="examplePassword"
                      placeholder="Enter Year"
                      value={year}
                      onChange={handleYear}
                    />
                  </FormGroup>

                  <Button id='btn' style={{ height: '100%', margin: '0 30px', marginTop: 30 }} onClick={handleTotalYearly}>Click !</Button>
                </Form>
                <div>

                  <h1 style={{ marginTop: 40 }}>Total Annuel: {totalYearly} &#8364;</h1>
                </div>
              </div>
            )}
            {selectedOption === 'option2' && (
              <div>
                <Request />
              </div>
            )}


          </Content>


        </Layout>
        {selectedOption === 'option3' && (


          <Table/>


        )}
      </Layout>
    </Layout>
  );
};

export default Rent;