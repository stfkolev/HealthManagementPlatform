import React, { useState } from 'react';
import { Table, Space, notification, Popconfirm, Button, message } from 'antd';
import { Grade } from '../../models/Grade';
import { DeleteGrade, UpdateGrade } from '../../api/GradeApi';
import { EditGradeModal } from '../modals/grades/EditGradeModal';

const { Column } = Table;

interface GradesTableProps {
	grades: Grade[];
	onDelete: (grade: Grade) => void;
	onEdit: () => void;
}

const openNotification = (grade: Grade) => {
	notification['info']({
		message: 'Избран пол',
		description: `Вие избрахте '${grade?.name}'`,
		duration: 2,
	});
};

const GradesTable: React.FC<GradesTableProps> = ({
	grades,
	onEdit,
	onDelete,
}) => {
	const [visible, setVisible] = useState(false);
	const [activeModalId, setActiveModalId] = useState(BigInt(0));

	const onEditInternal = async (values: Grade) => {
		const result = await UpdateGrade({ id: values.id, name: values.name });

		if (result === true) {
			const key = 'gradeEdit';

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
		<Table dataSource={grades} rowKey='id'>
			<Column
				title='Идентификатор'
				dataIndex='id'
				onCell={(record, rowIndex) => {
					return {
						onClick: (event) => {
							const color = record as Grade;

							openNotification(color);
						},
					};
				}}
			/>

			<Column
				title='Име'
				dataIndex='name'
				sorter={(left: Grade, right: Grade) => {
					return left.name.localeCompare(right.name);
				}}
				onCell={(record, rowIndex) => {
					return {
						onClick: (event) => {
							const grade = record as Grade;

							openNotification(grade);
						},
					};
				}}
			/>

			<Column
				title='Действия'
				key='actions'
				render={(text: any, record: Grade) => (
					<Space size='middle'>
						<Popconfirm
							title='Сигурни ли сте, че искате да изтриете този запис?'
							okType='danger'
							onConfirm={async (event) => {
								const result = await DeleteGrade(record);

								onDelete(result as Grade);
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
							<EditGradeModal
								grade={record}
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

export { GradesTable };
