import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { Grade } from '../../../models/Grade';

interface GradeEditFormProps {
	grade: Grade;
	visible: boolean;
	onEdit: (values: Grade) => void;
	onCancel: () => void;
}

const EditGradeModal: React.FC<GradeEditFormProps> = ({
	grade,
	visible,
	onEdit,
	onCancel,
}) => {
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue(grade);
	}, [form, grade]);

	return (
		<Modal
			visible={visible}
			title='Редактиране на клас'
			okText='Запази'
			cancelText='Прекъсни'
			onCancel={onCancel}
			onOk={() => {
				form
					.validateFields()
					.then((values) => {
						form.resetFields();

						onEdit(values as Grade);
					})
					.catch((info) => {
						console.log('Validate Failed:', info);
					});
			}}>
			<Form form={form} layout='vertical' name='form_in_modal'>
				<Form.Item
					name='id'
					label='Идентификатор на класа'
					rules={[{ required: true }]}>
					<Input disabled />
				</Form.Item>

				<Form.Item
					name='name'
					label='Име на класа'
					rules={[
						{
							required: true,
							message: 'Моля въведете име на класа!',
						},
					]}>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export { EditGradeModal };
