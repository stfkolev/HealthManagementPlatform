import axios from 'axios';
import { Student } from '../models/Student';
import { apiUrl } from '../utilities/globals';

async function GetStudents(): Promise<Student[]> {
	const result = await axios
		.get(apiUrl('students'))
		.then((response) => response.data);

	console.log(result);

	return result as Student[];
}
async function GetStudentById(id: bigint): Promise<Student> {
	const result = await axios
		.get(apiUrl('students') + `/${id}`)
		.then((response) => response.data);

	return result as Student;
}

async function CreateStudent(data: {
	name: string;

	address: string;
	phone: string;

	gradeId: bigint;
	genderId: bigint;
	medicalInformationId: bigint;
}): Promise<Student> {
	const result = await axios
		.post(apiUrl('students'), data)
		.then((response) => response.data);

	return result as Student;
}

async function DeleteStudent(Student: Student): Promise<Student> {
	const result = await axios
		.delete(apiUrl('students') + `/${Student.id}`, {
			data: Student,
		})
		.then((response) => response.data);

	return result as Student;
}

async function UpdateStudent(Student: Student): Promise<Boolean> {
	console.log(Student);
	const result = await axios
		.put(apiUrl('students') + `/${Student.id}`, Student)
		.then((response) => response.status === 204);

	console.log(result);

	return result as Boolean;
}

export {
	GetStudents,
	GetStudentById,
	CreateStudent,
	DeleteStudent,
	UpdateStudent,
};
