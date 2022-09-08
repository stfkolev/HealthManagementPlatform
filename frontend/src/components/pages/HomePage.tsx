import { Row, Col, Typography, Statistic, Card, List } from 'antd';
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
	FrownOutlined,
	HeartOutlined,
	NodeExpandOutlined,
	RiseOutlined,
	RocketFilled,
	ScanOutlined,
	SmileOutlined,
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
import { Area, Radar } from '@ant-design/charts';
import { Student } from '../../models/Student';
import { MedicalInformation } from '../../models/MedicalInformation';
import { GetMedicalInformations } from '../../api/MedicalInformationApi';
import { Grade } from '../../models/Grade';

const { Title } = Typography;

function HomePage() {
	const [gendersCount, setGendersCount] = useState(0);
	const [gradesCount, setGradesCount] = useState(0);
	const [studentsCount, setStudentsCount] = useState(0);

	const [students, setStudents] = useState<Student[]>([]);
	const [grades, setGrades] = useState<Grade[]>([]);
	const [medicalInfo, setMedicalInfo] = useState<MedicalInformation[]>([]);

	useEffect(() => {
		document.title = `Начало | Задание 25`;

		GetGenders().then((values) => setGendersCount(values.length));
		GetGrades().then((values) => {
			setGradesCount(values.length);
			setGrades(values);
		});
		GetStudents().then((values) => {
			setStudentsCount(values.length);
			setStudents(values);
		});

		GetMedicalInformations().then((values) => setMedicalInfo(values));
	}, []);
	return (
		<>
			<Row gutter={[16, 16]} justify='start' align='middle'>
				<Col span={16} offset={1}>
					<Title level={2} style={{ marginBottom: 0 }}>
						Информационно табло
					</Title>
					<Text type='secondary' style={{ marginTop: 0 }}>
						Тук можете да получите всякакъв вид статистики относно учениците
					</Text>
				</Col>
			</Row>

			<Row
				justify='start'
				align='top'
				gutter={[16, 16]}
				style={{ marginTop: 32, marginBottom: 32 }}>
				<Col span={4} offset={1}>
					<Row gutter={[16, 16]}>
						<Col span={24}>
							<Card
								style={{
									borderRadius: '12pt',
									background: '#FC682A',
									boxShadow: '0pt 0pt 15pt rgba(0, 0, 0, 0.15)',
									border: 0,
								}}>
								<Statistic
									title='Брой ваксинирани ученици'
									value={
										medicalInfo.filter((obj) => obj.vaccinationState === 0)
											.length
									}
									prefix={<SmileOutlined />}
								/>
							</Card>
						</Col>
						<Col span={24}>
							<Card
								style={{
									borderRadius: '12pt',
									background: '#ffc53d',
									boxShadow: '0pt 0pt 15pt rgba(0, 0, 0, 0.15)',
									border: 0,
								}}>
								<Statistic
									title='Брой здрави ученици'
									value={
										medicalInfo.filter((obj) => obj.studentState === 0).length
									}
									prefix={<SmileOutlined />}
								/>
							</Card>
						</Col>
						<Col span={24}>
							<Card
								style={{
									borderRadius: '12pt',
									background: '#40a9ff',
									boxShadow: '0pt 0pt 15pt rgba(0, 0, 0, 0.15)',
									border: 0,
								}}>
								<Statistic
									title='Брой болни ученици'
									value={
										medicalInfo.filter((obj) => obj.studentState === 1).length
									}
									prefix={<FrownOutlined />}
								/>
							</Card>
						</Col>
						<Col span={24}>
							<Card
								style={{
									borderRadius: '12pt',
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
				</Col>

				<Col span={9}>
					<Card
						title={'Тегло по възраст'}
						style={{
							borderRadius: '12pt',
							boxShadow: '0pt 0pt 15pt rgba(0, 0, 0, 0.15)',
							border: 0,
						}}>
						<Area
							data={medicalInfo}
							xField={'age'}
							yField={'bodyMass'}
							areaStyle={{ fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' }}
						/>
					</Card>
				</Col>

				<Col span={9}>
					<Row gutter={[16, 16]}>
						<Col span={24}>
							<Card
								title={'Сърдечен ритъм по възраст'}
								style={{
									borderRadius: '12pt',
									boxShadow: '0pt 0pt 15pt rgba(0, 0, 0, 0.15)',
									border: 0,
								}}>
								<Radar
									data={medicalInfo}
									xField={'age'}
									yField={'heartRate'}
									point={{
										size: 2,
									}}
									xAxis={{
										tickLine: null,
									}}
									yAxis={{
										label: false,
										grid: {
											alternateColor: 'rgba(0, 0, 0, 0.04)',
										},
									}}
								/>
							</Card>
						</Col>
					</Row>
				</Col>

				<Col span={4} offset={1}>
					<Card
						style={{
							background: '#8AC185',
							borderRadius: '12pt',
							boxShadow: '0pt 0pt 15pt rgba(0, 0, 0, 0.15)',
							border: 0,
						}}>
						<Statistic
							title='Средна възраст'
							value={
								medicalInfo.reduce((a, { age }) => a + age, 0) /
								medicalInfo.length
							}
							prefix={<DeploymentUnitOutlined />}
						/>
					</Card>
				</Col>

				<Col span={4}>
					<Card
						style={{
							background: '#00cec9',
							borderRadius: '12pt',
							boxShadow: '0pt 0pt 15pt rgba(0, 0, 0, 0.15)',
							border: 0,
						}}>
						<Statistic
							title='Среден сърдечен ритъм'
							value={
								medicalInfo.reduce((a, { heartRate }) => a + heartRate, 0) /
								medicalInfo.length
							}
							prefix={<HeartOutlined />}
						/>
					</Card>
				</Col>

				<Col span={4}>
					<Card
						style={{
							background: '#fdcb6e',
							borderRadius: '12pt',
							boxShadow: '0pt 0pt 15pt rgba(0, 0, 0, 0.15)',
							border: 0,
						}}>
						<Statistic
							title='Средно кръвно налягане'
							value={
								medicalInfo.reduce(
									(a, { bloodPressure }) => a + bloodPressure,
									0,
								) / medicalInfo.length
							}
							prefix={<NodeExpandOutlined />}
						/>
					</Card>
				</Col>

				<Col span={4}>
					<Card
						style={{
							background: '#ff7675',
							borderRadius: '12pt',
							boxShadow: '0pt 0pt 15pt rgba(0, 0, 0, 0.15)',
							border: 0,
						}}>
						<Statistic
							title='Средно тегло (кг)'
							value={
								medicalInfo.reduce((a, { bodyMass }) => a + bodyMass, 0) /
								medicalInfo.length
							}
							prefix={<ScanOutlined />}
						/>
					</Card>
				</Col>

				<Col span={6}>
					<Card
						style={{
							background: '#a29bfe',
							borderRadius: '12pt',
							boxShadow: '0pt 0pt 15pt rgba(0, 0, 0, 0.15)',
							border: 0,
						}}>
						<Statistic
							title='Средна височина (cm)'
							value={
								medicalInfo.reduce((a, { height }) => a + height, 0) /
								medicalInfo.length
							}
							prefix={<RiseOutlined />}
						/>
					</Card>
				</Col>
				<Col span={7} offset={1}>
					<Card
						title='Последно добавени ученици'
						style={{
							borderRadius: '12pt',
							boxShadow: '0pt 0pt 15pt rgba(0, 0, 0, 0.15)',
							border: 0,
						}}>
						<List
							itemLayout='horizontal'
							dataSource={students.reverse().slice(0, 5)}
							renderItem={(item) => (
								<List.Item>
									<List.Item.Meta
										title={item.name}
										description={
											medicalInfo.find(
												(obj) => obj.id === item.medicalInformationId,
											)?.studentState === 0
												? 'Ваксиниран'
												: 'Неваксиниран'
										}
									/>
								</List.Item>
							)}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card
						title='Тегло по височина'
						style={{
							borderRadius: '12pt',
							boxShadow: '0pt 0pt 15pt rgba(0, 0, 0, 0.15)',
							border: 0,
						}}>
						<Radar
							data={medicalInfo}
							xField={'height'}
							yField={'bodyMass'}
							autoFit={true}
							appendPadding={[0, 10, 0, 10]}
							point={{
								size: 2,
							}}
							xAxis={{
								tickLine: null,
							}}
							yAxis={{
								label: false,
								grid: {
									alternateColor: 'rgba(0, 0, 0, 0.04)',
								},
							}}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card
						title={'Височина по възраст'}
						style={{
							borderRadius: '12pt',
							boxShadow: '0pt 0pt 15pt rgba(0, 0, 0, 0.15)',
							border: 0,
						}}>
						<Area
							data={medicalInfo}
							xField={'age'}
							yField={'height'}
							areaStyle={{ fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' }}
						/>
					</Card>
				</Col>
			</Row>

			<Row gutter={[16, 16]}></Row>

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
