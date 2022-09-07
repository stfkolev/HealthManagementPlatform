using Microsoft.EntityFrameworkCore.Migrations;

namespace SchoolSystem.Migrations
{
    public partial class AddedMedInfoNote : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Genders_GenderId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Grades_GradeId",
                table: "Students");

            migrationBuilder.DeleteData(
                table: "Genders",
                keyColumn: "Id",
                keyValue: 1242346153);

            migrationBuilder.DeleteData(
                table: "Genders",
                keyColumn: "Id",
                keyValue: 1495576618);

            migrationBuilder.AlterColumn<int>(
                name: "GradeId",
                table: "Students",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "GenderId",
                table: "Students",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "MedicalInformation",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Genders",
                columns: new[] { "Id", "Name" },
                values: new object[] { 702600801, "Male" });

            migrationBuilder.InsertData(
                table: "Genders",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1514072092, "Female" });

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Genders_GenderId",
                table: "Students",
                column: "GenderId",
                principalTable: "Genders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Grades_GradeId",
                table: "Students",
                column: "GradeId",
                principalTable: "Grades",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Genders_GenderId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Grades_GradeId",
                table: "Students");

            migrationBuilder.DeleteData(
                table: "Genders",
                keyColumn: "Id",
                keyValue: 702600801);

            migrationBuilder.DeleteData(
                table: "Genders",
                keyColumn: "Id",
                keyValue: 1514072092);

            migrationBuilder.DropColumn(
                name: "Note",
                table: "MedicalInformation");

            migrationBuilder.AlterColumn<int>(
                name: "GradeId",
                table: "Students",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "GenderId",
                table: "Students",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.InsertData(
                table: "Genders",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1495576618, "Male" });

            migrationBuilder.InsertData(
                table: "Genders",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1242346153, "Female" });

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Genders_GenderId",
                table: "Students",
                column: "GenderId",
                principalTable: "Genders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Grades_GradeId",
                table: "Students",
                column: "GradeId",
                principalTable: "Grades",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
