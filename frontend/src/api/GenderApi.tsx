import axios from 'axios';
import { Gender } from '../models/Gender';
import { apiUrl } from '../utilities/globals';

async function GetGenders(): Promise<Gender[]> {
	const result = await axios
		.get(apiUrl('genders'))
		.then((response) => response.data);

	console.log(result);

	return result as Gender[];
}
async function GetGenderById(id: number): Promise<Gender> {
	const result = await axios
		.get(apiUrl('genders') + `/${id}`)
		.then((response) => response.data);

	return result as Gender;
}

async function CreateGender(data: { name: string }): Promise<Gender> {
	const result = await axios
		.post(apiUrl('genders'), data)
		.then((response) => response.data);

	return result as Gender;
}

async function DeleteGender(Gender: Gender): Promise<Gender> {
	const result = await axios
		.delete(apiUrl('genders') + `/${Gender.id}`, {
			data: Gender,
		})
		.then((response) => response.data);

	return result as Gender;
}

async function UpdateGender(Gender: Gender): Promise<Boolean> {
	console.log(Gender);
	const result = await axios
		.put(apiUrl('genders') + `/${Gender.id}`, Gender)
		.then((response) => response.status === 204);

	console.log(result);

	return result as Boolean;
}

export { GetGenders, GetGenderById, CreateGender, DeleteGender, UpdateGender };
