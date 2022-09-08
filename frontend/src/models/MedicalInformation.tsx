export interface MedicalInformation {
	id: number;
	studentId: number;

	age: number;
	bodyMass: number;
	heartRate: number;
	bloodPressure: number;
	height: number;

	bloodType: string;
	note: string;

	studentState: number;
	vaccinationState: number;
}
