import { useState, useEffect } from 'react';
import {
	Col,
	Row,
	Typography,
	Skeleton,
	Button,
	message,
	Card,
	Slider,
	Input,
} from 'antd';

import { PlusOutlined, SyncOutlined } from '@ant-design/icons';

import { CreateGrade, GetGrades } from '../../api/GradeApi';
import { Grade } from '../../models/Grade';
import { GradesTable } from '../../utilities/tables/GradesTable';
import {
	CreateGradeModal,
	Values,
} from '../../utilities/modals/grades/CreateGradeModal';

const { Title } = Typography;
const { Search } = Input;

const GradesPage = () => {
	const [grades, setGrades] = useState<Grade[]>([]);
	const [filteredData, setFilteredData] = useState<Grade[]>([]);
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [sliderMin, setSliderMin] = useState(0);
	const [sliderMax, setSliderMax] = useState(0);

	const onEdit = async () => {
		GetGrades().then((_grades) => {
			setGrades(_grades);
			setSliderMin(Math.min(...grades.map((obj) => Number(obj.id))));
			setSliderMax(Math.max(...grades.map((obj) => Number(obj.id))));
		});
	};

	const onDelete = async (grade: Grade) => {
		const key = 'gradeAdd';

		message.loading({ content: 'Loading...', key });

		setTimeout(() => {
			message.success({
				content: `Записът '${grade.name}' е успешно изтрит от таблицата`,
				key,
				duration: 1,
			});

			GetGrades().then((_grades) => {
				setGrades(_grades);
				setSliderMin(Math.min(...grades.map((obj) => Number(obj.id))));
				setSliderMax(Math.max(...grades.map((obj) => Number(obj.id))));
			});
		}, 1000);
	};

	const onCreate = async (values: Values) => {
		const result = await CreateGrade({ name: values.name });

		if (result.hasOwnProperty('name')) {
			const key = 'gradeAdd';

			message.loading({ content: 'Зареждане...', key });
			setTimeout(() => {
				message.success({
					content: `Записът '${values.name}' е добавен успешно`,
					key,
					duration: 1,
				});

				GetGrades().then((_grades) => {
					setGrades(_grades);
					setSliderMin(Math.min(..._grades.map((obj) => Number(obj.id))));
					setSliderMax(Math.max(..._grades.map((obj) => Number(obj.id))));
				});
			}, 1000);
		}

		setVisible(false);
	};

	useEffect(() => {
		document.title = `Класове`;
		setLoading(true);
		GetGrades().then((_grades) => {
			setGrades(_grades);
			setSliderMin(Math.min(..._grades.map((obj) => Number(obj.id))));
			setSliderMax(Math.max(..._grades.map((obj) => Number(obj.id))));
			setLoading(false);
		});
	}, []);

	let gradesTable: any;

	if (grades.length === 0 && loading !== false) {
		gradesTable = <Skeleton active />;
	} else {
		gradesTable = (
			<GradesTable
				grades={filteredData.length > 0 ? filteredData : grades}
				onEdit={onEdit}
				onDelete={onDelete}
			/>
		);
	}

	return (
		<>
			<Row justify='center' align='middle'>
				<Col>
					<Title>Класове</Title>
				</Col>
			</Row>
			<Row align='middle'>
				<Col span={16} offset={4}>
					<Button
						type='dashed'
						onClick={() => {
							setVisible(true);
						}}>
						<PlusOutlined />
						Добавяне на клас
					</Button>
					<Button
						style={{ marginInlineStart: 16 }}
						type='primary'
						onClick={() => {
							setLoading(true);

							GetGrades().then((_grades) => {
								setGrades(_grades);

								setSliderMin(Math.min(..._grades.map((obj) => Number(obj.id))));
								setSliderMax(Math.max(..._grades.map((obj) => Number(obj.id))));

								setLoading(false);
							});
						}}>
						<SyncOutlined spin={loading} />
						Презареждане
					</Button>

					<CreateGradeModal
						visible={visible}
						onCreate={onCreate}
						onCancel={() => {
							setVisible(false);
						}}
					/>
				</Col>
			</Row>

			<br />

			<Row align='top'>
				<Col span={grades.length === 0 ? 16 : 10} offset={4}>
					{gradesTable}
				</Col>
				{!loading && grades.length !== 0 ? (
					<Col span={6} offset={1}>
						<Row align='top'>
							<Col span={24}>
								<Card title='Търсене' bordered={true}>
									<Search
										placeholder='Въведете ключова дума...'
										onSearch={(value) => {
											const key = 'updateable';
											const data = grades.filter((obj) =>
												obj.name.toLowerCase().includes(value.toLowerCase()),
											);

											message.loading({
												content: ' Търсене в записите...',
												key,
											});

											if (data.length === 0) {
												setTimeout(() => {
													message.error({
														content: 'Не е намерена информация!',
														key: key,
														duration: 2,
													});
												}, 1000);
											} else {
												setTimeout(() => {
													message.success({
														content: 'Записите са филтрирани успешно!',
														key: key,
														duration: 2,
													});

													setFilteredData(data);
												}, 1000);
											}
										}}
										allowClear
										enterButton
									/>
								</Card>
							</Col>

							{grades.length > 1 ? (
								<Col span={24} style={{ marginTop: 16 }}>
									<Card title='Филтриране по идентификатор' bordered={true}>
										<Slider
											range
											tooltipVisible
											min={sliderMin}
											max={sliderMax}
											defaultValue={[sliderMin, sliderMax]}
											marks={{
												[sliderMin]: sliderMin,
												[sliderMax]: sliderMax,
											}}
											onAfterChange={(value) => {
												const data = grades.slice(value[0] - 1, value[1]);

												console.log(data);
												setFilteredData(data);
											}}
										/>
									</Card>
								</Col>
							) : null}
						</Row>
					</Col>
				) : null}
			</Row>
		</>
	);
};

export { GradesPage };
