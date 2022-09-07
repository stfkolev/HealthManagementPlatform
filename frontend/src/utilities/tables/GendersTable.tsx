import React, { useState } from 'react';
import { Table, Space, notification, Popconfirm, Button, message } from 'antd';
import { Gender } from '../../models/Gender';
import { DeleteGender, UpdateGender } from '../../api/GenderApi';
import { EditGenderModal } from '../modals/genders/EditGenderModal';

const { Column } = Table;

interface GendersTableProps {
	genders: Gender[];
	onDelete: (gender: Gender) => void;
	onEdit: () => void;
}

const openNotification = (gender: Gender) => {
	notification['info']({
		message: 'Избран пол',
		description: `Вие избрахте '${gender?.name}'`,
		duration: 2,
	});
};

const GendersTable: React.FC<GendersTableProps> = ({
	genders,
	onEdit,
	onDelete,
}) => {
	const [visible, setVisible] = useState(false);
	const [activeModalId, setActiveModalId] = useState(BigInt(0));

	const onEditInternal = async (values: Gender) => {
		const result = await UpdateGender({ id: values.id, name: values.name });

		if (result === true) {
			const key = 'genderEdit';

			message.loading({ content: 'Зареждане...', key });
			setTimeout(() => {
				message.success({
					content: `Успешно редактирахте името на пола на '${values.name}'`,
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
		<Table dataSource={genders} rowKey='id'>
			<Column
				title='Идентификатор'
				dataIndex='id'
				onCell={(record, rowIndex) => {
					return {
						onClick: (event) => {
							const color = record as Gender;

							openNotification(color);
						},
					};
				}}
			/>

			<Column
				title='Име'
				dataIndex='name'
				sorter={(left: Gender, right: Gender) => {
					return left.name.localeCompare(right.name);
				}}
				onCell={(record, rowIndex) => {
					return {
						onClick: (event) => {
							const gender = record as Gender;

							openNotification(gender);
						},
					};
				}}
			/>

			<Column
				title='Действия'
				key='actions'
				render={(text: any, record: Gender) => (
					<Space size='middle'>
						<Popconfirm
							title='Сигурни ли сте, че искате да изтриете този запис?'
							okType='danger'
							onConfirm={async (event) => {
								const result = await DeleteGender(record);

								onDelete(result as Gender);
							}}
							onCancel={(event) => {
								console.log(text);
							}}
							okText='Да, Изтрий'
							cancelText='Не, Прекъсни'>
							<Button type='dashed' danger>
								Изтрий
							</Button>
						</Popconfirm>

						<Button
							type='dashed'
							danger
							onClick={() => {
								setActiveModalId(record.id);
								setVisible(true);
							}}
							style={{ borderColor: '#e67e22', color: '#e67e22' }}>
							Редакция
						</Button>

						{activeModalId === record.id && (
							<EditGenderModal
								gender={record}
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

export { GendersTable };
