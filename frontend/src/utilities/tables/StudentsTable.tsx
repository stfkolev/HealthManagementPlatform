import React, { useEffect, useState } from 'react';
import { Table, Space, notification, Popconfirm, Button, message } from 'antd';
import { Student } from '../../models/Student';
import { DeleteStudent, UpdateStudent } from '../../api/StudentApi';
import { EditStudentModal } from '../modals/students/EditStudentModal';
import { GetGenders } from '../../api/GenderApi';
import { GetMedicalInformations } from '../../api/MedicalInformationApi';
import { GetGrades } from '../../api/GradeApi';
import { Gender } from '../../models/Gender';
import { MedicalInformation } from '../../models/MedicalInformation';
import { Grade } from '../../models/Grade';

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
	const [genders, setGenders] = useState<Gender[]>([]);
	const [medicalInformation, setMedicalInformations] = useState<
		MedicalInformation[]
	>([]);
	const [grades, setGrades] = useState<Grade[]>([]);
	const [visible, setVisible] = useState(false);
	const [activeModalId, setActiveModalId] = useState(BigInt(0));

	useEffect(() => {
		GetGenders().then((values) => {
			setGenders(values);
		});
		GetMedicalInformations().then((values) => {
			setMedicalInformations(values);
		});
		GetGrades().then((values) => {
			setGrades(values);
		});
	}, []);

	const onEditInternal = async (values: Student) => {
		const result = await UpdateStudent({
			id: values.id,
			name: values.name,

			address: values.address,
			phone: values.phone,

			gradeId: values.gradeId,
			genderId: values.genderId,
			medicalInformationId: values.medicalInformationId,
		});

		if (result === true) {
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
		setActiveModalId(BigInt(0));
	};
	return (
		<Table dataSource={students} rowKey='id'>
			<Column
				title='Идентификатор'
				dataIndex='id'
				onCell={(record, rowIndex) => {
					return {
						onClick: (event) => {
							const student = record as Student;

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

							openNotification(student);
						},
					};
				}}
			/>
			{/* 
			<Column
				title='Luggage Space'
				dataIndex='luggageSpace'
				render={(value, record, index) => (value ? 'Yes' : 'No')}
				filters={[
					{
						text: 'Yes',
						value: true,
					},
					{
						text: 'No',
						value: false,
					},
				]}
				filterMultiple={false}
				onFilter={(value, record) => {
					return (record as Student).luggageSpace === value;
				}}
				onCell={(record, rowIndex) => {
					return {
						onClick: (event) => {
							const student = record as Student;

							openNotification(student);
						},
					};
				}}
			/> */}

			<Column
				title='Клас'
				dataIndex='gradeId'
				render={(value, record, index) => {
					const data = grades.find((obj) => obj.id === value);

					return data === undefined ? value : data.name;
				}}
				onCell={(record, rowIndex) => {
					return {
						onClick: (event) => {
							const student = record as Student;

							openNotification(student);
						},
					};
				}}
			/>

			<Column
				title='Пол'
				dataIndex='genderId'
				render={(value, record, index) => {
					const data = genders.find((obj) => obj.id === value);

					return data === undefined ? value : data.name;
				}}
				onCell={(record, rowIndex) => {
					return {
						onClick: (event) => {
							const student = record as Student;

							openNotification(student);
						},
					};
				}}
			/>

			<Column
				title='Actions'
				key='actions'
				render={(text: any, record: Student) => (
					<Space size='middle'>
						<Popconfirm
							title='Are you sure delete this student?'
							okType='danger'
							onConfirm={async (event) => {
								const result = await DeleteStudent(record);

								onDelete(result as Student);
							}}
							onCancel={(event) => {
								console.log(text);
							}}
							okText='Yes, Delete'
							cancelText='No, Cancel'>
							<Button type='dashed' danger>
								Delete
							</Button>
						</Popconfirm>

						<Button
							type='dashed'
							danger
							onClick={() => {
								setActiveModalId(record.id);
								setVisible(true);
							}}
							style={{
								borderColor: '#e67e22',
								color: '#e67e22',
							}}>
							Edit
						</Button>

						{activeModalId === record.id && (
							<EditStudentModal
								student={record}
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
	);
};

export { StudentsTable };
