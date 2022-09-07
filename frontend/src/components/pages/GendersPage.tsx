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
} from 'antd';

import { PlusOutlined, SyncOutlined } from '@ant-design/icons';

import { CreateGender, GetGenders } from '../../api/GenderApi';
import { Gender } from '../../models/Gender';
import { GendersTable } from '../../utilities/tables/GendersTable';
import {
	CreateGenderModal,
	Values,
} from '../../utilities/modals/genders/CreateGenderModal';

const { Title } = Typography;
const { Search } = Input;

const GendersPage = () => {
	const [genders, setGenders] = useState<Gender[]>([]);
	const [filteredData, setFilteredData] = useState<Gender[]>([]);
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [sliderMin, setSliderMin] = useState(0);
	const [sliderMax, setSliderMax] = useState(0);

	const onEdit = async () => {
		GetGenders().then((_genders) => {
			setGenders(_genders);
			setSliderMin(Math.min(...genders.map((obj) => Number(obj.id))));
			setSliderMax(Math.max(...genders.map((obj) => Number(obj.id))));
		});
	};

	const onDelete = async (gender: Gender) => {
		const key = 'genderAdd';

		message.loading({ content: 'Loading...', key });

		setTimeout(() => {
			message.success({
				content: `Записът '${gender.name}' е успешно изтрит от таблицата`,
				key,
				duration: 1,
			});

			GetGenders().then((_genders) => {
				setGenders(_genders);
				setSliderMin(Math.min(...genders.map((obj) => Number(obj.id))));
				setSliderMax(Math.max(...genders.map((obj) => Number(obj.id))));
			});
		}, 1000);
	};

	const onCreate = async (values: Values) => {
		const result = await CreateGender({ name: values.name });

		if (result.hasOwnProperty('name')) {
			const key = 'genderAdd';

			message.loading({ content: 'Зареждане...', key });
			setTimeout(() => {
				message.success({
					content: `Записът '${values.name}' е добавен успешно`,
					key,
					duration: 1,
				});

				GetGenders().then((_genders) => {
					setGenders(_genders);
					setSliderMin(Math.min(..._genders.map((obj) => Number(obj.id))));
					setSliderMax(Math.max(..._genders.map((obj) => Number(obj.id))));
				});
			}, 1000);
		}

		setVisible(false);
	};

	useEffect(() => {
		document.title = `Полове`;
		setLoading(true);
		GetGenders().then((_genders) => {
			setGenders(_genders);
			setSliderMin(Math.min(..._genders.map((obj) => Number(obj.id))));
			setSliderMax(Math.max(..._genders.map((obj) => Number(obj.id))));
			setLoading(false);
		});
	}, []);

	let gendersTable: any;

	if (genders.length === 0 && loading !== false) {
		gendersTable = <Skeleton active />;
	} else {
		gendersTable = (
			<GendersTable
				genders={filteredData.length > 0 ? filteredData : genders}
				onEdit={onEdit}
				onDelete={onDelete}
			/>
		);
	}

	return (
		<>
			<Row justify='center' align='middle'>
				<Col>
					<Title>Полове</Title>
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
						Добавяне на пол
					</Button>
					<Button
						style={{ marginInlineStart: 16 }}
						type='primary'
						onClick={() => {
							setLoading(true);

							GetGenders().then((_genders) => {
								setGenders(_genders);

								setSliderMin(
									Math.min(..._genders.map((obj) => Number(obj.id))),
								);
								setSliderMax(
									Math.max(..._genders.map((obj) => Number(obj.id))),
								);

								setLoading(false);
							});
						}}>
						<SyncOutlined spin={loading} />
						Презареждане
					</Button>

					<CreateGenderModal
						visible={visible}
						onCreate={onCreate}
						onCancel={() => {
							setVisible(false);
						}}
					/>
				</Col>
			</Row>

			<br />

			<Row align='top'>
				<Col span={genders.length === 0 ? 16 : 10} offset={4}>
					{gendersTable}
				</Col>
				{!loading && genders.length !== 0 ? (
					<Col span={6} offset={1}>
						<Row align='top'>
							<Col span={24}>
								<Card title='Търсене' bordered={true}>
									<Search
										placeholder='Въведете ключва дума...'
										onSearch={(value) => {
											const key = 'updateable';
											const data = genders.filter((obj) =>
												obj.name.toLowerCase().includes(value.toLowerCase()),
											);

											message.loading({
												content: ' Търсене в записите...',
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

							{genders.length > 1 ? (
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
												const data = genders.slice(value[0] - 1, value[1]);

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

export { GendersPage };
