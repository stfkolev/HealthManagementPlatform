using Microsoft.EntityFrameworkCore;
using SchoolSystem.Contexts;
using SchoolSystem.Models;
using SchoolSystem.Repositories.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolSystem.Repositories
{
    public class GradeRepository : IGradeRepository<Grade>
    {
        readonly MainContext mainContext;

        public GradeRepository(MainContext context)
        {
            mainContext = context;
        }

        public async Task<IEnumerable<Grade>> GetAll()
        {
            return await mainContext.Grades.ToListAsync();
        }

        public async Task<Grade> Get(int id)
        {
            return await mainContext.Grades.FindAsync(id);
        }

        public async Task<Grade> Add(Grade obj)
        {
            var result = await mainContext.AddAsync(obj);
            await mainContext.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<Grade> Update(int id, Grade obj)
        {
            mainContext.Entry(obj).State = EntityState.Modified;
            //result.Name = obj.Name;
            await mainContext.SaveChangesAsync();

            return null;
        }

        public async Task Delete(int id)
        {
            var result = await mainContext.Grades.FindAsync(id);

            if(result != null)
            {
                mainContext.Grades.Remove(result);
                await mainContext.SaveChangesAsync();
            }
        }

    }
}
