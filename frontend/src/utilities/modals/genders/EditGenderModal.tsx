import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { Gender } from '../../../models/Gender';

interface GenderEditFormProps {
	gender: Gender;
	visible: boolean;
	onEdit: (values: Gender) => void;
	onCancel: () => void;
}

const EditGenderModal: React.FC<GenderEditFormProps> = ({
	gender,
	visible,
	onEdit,
	onCancel,
}) => {
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue(gender);
	}, [form, gender]);

	return (
		<Modal
			visible={visible}
			title='Редактиране на пол'
			okText='Запази'
			cancelText='Прекъсни'
			onCancel={onCancel}
			onOk={() => {
				form
					.validateFields()
					.then((values) => {
						form.resetFields();

						onEdit(values as Gender);
					})
					.catch((info) => {
						console.log('Validate Failed:', info);
					});
			}}>
			<Form form={form} layout='vertical' name='form_in_modal'>
				<Form.Item
					name='id'
					label='Идентификатор на пола'
					rules={[{ required: true }]}>
					<Input disabled />
				</Form.Item>

				<Form.Item
					name='name'
					label='Име на пола'
					rules={[
						{
							required: true,
							message: 'Моля въведете име на пол!',
						},
					]}>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export { EditGenderModal };
