import { Row, Col, Typography, Statistic, Card } from 'antd';
import {
	BankOutlined,
	BgColorsOutlined,
	BranchesOutlined,
	CarFilled,
	DeploymentUnitOutlined,
	DisconnectOutlined,
	DollarCircleFilled,
	FireFilled,
	FlagFilled,
	RocketFilled,
	StarFilled,
	ToolFilled,
	UserOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { GetGenders } from '../../api/GenderApi';
import Text from 'antd/lib/typography/Text';

import RoseChart from '../common/charts/RoseChart';
import { GetGrades } from '../../api/GradeApi';
import { GetStudents } from '../../api/StudentApi';

const { Title } = Typography;

function HomePage() {
	const [gendersCount, setGendersCount] = useState(0);
	const [gradesCount, setGradesCount] = useState(0);
	const [studentsCount, setStudentsCount] = useState(0);

	useEffect(() => {
		document.title = `Начало | Задание 25`;

		GetGenders().then((values) => setGendersCount(values.length));
		GetGrades().then((values) => setGradesCount(values.length));
		GetStudents().then((values) => setStudentsCount(values.length));
	}, []);
	return (
		<>
			<Row justify='start' align='middle'>
				<Col span={16} offset={11}>
					<Title>Summary</Title>
				</Col>
			</Row>

			<Row justify='start' align='middle'>
				<Col span={16} offset={1}>
					<Title level={2} style={{ marginBottom: 0 }}>
						Basic Statistics
					</Title>
					<Text type='secondary' style={{ marginTop: 0 }}>
						Here you can see summary number of records for each type
					</Text>
				</Col>
			</Row>

			<Row justify='center' align='middle' style={{ marginTop: 32 }}>
				<Col span={3} offset={1}>
					<Card
						style={{
							background: '#ffc53d',
							boxShadow: '0pt 0pt 15pt rgba(0, 0, 0, 0.15)',
							border: 0,
						}}>
						<Statistic
							title='Брой полове'
							value={gendersCount}
							prefix={<DeploymentUnitOutlined />}
						/>
					</Card>
				</Col>

				<Col span={3} offset={1}>
					<Card
						style={{
							background: '#40a9ff',
							boxShadow: '0pt 0pt 15pt rgba(0, 0, 0, 0.15)',
							border: 0,
						}}>
						<Statistic
							title='Класове'
							value={gradesCount}
							prefix={<DisconnectOutlined />}
						/>
					</Card>
				</Col>

				<Col span={3} offset={1}>
					<Card
						style={{
							background: '#73d13d',
							boxShadow: '0pt 0pt 15pt rgba(0, 0, 0, 0.15)',
							border: 0,
						}}>
						<Statistic
							title='Брой Ученици'
							value={studentsCount}
							prefix={<UserOutlined />}
						/>
					</Card>
				</Col>
			</Row>

			{/* 
			<Row justify='center' align='middle' style={{ marginTop: 32 }}>
				<Col span={8} offset={1}>
					<RoseChart />
				</Col>
			</Row> */}
		</>
	);
}

export default HomePage;
