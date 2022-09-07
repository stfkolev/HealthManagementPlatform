import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Divider, InputNumber } from 'antd';
import { Student } from '../../../models/Student';
import { MedicalInformation } from '../../../models/MedicalInformation';
import { Gender } from '../../../models/Gender';
import { Grade } from '../../../models/Grade';
import { GetGenders } from '../../../api/GenderApi';
import { GetGrades } from '../../../api/GradeApi';
import Title from 'antd/lib/typography/Title';
import { GetMedicalInformationById } from '../../../api/MedicalInformationApi';

const { Option } = Select;

interface StudentEditFormProps {
	student: Student;
	visible: boolean;
	onEdit: (values: Student, medicalInformation?: MedicalInformation) => void;
	onCancel: () => void;
}

const EditStudentModal: React.FC<StudentEditFormProps> = ({
	student,
	visible,
	onEdit,
	onCancel,
}) => {
	const [form] = Form.useForm();

	const [genders, setGenders] = useState<Gender[]>([]);
	const [grades, setGrades] = useState<Grade[]>([]);
	const [temporaryMedicalInfo, setTemporaryMedicalInfo] =
		useState<MedicalInformation>();

	useEffect(() => {
		GetGenders().then((values) => {
			setGenders(values);
		});
		GetGrades().then((values) => {
			setGrades(values);
		});

		if (student.medicalInformationId != null) {
			const data = GetMedicalInformationById(
				student?.medicalInformationId,
			).then((values) => setTemporaryMedicalInfo(values));
		}
	}, []);

	useEffect(() => {
		form.setFieldsValue(student);
	}, [form, student]);

	return (
		<Modal
			visible={visible}
			title='Редактиране на ученик'
			okText='Запази'
			cancelText='Прекъсни'
			onCancel={onCancel}
			onOk={() => {
				form
					.validateFields()
					.then((values) => {
						form.resetFields();

						onEdit(values as Student, temporaryMedicalInfo);
					})
					.catch((info) => {
						console.log('Validate Failed:', info);
					});
			}}>
			<Form form={form} layout='vertical' name='form_in_modal'>
				<Form.Item
					name='id'
					label='Идентификатор на ученика'
					rules={[{ required: true }]}>
					<Input disabled value={student.id} />
				</Form.Item>

				<Form.Item
					name='name'
					label='Име на ученика'
					rules={[
						{
							required: true,
							message: 'Моля въведете име на ученика!',
						},
					]}>
					<Input placeholder='Стефан Колев' />
				</Form.Item>
				<Form.Item
					name='address'
					label='Адрес на ученика'
					rules={[
						{
							required: true,
							message: 'Моля въведете адрес на ученика!',
						},
					]}>
					<Input placeholder='Варна, България' />
				</Form.Item>
				<Form.Item
					name='phone'
					label='Телефон на ученика'
					rules={[
						{
							pattern:
								/(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/,
							required: true,
							message: 'Моля въведете валиден телефон на ученика!',
						},
					]}>
					<Input placeholder='+359 876 181 954' />
				</Form.Item>
				<Form.Item
					name='genderId'
					label='Пол на ученика'
					rules={[
						{
							required: true,
							message: 'Моля изберете пол на ученика!',
						},
					]}>
					<Select
						allowClear
						showSearch
						placeholder='Изберете пол'
						optionFilterProp='children'
						filterOption={(input, option) =>
							(option!.children as unknown as string)
								.toLowerCase()
								.includes(input.toLowerCase())
						}>
						{genders.map((data) => (
							<Option value={data.id.toString()}>{data.name}</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					name='gradeId'
					label='Клас'
					rules={[
						{
							required: true,
							message: 'Моля изберете клас!',
						},
					]}>
					<Select
						allowClear
						showSearch
						placeholder='Изберете клас'
						optionFilterProp='children'
						filterOption={(input, option) =>
							(option!.children as unknown as string)
								.toLowerCase()
								.includes(input.toLowerCase())
						}>
						{grades.map((data) => (
							<Option value={data.id.toString()}>{data.name}</Option>
						))}
					</Select>
				</Form.Item>

				<Divider />

				<Title level={4}>Медицинска Информация</Title>

				<Form.Item name='age' label='Възраст'>
					<InputNumber placeholder='22' style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item name='height' label='Височина'>
					<InputNumber
						min={5}
						max={120}
						placeholder='184'
						style={{ width: '100%' }}
					/>
				</Form.Item>

				<Form.Item name='bodyMass' label='Тегло'>
					<InputNumber
						min={2}
						max={700}
						placeholder='90'
						style={{ width: '100%' }}
					/>
				</Form.Item>

				<Form.Item name='heartRate' label='Сърдечен Ритъм'>
					<InputNumber
						min={27}
						max={480}
						placeholder='80'
						style={{ width: '100%' }}
					/>
				</Form.Item>

				<Form.Item name='bloodPressure' label='Кръвно Налягане'>
					<InputNumber
						min={70}
						max={160}
						placeholder='80'
						style={{ width: '100%' }}
					/>
				</Form.Item>

				<Form.Item name='bloodType' label='Кръвна Група'>
					<Input placeholder='0-' />
				</Form.Item>

				<Form.Item name='studentState' label='Здравно Състояние'>
					<Select
						allowClear
						showSearch
						placeholder='Изберете ваксинационно състояние'
						optionFilterProp='children'
						filterOption={(input, option) =>
							(option!.children as unknown as string)
								.toLowerCase()
								.includes(input.toLowerCase())
						}>
						<Option value={0}>Здрав</Option>
						<Option value={1}>Болен</Option>
					</Select>
				</Form.Item>

				<Form.Item name='vaccinationState' label='Ваксинационно Състояние'>
					<Select
						allowClear
						showSearch
						placeholder='Изберете ваксинационно състояние'
						optionFilterProp='children'
						filterOption={(input, option) =>
							(option!.children as unknown as string)
								.toLowerCase()
								.includes(input.toLowerCase())
						}>
						<Option value={0}>Ваксиниран</Option>
						<Option value={1}>Неваксиниран</Option>
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export { EditStudentModal };
