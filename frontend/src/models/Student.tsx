export interface Student {
	id: bigint;
	name: string;

	address: string;
	phone: string;

	gradeId: bigint;
	genderId: bigint;
	medicalInformationId?: bigint;
}
