import axios from 'axios';
import { Grade } from '../models/Grade';
import { apiUrl } from '../utilities/globals';

async function GetGrades(): Promise<Grade[]> {
	const result = await axios
		.get(apiUrl('grades'))
		.then((response) => response.data);

	console.log(result);

	return result as Grade[];
}
async function GetGradeById(id: number): Promise<Grade> {
	const result = await axios
		.get(apiUrl('grades') + `/${id}`)
		.then((response) => response.data);

	return result as Grade;
}

async function CreateGrade(data: { name: string }): Promise<Grade> {
	const result = await axios
		.post(apiUrl('grades'), data)
		.then((response) => response.data);

	return result as Grade;
}

async function DeleteGrade(Grade: Grade): Promise<Grade> {
	const result = await axios
		.delete(apiUrl('grades') + `/${Grade.id}`, {
			data: Grade,
		})
		.then((response) => response.data);

	return result as Grade;
}

async function UpdateGrade(Grade: Grade): Promise<Boolean> {
	console.log(Grade);
	const result = await axios
		.put(apiUrl('grades') + `/${Grade.id}`, Grade)
		.then((response) => response.status === 204);

	console.log(result);

	return result as Boolean;
}

export { GetGrades, GetGradeById, CreateGrade, DeleteGrade, UpdateGrade };
