using Microsoft.EntityFrameworkCore;
using SchoolSystem.Entities;
using SchoolSystem.Entities;
using System;

namespace SchoolSystem.Contexts
{
    public class MainContext : DbContext
    {
        public MainContext(DbContextOptions<MainContext> options) : base(options)
        {
            Database.Migrate();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Gender>().HasData(new Gender
            {
                Id = new Random().Next(),
                Name = "Male",

            }, new Gender
            {
                Id = new Random().Next(),
                Name = "Female",
            });
        }

        public DbSet<Student> Students {  get; set; }
        public DbSet<Gender> Genders {  get; set; }
        public DbSet<Grade> Grades {  get; set; }
        public DbSet<MedicalInformation> MedicalInformation {  get; set; }
    }
}
