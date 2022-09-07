using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

namespace SchoolSystem.Migrations
{
    public partial class MedicalInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Genders",
                keyColumn: "Id",
                keyValue: 970559705);

            migrationBuilder.DeleteData(
                table: "Genders",
                keyColumn: "Id",
                keyValue: 1009560195);

            migrationBuilder.AddColumn<int>(
                name: "MedicalInformationId",
                table: "Students",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "MedicalInformation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Age = table.Column<int>(nullable: false),
                    HeartRate = table.Column<int>(nullable: false),
                    BloodPressure = table.Column<int>(nullable: false),
                    BodyMass = table.Column<int>(nullable: false),
                    Height = table.Column<int>(nullable: false),
                    BloodType = table.Column<string>(nullable: true),
                    StudentState = table.Column<int>(nullable: false),
                    VaccinationState = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicalInformation", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Genders",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1495576618, "Male" });

            migrationBuilder.InsertData(
                table: "Genders",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1242346153, "Female" });

            migrationBuilder.CreateIndex(
                name: "IX_Students_MedicalInformationId",
                table: "Students",
                column: "MedicalInformationId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_MedicalInformation_MedicalInformationId",
                table: "Students",
                column: "MedicalInformationId",
                principalTable: "MedicalInformation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_MedicalInformation_MedicalInformationId",
                table: "Students");

            migrationBuilder.DropTable(
                name: "MedicalInformation");

            migrationBuilder.DropIndex(
                name: "IX_Students_MedicalInformationId",
                table: "Students");

            migrationBuilder.DeleteData(
                table: "Genders",
                keyColumn: "Id",
                keyValue: 1242346153);

            migrationBuilder.DeleteData(
                table: "Genders",
                keyColumn: "Id",
                keyValue: 1495576618);

            migrationBuilder.DropColumn(
                name: "MedicalInformationId",
                table: "Students");

            migrationBuilder.InsertData(
                table: "Genders",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1009560195, "Male" });

            migrationBuilder.InsertData(
                table: "Genders",
                columns: new[] { "Id", "Name" },
                values: new object[] { 970559705, "Female" });
        }
    }
}
