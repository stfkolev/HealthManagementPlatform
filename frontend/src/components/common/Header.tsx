import { useState, useEffect } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import {
	CarFilled,
	HomeFilled,
	DisconnectOutlined,
	BranchesOutlined,
	FireFilled,
	FlagFilled,
	BgColorsOutlined,
	UserOutlined,
	BankOutlined,
	ToolFilled,
	StarFilled,
	DeploymentUnitOutlined,
	DollarCircleFilled,
	RocketFilled,
} from '@ant-design/icons';

const { Header } = Layout;

const HeaderLine = () => {
	const [current, setCurrent] = useState('');

	const location = useLocation();

	useEffect(() => {
		setCurrent(
			location.pathname === '/' ? 'home' : location.pathname.split('/')[1],
		);
	}, [current, location]);

	return (
		<>
			<Header>
				<Menu
					theme='dark'
					selectedKeys={[current]}
					defaultSelectedKeys={[current]}
					mode='horizontal'>
					<Menu.Item key='home'>
						<RouterLink to='/' exact>
							<HomeFilled />
							Начало
						</RouterLink>
					</Menu.Item>
					<Menu.Item key='students'>
						<RouterLink to='/students' exact>
							<UserOutlined />
							Ученици
						</RouterLink>
					</Menu.Item>
					<Menu.Item key='genders'>
						<RouterLink to='/genders' exact>
							<DeploymentUnitOutlined />
							Полове
						</RouterLink>
					</Menu.Item>
					<Menu.Item key='grades'>
						<RouterLink to='/grades' exact>
							<DisconnectOutlined />
							Класове
						</RouterLink>
					</Menu.Item>
				</Menu>
			</Header>
		</>
	);
};

export { HeaderLine };
