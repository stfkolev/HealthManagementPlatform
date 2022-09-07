﻿using Microsoft.EntityFrameworkCore;
using SchoolSystem.Contexts;
using SchoolSystem.Models;
using SchoolSystem.Repositories.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolSystem.Repositories
{
    public class StudentRepository : IStudentRepository<Student>
    {
        readonly MainContext mainContext;

        public StudentRepository(MainContext context)
        {
            mainContext = context;
        }

        public async Task<IEnumerable<Student>> GetAll()
        {
            return await mainContext.Students.ToListAsync();
        }

        public async Task<Student> Get(int id)
        {
            return await mainContext.Students.FindAsync(id);
        }

        public async Task<Student> Add(Student obj)
        {
            var result = await mainContext.AddAsync(obj);
            
            await mainContext.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<Student> Update(int id, Student obj)
        {
            mainContext.Entry(obj).State = EntityState.Modified;
            //result.Name = obj.Name;
            await mainContext.SaveChangesAsync();

            return null;
        }

        public async Task Delete(int id)
        {
            var result = await mainContext.Students.FindAsync(id);

            if(result != null)
            {
                mainContext.Students.Remove(result);
                await mainContext.SaveChangesAsync();
            }
        }

    }
}
