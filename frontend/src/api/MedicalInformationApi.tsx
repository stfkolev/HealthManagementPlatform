import axios from 'axios';
import { MedicalInformation } from '../models/MedicalInformation';
import { apiUrl } from '../utilities/globals';

async function GetMedicalInformations(): Promise<MedicalInformation[]> {
	const result = await axios
		.get(apiUrl('medicalInformation'))
		.then((response) => response.data);

	return result as MedicalInformation[];
}
async function GetMedicalInformationById(
	id: number,
): Promise<MedicalInformation> {
	const result = await axios
		.get(apiUrl('medicalInformation') + `/${id}`)
		.then((response) => response.data);

	return result as MedicalInformation;
}

async function CreateMedicalInformation(data: {
	age: number;
	bodyMass: number;
	heartRate: number;
	bloodPressure: number;
	height: number;

	bloodType: string;

	studentId: number;
	studentState: number;
	vaccinationState: number;
}): Promise<MedicalInformation> {
	const result = await axios
		.post(apiUrl('medicalInformation'), data)
		.then((response) => response.data);

	return result as MedicalInformation;
}

async function DeleteMedicalInformation(
	medicalInformation: MedicalInformation,
): Promise<MedicalInformation> {
	const result = await axios
		.delete(apiUrl('medicalInformation') + `/${medicalInformation.id}`, {
			data: medicalInformation,
		})
		.then((response) => response.data);

	return result as MedicalInformation;
}

async function UpdateMedicalInformation(
	medicalInformation: MedicalInformation,
): Promise<Boolean> {
	const result = await axios
		.put(
			apiUrl('medicalInformation') + `/${medicalInformation.id}`,
			medicalInformation,
		)
		.then((response) => response.status === 204);

	return result as Boolean;
}

export {
	GetMedicalInformations,
	GetMedicalInformationById,
	CreateMedicalInformation,
	DeleteMedicalInformation,
	UpdateMedicalInformation,
};
