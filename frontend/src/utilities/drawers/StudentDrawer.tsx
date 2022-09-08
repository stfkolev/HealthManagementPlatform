import React from 'react';
import { Avatar, Col, Divider, Drawer, List, Row } from 'antd';
import { Student } from '../../models/Student';
import Title from 'antd/lib/typography/Title';
import { Grade } from '../../models/Grade';
import { Gender } from '../../models/Gender';
import { MedicalInformation } from '../../models/MedicalInformation';

interface DescriptionItemProps {
	title: string;
	content: React.ReactNode;
}

interface GenericProps {
	student?: Student;
	currentGrade?: Grade;
	currentGender?: Gender;
	medicalInformation?: MedicalInformation;
	open: boolean;
	onClose: () => void;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
	<div className='site-description-item-profile-wrapper'>
		<p className='site-description-item-profile-p-label'>
			<b>{title}:</b>
		</p>
		<p>{content}</p>
	</div>
);

const StudentDrawer: React.FC<GenericProps> = ({
	student,
	currentGrade,
	currentGender,
	medicalInformation,
	open,
	onClose,
}) => {
	return (
		<>
			<Drawer
				width={640}
				placement='left'
				visible={open}
				closable={false}
				onClose={onClose}>
				<p
					className='site-description-item-profile-p'
					style={{ marginBottom: 24 }}></p>
				<p className='site-description-item-profile-p'>
					<Title level={4}>Лична Информация</Title>
				</p>
				<Row>
					<Col span={12}>
						<DescriptionItem title='Имена' content={student?.name} />
					</Col>
					<Col span={12}>
						<DescriptionItem title='Адрес' content={student?.address} />
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem title='Телефон' content={student?.phone} />
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem title='Пол' content={currentGender?.name} />
					</Col>
					<Col span={12}>
						<DescriptionItem title='Клас' content={currentGrade?.name} />
					</Col>
				</Row>
				<Divider />
				<p className='site-description-item-profile-p'>
					<Title level={4}>Медицинска Информация</Title>
				</p>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title='Възраст'
							content={
								medicalInformation?.age === undefined ||
								medicalInformation?.age === 0
									? '(Няма информация)'
									: medicalInformation?.age
							}
						/>
					</Col>
					<Col span={12}>
						<DescriptionItem
							title='Височина'
							content={
								medicalInformation?.height === undefined ||
								medicalInformation?.height === 0
									? '(Няма информация)'
									: medicalInformation?.height
							}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title='Тегло (кг)'
							content={
								medicalInformation?.bodyMass === undefined ||
								medicalInformation?.bodyMass === 0
									? '(Няма информация)'
									: medicalInformation?.bodyMass
							}
						/>
					</Col>
					<Col span={12}>
						<DescriptionItem
							title='Сърдечен Ритъм'
							content={
								medicalInformation?.heartRate === undefined ||
								medicalInformation?.heartRate === 0
									? '(Няма информация)'
									: medicalInformation?.heartRate
							}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title='Кръвно Налягане'
							content={
								medicalInformation?.bloodPressure === undefined ||
								medicalInformation?.bloodPressure === 0
									? '(Няма информация)'
									: medicalInformation?.bloodPressure
							}
						/>
					</Col>
					<Col span={12}>
						<DescriptionItem
							title='Кръвна Група'
							content={
								medicalInformation?.bloodType === undefined ||
								medicalInformation?.bloodType === null ||
								medicalInformation?.bloodType.length === 0
									? '(Няма информация)'
									: medicalInformation?.bloodType
							}
						/>
					</Col>
				</Row>
				<Divider />
				<p className='site-description-item-profile-p'>
					<Title level={4}>Състояние</Title>
				</p>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title='Здравно Състояние'
							content={
								medicalInformation?.studentState === null
									? '(Няма информация)'
									: medicalInformation?.studentState === 0
									? 'Здрав'
									: 'Болен'
							}
						/>
					</Col>
					<Col span={12}>
						<DescriptionItem
							title='Ваксинационно Състояние'
							content={
								medicalInformation?.vaccinationState === null
									? '(Няма информация)'
									: medicalInformation?.vaccinationState === 0
									? 'Ваксиниран'
									: 'Неваксиниран'
							}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<DescriptionItem
							title='Бележка'
							content={
								medicalInformation?.note === null ||
								medicalInformation?.note.length === 0
									? '(Няма информация)'
									: medicalInformation?.note
							}
						/>
					</Col>
				</Row>
			</Drawer>
		</>
	);
};

export default StudentDrawer;
