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
	Drawer,
} from 'antd';

import { PlusOutlined, SyncOutlined } from '@ant-design/icons';

import { CreateStudent, GetStudents } from '../../api/StudentApi';
import { Student } from '../../models/Student';
import { StudentsTable } from '../../utilities/tables/StudentsTable';
import {
	CreateStudentModal,
	Values,
} from '../../utilities/modals/students/CreateStudentModal';
import {
	CreateMedicalInformation,
	GetMedicalInformations,
} from '../../api/MedicalInformationApi';

const { Title } = Typography;
const { Search } = Input;

const StudentsPage = () => {
	const [students, setStudents] = useState<Student[]>([]);
	const [filteredData, setFilteredData] = useState<Student[]>([]);
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [sliderMin, setSliderMin] = useState(0);
	const [sliderMax, setSliderMax] = useState(0);

	const [open, setOpen] = useState(false);

	const onEdit = async () => {
		GetStudents().then((_students) => {
			setStudents(_students);
			setSliderMin(Math.min(...students.map((obj) => Number(obj.id))));
			setSliderMax(Math.max(...students.map((obj) => Number(obj.id))));
		});
	};

	const onDelete = async (student: Student) => {
		const key = 'studentAdd';

		message.loading({ content: 'Зареждане...', key });

		setTimeout(() => {
			message.success({
				content: `Записът '${student.name}' е успешно изтрит от таблицата`,
				key,
				duration: 1,
			});

			GetStudents().then((_students) => {
				setStudents(_students);
				setSliderMin(Math.min(...students.map((obj) => Number(obj.id))));
				setSliderMax(Math.max(...students.map((obj) => Number(obj.id))));
			});
		}, 1000);
	};

	const isMedicalInformationEntered = (values: Values) =>
		values.age != null ||
		values.heartRate != null ||
		values.height != null ||
		values.bodyMass != null ||
		values.bloodType != null ||
		values.bloodPressure != null ||
		values.studentState != null ||
		values.vaccinationState != null;

	const onCreate = async (values: Values) => {
		var medicalInformation = null;

		if (isMedicalInformationEntered(values)) {
			medicalInformation = await CreateMedicalInformation({
				age: values.age,
				heartRate: values.heartRate,
				height: values.height,
				bodyMass: values.bodyMass,
				bloodType: values.bloodType,
				bloodPressure: values.bloodPressure,
				studentId: values.studentId,
				studentState: values.studentState,
				vaccinationState: values.vaccinationState,
			});
		}

		const result = await CreateStudent({
			name: values.name,

			address: values.address,
			phone: values.phone,

			gradeId: Number(values.gradeId),
			genderId: Number(values.genderId),

			// age: values.age,
			// heartRate: values.heartRate,
			// height: values.height,
			// bodyMass: values.bodyMass,
			// bloodType: values.bloodType,
			// bloodPressure: values.bloodPressure,
			// studentState: values.studentState,
			// vaccinationState: values.vaccinationState,
			medicalInformationId:
				medicalInformation != null ? medicalInformation.id : undefined,
		});

		if (result.hasOwnProperty('name')) {
			const key = 'studentAdd';

			message.loading({ content: 'Зареждане...', key });
			setTimeout(() => {
				message.success({
					content: `Записът '${values.name}' е добавен успешно`,
					key,
					duration: 1,
				});

				GetStudents().then((_students) => {
					setStudents(_students);
					setSliderMin(Math.min(..._students.map((obj) => Number(obj.id))));
					setSliderMax(Math.max(..._students.map((obj) => Number(obj.id))));
				});
			}, 1000);
		}

		setVisible(false);
	};

	useEffect(() => {
		document.title = `Ученици`;
		setLoading(true);
		GetStudents().then((_students) => {
			setStudents(_students);
			setSliderMin(Math.min(..._students.map((obj) => Number(obj.id))));
			setSliderMax(Math.max(..._students.map((obj) => Number(obj.id))));
			setLoading(false);
		});
	}, []);

	let studentsTable: any;

	if (students.length === 0 && loading !== false) {
		studentsTable = <Skeleton active />;
	} else {
		studentsTable = (
			<StudentsTable
				students={filteredData.length > 0 ? filteredData : students}
				onEdit={onEdit}
				onDelete={onDelete}
			/>
		);
	}

	return (
		<>
			<Row justify='center' align='middle'>
				<Col>
					<Title>Ученици</Title>
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
						Добавяне на ученик
					</Button>
					<Button
						style={{ marginInlineStart: 16 }}
						type='primary'
						onClick={() => {
							setLoading(true);

							GetStudents().then((_students) => {
								setStudents(_students);

								setSliderMin(
									Math.min(..._students.map((obj) => Number(obj.id))),
								);
								setSliderMax(
									Math.max(..._students.map((obj) => Number(obj.id))),
								);

								setLoading(false);
							});
						}}>
						<SyncOutlined spin={loading} />
						Презареждане
					</Button>

					<CreateStudentModal
						visible={visible}
						onCreate={onCreate}
						onCancel={() => {
							setVisible(false);
						}}
					/>
				</Col>
			</Row>
			<br />
			<Row align='top' gutter={[8, 8]}>
				<Col span={students.length === 0 ? 16 : 10} offset={4}>
					{studentsTable}
				</Col>
				{!loading && students.length !== 0 ? (
					<Col span={6} offset={3}>
						<Row align='top' justify='end' gutter={[8, 8]}>
							<Col span={24}>
								<Card title='Търсене' bordered={true}>
									<Search
										placeholder='Въведете ключва дума...'
										onSearch={(value) => {
											const key = 'updateable';
											const data = students.filter((obj) =>
												obj.name.toLowerCase().includes(value.toLowerCase()),
											);

											message.loading({
												content: 'Търсене в записите...',
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

							{students.length > 1 ? (
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
												const data = students.slice(value[0] - 1, value[1]);

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

export { StudentsPage };
