using SchoolSystem.Entities.Facades;
using SchoolSystem.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SchoolSystem.Entities
{
    public class MedicalInformation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int Age { get; set; }
        public int HeartRate { get; set; }
        public int BloodPressure { get; set; }
        public int BodyMass { get; set; }
        public int Height { get; set; }
        public string BloodType { get; set; }
        public string Note { get; set; }
        public StudentState StudentState { get; set; }
        public VaccinationState VaccinationState { get; set; }

        [JsonIgnore]
        public Student Student { get; set; }
    }
}
