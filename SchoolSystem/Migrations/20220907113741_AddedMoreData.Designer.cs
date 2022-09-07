﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SchoolSystem.Contexts;

namespace SchoolSystem.Migrations
{
    [DbContext(typeof(MainContext))]
    [Migration("20220907113741_AddedMoreData")]
    partial class AddedMoreData
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.28")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("SchoolSystem.Models.Gender", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(150)")
                        .HasMaxLength(150);

                    b.HasKey("Id");

                    b.ToTable("Genders");

                    b.HasData(
                        new
                        {
                            Id = 1009560195,
                            Name = "Male"
                        },
                        new
                        {
                            Id = 970559705,
                            Name = "Female"
                        });
                });

            modelBuilder.Entity("SchoolSystem.Models.Grade", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(150)")
                        .HasMaxLength(150);

                    b.HasKey("Id");

                    b.ToTable("Grades");
                });

            modelBuilder.Entity("SchoolSystem.Models.Student", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .HasColumnType("text");

                    b.Property<int?>("GenderId")
                        .HasColumnType("int");

                    b.Property<int?>("GradeId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(150)")
                        .HasMaxLength(150);

                    b.Property<string>("Phone")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("GenderId");

                    b.HasIndex("GradeId");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("SchoolSystem.Models.Student", b =>
                {
                    b.HasOne("SchoolSystem.Models.Gender", "Gender")
                        .WithMany("Students")
                        .HasForeignKey("GenderId");

                    b.HasOne("SchoolSystem.Models.Grade", "Grade")
                        .WithMany("Students")
                        .HasForeignKey("GradeId");
                });
#pragma warning restore 612, 618
        }
    }
}
