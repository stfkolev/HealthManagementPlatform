import React, { useEffect, useState } from 'react';
import {
	Table,
	Space,
	notification,
	Popconfirm,
	Button,
	message,
	Drawer,
} from 'antd';
import { Student } from '../../models/Student';
import { DeleteStudent, UpdateStudent } from '../../api/StudentApi';
import { EditStudentModal } from '../modals/students/EditStudentModal';
import { GetGenders } from '../../api/GenderApi';
import {
	CreateMedicalInformation,
	GetMedicalInformations,
	UpdateMedicalInformation,
} from '../../api/MedicalInformationApi';
import { GetGrades } from '../../api/GradeApi';
import { Gender } from '../../models/Gender';
import { MedicalInformation } from '../../models/MedicalInformation';
import { Grade } from '../../models/Grade';
import StudentDrawer from '../drawers/StudentDrawer';

const { Column } = Table;

interface StudentsTableProps {
	students: Student[];
	onDelete: (student: Student) => void;
	onEdit: () => void;
}

const openNotification = (student: Student) => {
	notification['info']({
		message: 'Избран ученик',
		description: `Вие избрахте ученик с име '${student?.name}'`,
		duration: 2,
	});
};

const StudentsTable: React.FC<StudentsTableProps> = ({
	students,
	onEdit,
	onDelete,
}) => {
	const [open, setOpen] = useState(false);

	const [selectedStudent, setSelectedStudent] = useState<Student>();
	const [currentStudentGender, setCurrentStudentGender] = useState<Gender>();
	const [currentStudentGrade, setCurrentStudentGrade] = useState<Grade>();
	const [currentStudentMedInfo, setCurrentStudentMedInfo] =
		useState<MedicalInformation>();

	const [genders, setGenders] = useState<Gender[]>([]);
	const [medicalInformation, setMedicalInformations] = useState<
		MedicalInformation[]
	>([]);
	const [grades, setGrades] = useState<Grade[]>([]);
	const [visible, setVisible] = useState(false);
	const [activeModalId, setActiveModalId] = useState(Number(0));

	const [gradeFilters, setGradeFilters] = useState<any[]>([]);
	const [genderFilters, setGenderFilters] = useState<any[]>([]);

	const setCurrentStudent = (student: Student) => {
		const gender = genders.find((obj) => obj.id === student.genderId);
		const grade = grades.find((obj) => obj.id === student.gradeId);
		const medicalInfo = medicalInformation.find(
			(obj) => obj.id === student.medicalInformationId,
		);

		setCurrentStudentGender(gender);
		setCurrentStudentGrade(grade);
		setCurrentStudentMedInfo(medicalInfo);
		setSelectedStudent(student);
	};

	useEffect(() => {
		GetGenders().then((values) => {
			setGenders(values);
			setGenderFilters([]);
			values.forEach((data) =>
				genderFilters.push({ text: data.name, value: data.name }),
			);
			setGenderFilters(genderFilters);
		});

		GetMedicalInformations().then((values) => {
			setMedicalInformations(values);
		});

		GetGrades().then((values) => {
			setGrades(values);
			setGradeFilters([]);
			values.forEach((data) =>
				gradeFilters.push({ text: data.name, value: data.name }),
			);
			setGradeFilters(gradeFilters);
		});
	}, []);

	const onEditInternal = async (
		values: Student,
		medicalInformation: MedicalInformation,
	) => {
		var newMedicalInfo = null;
		if (
			values.medicalInformationId === null ||
			values.medicalInformationId === undefined
		) {
			medicalInformation.studentId = values.id;
			newMedicalInfo = await CreateMedicalInformation(medicalInformation);
		}
		const result = await UpdateStudent({
			id: values.id,
			name: values.name,

			address: values.address,
			phone: values.phone,

			gradeId: Number(values.gradeId),
			genderId: Number(values.genderId),
			medicalInformationId:
				newMedicalInfo === null
					? values.medicalInformationId
					: newMedicalInfo.id,
		});

		const medicalInfoResult = await UpdateMedicalInformation(
			medicalInformation,
		);

		if (result === true && medicalInfoResult == true) {
			const key = 'studentEdit';

			message.loading({ content: 'Зареждане...', key });
			setTimeout(() => {
				message.success({
					content: `Успешно редактирахте информацията на ученика`,
					key,
					duration: 1,
				});

				onEdit();
			}, 1000);
		}

		setVisible(false);
		setActiveModalId(Number(0));
	};
	return (
		<>
			<StudentDrawer
				student={selectedStudent}
				currentGender={currentStudentGender}
				currentGrade={currentStudentGrade}
				medicalInformation={currentStudentMedInfo}
				open={open}
				onClose={() => setOpen(false)}
			/>
			<Table dataSource={students} rowKey='id'>
				<Column
					title='Идентификатор'
					dataIndex='id'
					onCell={(record, rowIndex) => {
						return {
							onClick: (event) => {
								const student = record as Student;

								setOpen(true);
								setCurrentStudent(student);

								openNotification(student);
							},
						};
					}}
				/>

				<Column
					title='Имена'
					dataIndex='name'
					sorter={(left: Student, right: Student) => {
						return left.name.localeCompare(right.name);
					}}
					onCell={(record, rowIndex) => {
						return {
							onClick: (event) => {
								const student = record as Student;
								setOpen(true);

								setCurrentStudent(student);
								openNotification(student);
							},
						};
					}}
				/>

				<Column
					title='Адрес'
					dataIndex='address'
					sorter={(left: Student, right: Student) => {
						return left.address.localeCompare(right.address);
					}}
					onCell={(record, rowIndex) => {
						return {
							onClick: (event) => {
								const student = record as Student;

								setOpen(true);
								setCurrentStudent(student);

								openNotification(student);
							},
						};
					}}
				/>

				<Column
					title='Телефон'
					dataIndex='phone'
					sorter={(left: Student, right: Student) => {
						return left.address.localeCompare(right.address);
					}}
					onCell={(record, rowIndex) => {
						return {
							onClick: (event) => {
								const student = record as Student;
								setOpen(true);
								setCurrentStudent(student);
								openNotification(student);
							},
						};
					}}
				/>

				<Column
					title='Клас'
					dataIndex='gradeId'
					filters={gradeFilters}
					onFilter={(value, record: Student) => {
						const data = grades.find(
							(obj) => record.gradeId === obj.id,
						) as Grade;

						return value.toString().includes(data.name);
					}}
					render={(value, record, index) => {
						const data = grades.find((obj) => obj.id === value);

						return data === undefined ? value : data.name;
					}}
					onCell={(record, rowIndex) => {
						return {
							onClick: (event) => {
								const student = record as Student;
								setOpen(true);
								setCurrentStudent(student);
								openNotification(student);
							},
						};
					}}
				/>

				<Column
					title='Пол'
					dataIndex='genderId'
					filters={genderFilters}
					onFilter={(value, record: Student) => {
						const data = genders.find(
							(obj) => record.genderId === obj.id,
						) as Gender;

						return value.toString().includes(data.name);
					}}
					render={(value, record, index) => {
						const data = genders.find((obj) => obj.id === value);

						return data === undefined ? value : data.name;
					}}
					onCell={(record, rowIndex) => {
						return {
							onClick: (event) => {
								const student = record as Student;

								setOpen(true);
								setCurrentStudent(student);

								openNotification(student);
							},
						};
					}}
				/>

				<Column
					title='Състояние'
					dataIndex='medicalInformationId'
					filters={[
						{
							text: 'Здрав',
							value: 'Здрав',
						},
						{
							text: 'Болен',
							value: 'Болен',
						},
					]}
					onFilter={(value, record: Student) => {
						const data = medicalInformation.find(
							(obj) => record.medicalInformationId === obj.id,
						) as MedicalInformation;

						return value
							.toString()
							.includes(data.studentState === 0 ? 'Здрав' : 'Болен');
					}}
					render={(value, record, index) => {
						const data = medicalInformation.find((obj) => obj.id === value);

						return data === undefined
							? value
							: data.studentState === 0
							? 'Здрав'
							: 'Болен';
					}}
					onCell={(record, rowIndex) => {
						return {
							onClick: (event) => {
								const student = record as Student;

								setOpen(true);
								setCurrentStudent(student);

								openNotification(student);
							},
						};
					}}
				/>

				<Column
					title='Действия'
					key='actions'
					render={(text: any, record: Student) => (
						<Space size='middle'>
							<Popconfirm
								title='Сигурни ли сте, че искате да изтриете този запис?'
								okType='danger'
								onConfirm={async (event) => {
									const result = await DeleteStudent(record);

									onDelete(result as Student);
								}}
								onCancel={(event) => {
									console.log(text);
								}}
								okText='Да, Изтрий'
								cancelText='Не, Прекъсни'>
								<Button type='dashed' danger>
									Изтриване
								</Button>
							</Popconfirm>

							<Button
								type='dashed'
								danger
								onClick={() => {
									setActiveModalId(record.id);
									setCurrentStudent(record);
									setVisible(true);
								}}
								style={{
									borderColor: '#e67e22',
									color: '#e67e22',
								}}>
								Редактиране
							</Button>

							{activeModalId === record.id && (
								<EditStudentModal
									student={record}
									medicalInformation={currentStudentMedInfo}
									visible={visible}
									onEdit={onEditInternal}
									onCancel={() => {
										setVisible(false);
									}}
								/>
							)}
						</Space>
					)}
				/>
			</Table>
		</>
	);
};

export { StudentsTable };
