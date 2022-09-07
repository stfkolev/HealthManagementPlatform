import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { Student } from '../../../models/Student';

interface StudentEditFormProps {
	student: Student;
	visible: boolean;
	onEdit: (values: Student) => void;
	onCancel: () => void;
}

const EditStudentModal: React.FC<StudentEditFormProps> = ({
	student,
	visible,
	onEdit,
	onCancel,
}) => {
	const [form] = Form.useForm();

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

						onEdit(values as Student);
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
					<Input disabled />
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
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export { EditStudentModal };
