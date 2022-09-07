using SchoolSystem.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SchoolSystem.Models
{
    public class Student
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }


        public virtual int GradeId { get; set; }
        public virtual int GenderId { get; set; }
        public virtual int? MedicalInformationId { get; set; }

        [JsonIgnore]
        [ForeignKey("GradeId")]
        public Grade Grade { get; set; }

        [JsonIgnore]
        [ForeignKey("GenderId")]
        public Gender Gender { get; set; }

        [JsonIgnore]
        [ForeignKey("MedicalInformationId")]
        public MedicalInformation? MedicalInformation { get; set; }
    }
}
